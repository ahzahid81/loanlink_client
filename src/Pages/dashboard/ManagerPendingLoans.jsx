import React, { useEffect, useState } from "react";
import axiosSecure from "../../services/axiosSecure";
import Swal from "sweetalert2";

/**
 * Manager Pending Loans
 * - Fetch pending applications
 * - Approve / Reject
 */

const ManagerPendingLoans = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const loadApplications = async () => {
      try {
        const res = await axiosSecure.get("/applications");

        const pending = res.data.filter(
          app => app.status?.toLowerCase() === "pending"
        );

        setApplications(pending);
      } catch (err) {
        console.error("Failed to load applications", err);
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);


  // Approve / Reject handler
  const updateStatus = async (id, status) => {
    const confirm = await Swal.fire({
      title: `${status} application?`,
      text: `Are you sure you want to ${status.toLowerCase()} this application?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: status,
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/applications/${id}/status`, { status });

      setApplications(prev =>
        prev.filter(app => app._id !== id)
      );

      Swal.fire("Success", `Application ${status}`, "success");
    } catch (err) {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (!applications.length) {
    return (
      <p className="text-sm text-base-content/70">
        No pending applications.
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-3">
        Pending Applications
      </h2>
      <p className="text-sm text-base-content/70 mb-4">
        Review loan applications and approve or reject them.
      </p>

      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Loan</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={app._id}>
                <td>{index + 1}</td>
                <td>{app.userEmail}</td>
                <td>{app.loanTitle}</td>
                <td>${Number(app.loanAmount).toLocaleString()}</td>
                <td>
                  {new Date(app.createdAt).toLocaleDateString()}
                </td>
                <td className="space-x-2">
                  <button
                    className="btn btn-xs btn-success"
                    onClick={() => updateStatus(app._id, "Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => updateStatus(app._id, "Rejected")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerPendingLoans;
