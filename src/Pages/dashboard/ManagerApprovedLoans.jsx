// src/pages/manager/ManagerApprovedLoans.jsx
import React, { useEffect, useState } from "react";
import axiosSecure from "../../services/axiosSecure";
import Swal from "sweetalert2";
import PageTitle from "../../Component/PageTitle";

/**
 * Manager Approved Loan Applications
 * - Shows all approved applications
 * - View application details
 */

const ManagerApprovedLoans = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load approved applications
  useEffect(() => {
    const loadApprovedApplications = async () => {
      try {
        const res = await axiosSecure.get("/applications");
        const approved = (res.data || []).filter(
          (app) => app.status === "Approved"
        );
        setApplications(approved);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Could not load approved loans", "error");
      } finally {
        setLoading(false);
      }
    };

    loadApprovedApplications();
  }, []);

  // View application details
  const viewApplication = (app) => {
    Swal.fire({
      title: "Approved Loan Details",
      width: 650,
      html: `
        <div style="text-align:left;font-size:14px">
          <p><b>Loan ID:</b> ${app.loanId}</p>
          <p><b>Loan Title:</b> ${app.loanTitle}</p>
          <p><b>Amount:</b> $${app.loanAmount}</p>
          <hr/>
          <p><b>Applicant:</b> ${app.applicantName}</p>
          <p><b>Email:</b> ${app.userEmail}</p>
          <p><b>Contact:</b> ${app.contact}</p>
          <hr/>
          <p><b>Fee Status:</b> ${app.applicationFeeStatus}</p>
          <p><b>Approved At:</b> ${
            app.approvedAt
              ? new Date(app.approvedAt).toLocaleString()
              : "N/A"
          }</p>
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

  if (!applications.length) {
    return (
      <div className="text-center py-10 text-sm text-base-content/60">
        No approved loan applications found.
      </div>
    );
  }

  return (
    <div>
      <PageTitle title={"Approved Loan"}></PageTitle>
      <h2 className="text-xl md:text-2xl font-bold mb-3">
        Approved Loan Applications
      </h2>
      <p className="text-sm text-base-content/70 mb-4">
        Loans that have been approved by the manager.
      </p>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Loan ID</th>
              <th>User</th>
              <th>Loan</th>
              <th>Amount</th>
              <th>Fee</th>
              <th>Approved Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app, index) => (
              <tr key={app._id}>
                <td>{index + 1}</td>

                <td className="text-xs">{app.loanId}</td>

                <td>
                  <p className="font-semibold">{app.applicantName}</p>
                  <p className="text-xs text-base-content/60">
                    {app.userEmail}
                  </p>
                </td>

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

                <td>
                  <button
                    className="btn btn-xs btn-outline"
                    onClick={() => viewApplication(app)}
                  >
                    View
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

export default ManagerApprovedLoans;
