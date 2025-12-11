import React, { useEffect, useState } from "react";
import axiosSecure from "../../services/axiosSecure";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext";

/**
 * Borrower My Loans
 * - fetch /applications?user=email
 * - shows actions based on status and fee status
 */

const BorrowerMyLoans = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // TODO: server endpoint should accept query ?user=<email>
        const res = await axiosSecure.get(`/applications?user=${encodeURIComponent(user.email)}`);
        setApplications(res.data || []);
      } catch (err) {
        console.error("Failed to load applications", err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.email) load();
  }, [user]);

  const handleCancel = async (id) => {
    const conf = await Swal.fire({
      title: "Cancel application?",
      text: "This will cancel your pending application.",
      icon: "warning",
      showCancelButton: true,
    });
    if (!conf.isConfirmed) return;

    try {
      await axiosSecure.patch(`/applications/${id}`, { status: "Cancelled" });
      setApplications((s) => s.map(a => a._id === id ? { ...a, status: "Cancelled" } : a));
      Swal.fire("Cancelled", "Your application has been cancelled.", "success");
    } catch (err) {
      Swal.fire("Failed", "Could not cancel application.", "error");
    }
  };

  const handlePay = async (app) => {
    // TODO: integrate Stripe flow
    Swal.fire("Payment", "Stripe payment flow to be implemented.", "info");
  };

  const showPaymentInfo = (app) => {
    if (!app.payment) return Swal.fire("No payment", "No payment details available.");
    Swal.fire({
      title: "Payment Details",
      html: `<p><strong>Email:</strong> ${app.payment.email}</p>
             <p><strong>Transaction ID:</strong> ${app.payment.txId}</p>
             <p><strong>Loan ID:</strong> ${app.loanId}</p>`
    });
  };

  if (loading) return <div className="text-center py-8"><span className="loading loading-spinner loading-lg" /></div>;

  if (!applications.length) return <p className="text-sm text-base-content/70">You have not applied for any loans yet.</p>;

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-3">My Loans</h2>

      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Loan Info</th>
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
                  {app.status === "Pending" && <span className="badge badge-warning">Pending</span>}
                  {app.status === "Approved" && <span className="badge badge-success">Approved</span>}
                  {app.status === "Rejected" && <span className="badge badge-error">Rejected</span>}
                  {app.status === "Cancelled" && <span className="badge">Cancelled</span>}
                </td>
                <td>
                  {app.applicationFeeStatus === "Unpaid" ? (
                    <span className="text-xs">Unpaid</span>
                  ) : (
                    <button className="btn btn-ghost btn-xs" onClick={() => showPaymentInfo(app)}>Paid</button>
                  )}
                </td>
                <td className="space-x-2">
                  <button className="btn btn-outline btn-xs" onClick={() => Swal.fire(JSON.stringify(app, null, 2))}>View</button>

                  {app.status === "Pending" && (
                    <button className="btn btn-error btn-xs" onClick={() => handleCancel(app._id)}>Cancel</button>
                  )}

                  {app.applicationFeeStatus === "Unpaid" && app.status === "Pending" && (
                    <button className="btn btn-primary btn-xs" onClick={() => handlePay(app)}>Pay Fee</button>
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
