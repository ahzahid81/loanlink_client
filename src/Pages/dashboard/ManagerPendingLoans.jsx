// src/pages/manager/ManagerPendingLoans.jsx
import React, { useEffect, useState } from "react";
import axiosSecure from "../../services/axiosSecure";
import Swal from "sweetalert2";
import PageTitle from "../../Component/PageTitle";

/**
 * Manager Pending Applications
 * - View pending loan applications
 * - Approve / Reject
 * - View full application details
 */

const ManagerPendingLoans = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);


  const showPaymentInfo = (app) => {
    if (!app.payment || !app.payment.txId) {
      Swal.fire("No Payment Info", "Payment details not found.", "info");
      return;
    }

    Swal.fire({
      title: "Payment Details",
      html: `
          <div style="text-align:left;font-size:14px">
            <p><b>Email:</b> ${app.payment.email}</p>
            <p><b>Transaction ID:</b> ${app.payment.txId}</p>
            <p><b>Amount:</b> $${app.payment.amount}</p>
            <p><b>Loan ID:</b> ${app.loanId}</p>
            <p><b>Paid At:</b> ${app.paidAt
          ? new Date(app.paidAt).toLocaleString()
          : "N/A"
        }</p>
          </div>
        `,
      confirmButtonText: "Close",
    });
  };

  // Load pending applications
  useEffect(() => {
    const loadApplications = async () => {
      try {
        const res = await axiosSecure.get("/applications");
        const pending = (res.data || []).filter(
          (app) => app.status === "Pending"
        );
        setApplications(pending);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to load applications", "error");
      } finally {
        setLoading(false);
      }
    };

    loadApplications();
  }, []);

  // View details
  const viewApplication = (app) => {
    Swal.fire({
      title: "Application Details",
      width: 650,
      html: `
        <div style="text-align:left;font-size:14px">
          <p><b>Loan:</b> ${app.loanTitle}</p>
          <p><b>Amount:</b> $${app.loanAmount}</p>
          <hr/>
          <p><b>Applicant:</b> ${app.applicantName}</p>
          <p><b>Email:</b> ${app.userEmail}</p>
          <p><b>Contact:</b> ${app.contact}</p>
          <p><b>NID:</b> ${app.nid}</p>
          <hr/>
          <p><b>Fee Status:</b> ${app.applicationFeeStatus}</p>
          <p><b>Applied At:</b> ${new Date(app.createdAt).toLocaleString()}</p>
        </div>
      `,
    });
  };

  // Approve / Reject
  const updateStatus = async (app, status) => {
    const confirm = await Swal.fire({
      title: `${status} Application?`,
      text: app.loanTitle,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: status,
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/applications/${app._id}/status`, {
        status,
        ...(status === "Approved" && { approvedAt: new Date() }),
      });

      setApplications((prev) =>
        prev.filter((a) => a._id !== app._id)
      );

      Swal.fire("Success", `Application ${status}`, "success");
    } catch {
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
      <div className="text-center py-10 text-sm text-base-content/60">
        No pending loan applications found.
      </div>
    );
  }

  return (
    <div>
      <PageTitle title={"Pending Loans"}></PageTitle>
      <h2 className="text-xl md:text-2xl font-bold mb-3">
        Pending Loan Applications
      </h2>
      <p className="text-sm text-base-content/70 mb-4">
        Review and approve or reject borrower loan requests.
      </p>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Loan</th>
              <th>Amount</th>
              <th>Fee</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app, index) => (
              <tr key={app._id}>
                <td>{index + 1}</td>

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
                    <span onClick={() => showPaymentInfo(app)} className="badge badge-success">Paid</span>
                  ) : (
                    <span className="badge badge-outline">Unpaid</span>
                  )}
                </td>

                <td>
                  {new Date(app.createdAt).toLocaleDateString()}
                </td>

                <td className="space-x-2">
                  <button
                    className="btn btn-xs btn-outline"
                    onClick={() => viewApplication(app)}
                  >
                    View
                  </button>

                  <button
                    className="btn btn-xs btn-success"
                    onClick={() => updateStatus(app, "Approved")}
                  >
                    Approve
                  </button>

                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => updateStatus(app, "Rejected")}
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
