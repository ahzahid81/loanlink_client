import React, { useEffect, useState } from "react";
import axiosSecure from "../../services/axiosSecure";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";

const BorrowerMyLoans = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApplications = async () => {
      try {
        // Backend auto-filters borrower by JWT
        const res = await axiosSecure.get("/applications");
        setApplications(res.data || []);
      } catch (err) {
        console.error("Failed to load applications", err);
        Swal.fire("Error", "Failed to load your applications.", "error");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) loadApplications();
  }, [user]);

  const handleCancel = async (id) => {
    const conf = await Swal.fire({
      title: "Cancel application?",
      text: "You can only cancel a pending application.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it",
    });

    if (!conf.isConfirmed) return;

    try {
      await axiosSecure.patch(`/applications/${id}/cancel`);

      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status: "Cancelled" } : app
        )
      );

      Swal.fire("Cancelled", "Your application was cancelled.", "success");
    } catch (err) {
      Swal.fire("Failed", "Could not cancel application.", "error");
    }
  };

  const handlePay = async (app) => {
    try {
      const res = await axiosSecure.post("/create-checkout-session", {
        applicationId: app._id,
      });

      window.location.href = res.data.url;
    } catch (err) {
      Swal.fire("Payment Error", "Failed to start payment.", "error");
    }
  };

  const showPaymentInfo = (app) => {
    if (!app.payment) {
      Swal.fire("No payment", "No payment details found.");
      return;
    }

    Swal.fire({
      title: "Payment Details",
      html: `
        <p><strong>Transaction:</strong> ${app.payment.txId}</p>
        <p><strong>Email:</strong> ${app.payment.email}</p>
      `,
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
      <p className="text-sm text-base-content/70">
        You have not applied for any loans yet.
      </p>
    );
  }

  return (
    <div>
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
                  {app.status === "pending" && (
                    <span className="badge badge-warning">Pending</span>
                  )}
                  {app.status === "Approved" && (
                    <span className="badge badge-success">Approved</span>
                  )}
                  {app.status === "Rejected" && (
                    <span className="badge badge-error">Rejected</span>
                  )}
                  {app.status === "Cancelled" && (
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
                    <span className="text-xs text-warning">Unpaid</span>
                  )}
                </td>

                <td className="space-x-2">
                  <button
                    className="btn btn-outline btn-xs"
                    onClick={() =>
                      Swal.fire({
                        title: "Application Details",
                        html: `<pre style="text-align:left">${JSON.stringify(
                          app,
                          null,
                          2
                        )}</pre>`,
                        width: 600,
                      })
                    }
                  >
                    View
                  </button>

                  {app.status === "Pending" && (
                    <button
                      className="btn btn-error btn-xs"
                      onClick={() => handleCancel(app._id)}
                    >
                      Cancel
                    </button>
                  )}

                  {app.status === "Pending" &&
                    app.applicationFeeStatus === "Unpaid" && (
                      <button
                        className="btn btn-primary btn-xs"
                        onClick={() => handlePay(app)}
                      >
                        Pay Fee
                      </button>
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
