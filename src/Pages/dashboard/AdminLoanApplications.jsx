import React, { useEffect, useState } from "react";
import axiosSecure from "../../services/axiosSecure";
import Swal from "sweetalert2";

/**
 * AdminLoanApplications
 * - Admin can view ALL loan applications
 * - Filter by status
 * - View full application details
 */

const AdminLoanApplications = () => {
  const [applications, setApplications] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  // Load all applications
  useEffect(() => {
    const load = async () => {
      try {
        const res = await axiosSecure.get("/applications");
        setApplications(res.data || []);
        setFiltered(res.data || []);
      } catch (err) {
        Swal.fire("Error", "Failed to load applications", "error");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Filter by status
  useEffect(() => {
    if (statusFilter === "All") {
      setFiltered(applications);
    } else {
      setFiltered(applications.filter(a => a.status === statusFilter));
    }
  }, [statusFilter, applications]);

  const viewDetails = (app) => {
    Swal.fire({
      title: "Application Details",
      width: 700,
      html: `
        <div style="text-align:left">
          <p><b>Applicant:</b> ${app.applicantName || "N/A"}</p>
          <p><b>Email:</b> ${app.userEmail}</p>
          <p><b>Loan:</b> ${app.loanTitle}</p>
          <p><b>Amount:</b> $${app.loanAmount}</p>
          <p><b>Status:</b> ${app.status}</p>
          <p><b>Fee Status:</b> ${app.applicationFeeStatus}</p>
          <p><b>Income:</b> ${app.monthlyIncome}</p>
          <p><b>Reason:</b> ${app.reason}</p>
          <p><b>Address:</b> ${app.address}</p>
        </div>
      `,
      confirmButtonText: "Close",
    });
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-3">
        Loan Applications (Admin)
      </h2>

      <p className="text-sm text-base-content/70 mb-4">
        View and monitor all loan applications in the system.
      </p>

      {/* FILTER */}
      <div className="mb-4 flex gap-2 items-center">
        <span className="text-sm">Filter:</span>
        <select
          className="select select-sm select-bordered"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option>All</option>
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
          <option>Cancelled</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Applicant</th>
              <th>Loan</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Fee</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((app, i) => (
              <tr key={app._id}>
                <td>{i + 1}</td>
                <td>{app.applicantName || "N/A"}</td>
                <td>{app.loanTitle}</td>
                <td>${Number(app.loanAmount).toLocaleString()}</td>
                <td>
                  <span
                    className={`badge ${
                      app.status === "Pending"
                        ? "badge-warning"
                        : app.status === "Approved"
                        ? "badge-success"
                        : app.status === "Rejected"
                        ? "badge-error"
                        : ""
                    }`}
                  >
                    {app.status}
                  </span>
                </td>
                <td>
                  {app.applicationFeeStatus === "Paid" ? (
                    <span className="badge badge-success">Paid</span>
                  ) : (
                    <span className="badge">Unpaid</span>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-xs btn-outline"
                    onClick={() => viewDetails(app)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <p className="text-center text-sm text-base-content/70 py-6">
            No applications found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminLoanApplications;
