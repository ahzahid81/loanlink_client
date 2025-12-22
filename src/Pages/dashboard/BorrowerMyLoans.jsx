import React, { useEffect, useState } from "react";
import axiosSecure from "../../services/axiosSecure";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";
import PageTitle from "../../Component/PageTitle";



const BorrowerMyLoans = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load borrower applications
  useEffect(() => {
    const loadApplications = async () => {
      try {
        const res = await axiosSecure.get("/applications");
        setApplications(res.data || []);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to load your loan applications", "error");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) loadApplications();
  }, [user]);

  // Cancel pending application
  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Cancel Application?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Cancel",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/applications/${id}/cancel`);

      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status: "Cancelled" } : app
        )
      );

      Swal.fire("Cancelled", "Your application has been cancelled.", "success");
    } catch {
      Swal.fire("Failed", "Could not cancel application.", "error");
    }
  };

  // Stripe Payment
  const handlePay = async (app) => {
    try {
      const res = await axiosSecure.post("/create-checkout-session", {
        applicationId: app._id,
      });

      window.location.href = res.data.url;
    } catch {
      Swal.fire("Payment Error", "Unable to start payment.", "error");
    }
  };

  // Show payment details
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
          <p><b>Paid At:</b> ${
            app.paidAt
              ? new Date(app.paidAt).toLocaleString()
              : "N/A"
          }</p>
        </div>
      `,
      confirmButtonText: "Close",
    });
  };

  // View application details
  const viewApplication = (app) => {
    Swal.fire({
      title: "Loan Application Details",
      width: 650,
      html: `
        <div style="text-align:left;font-size:14px">
          <p><b>Loan ID:</b> ${app.loanId}</p>
          <p><b>Loan:</b> ${app.loanTitle}</p>
          <p><b>Amount:</b> $${app.loanAmount}</p>
          <p><b>Status:</b> ${app.status}</p>
          <p><b>Fee Status:</b> ${app.applicationFeeStatus}</p>
          <p><b>Applied At:</b> ${new Date(app.createdAt).toLocaleString()}</p>
        </div>
      `,
      confirmButtonText: "Close",
    });
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (!applications.length) {
    return (
      <p className="text-sm text-base-content/70">
        You have not applied for any loans yet.
      </p>
    );
  }

  return (
    <div>
      <PageTitle title={"My Loan"}></PageTitle>
      <h2 className="text-xl md:text-2xl font-bold mb-4">My Loans</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Loan</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Fee</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app, i) => (
              <tr key={app._id}>
                <td>{i + 1}</td>
                <td>{app.loanTitle}</td>
                <td>${Number(app.loanAmount).toLocaleString()}</td>

                <td>
                  {app.status?.toLowerCase() === "pending" && (
                    <span className="badge badge-warning">Pending</span>
                  )}
                  {app.status?.toLowerCase() === "approved" && (
                    <span className="badge badge-success">Approved</span>
                  )}
                  {app.status?.toLowerCase() === "rejected" && (
                    <span className="badge badge-error">Rejected</span>
                  )}
                  {app.status?.toLowerCase() === "cancelled" && (
                    <span className="badge">Cancelled</span>
                  )}
                </td>

                <td>
                  {app.applicationFeeStatus === "Paid" ? (
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => showPaymentInfo(app)}
                    >
                      Paid
                    </button>
                  ) : (
                    <span className="badge badge-warning badge-sm">
                      Unpaid
                    </span>
                  )}
                </td>

                <td className="space-x-2">
                  <button
                    className="btn btn-outline btn-xs"
                    onClick={() => viewApplication(app)}
                  >
                    View
                  </button>

                  {app.status?.toLowerCase() === "pending" && (
                    <>
                      <button
                        className="btn btn-error btn-xs"
                        onClick={() => handleCancel(app._id)}
                      >
                        Cancel
                      </button>

                      {app.applicationFeeStatus === "Unpaid" && (
                        <button
                          className="btn btn-primary btn-xs"
                          onClick={() => handlePay(app)}
                        >
                          Pay Fee ($10)
                        </button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BorrowerMyLoans;
