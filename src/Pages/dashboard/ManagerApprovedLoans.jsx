import React, { useEffect, useState } from "react";
import axiosSecure from "../../services/axiosSecure";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";

const ManagerApprovedLoans = () => {
  const { user, role } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApprovedApplications = async () => {
      try {
        const res = await axiosSecure.get("/applications");

        const approved = res.data.filter(
          (app) => app.status?.toLowerCase() === "approved"
        );

        setApplications(approved);
      } catch (err) {
        console.error("Failed to load approved applications", err);
        Swal.fire("Error", "Could not load approved loans", "error");
      } finally {
        setLoading(false);
      }
    };

    if (role === "manager") {
      loadApprovedApplications();
    }
  }, [role]);

  if (loading) {
    return (
      <div className="text-center py-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!applications.length) {
    return (
      <p className="text-sm text-base-content/70">
        No approved loans found.
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-3">
        Approved Loans
      </h2>
      <p className="text-sm text-base-content/70 mb-4">
        List of loan applications that have been approved.
      </p>

      <div className="overflow-x-auto">
        <table className="table table-zebra table-compact w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Applicant</th>
              <th>Loan</th>
              <th>Amount</th>
              <th>Fee</th>
              <th>Approved Date</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={app._id}>
                <td>{index + 1}</td>
                <td className="text-xs">{app.userEmail}</td>
                <td>{app.loanTitle}</td>
                <td>${Number(app.loanAmount).toLocaleString()}</td>
                <td>
                  {app.applicationFeeStatus === "Paid" ? (
                    <span className="badge badge-success badge-sm">
                      Paid
                    </span>
                  ) : (
                    <span className="badge badge-warning badge-sm">
                      Unpaid
                    </span>
                  )}
                </td>
                <td className="text-xs">
                  {app.approvedAt
                    ? new Date(app.approvedAt).toLocaleDateString()
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerApprovedLoans;
