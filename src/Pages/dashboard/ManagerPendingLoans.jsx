import React from "react";

/**
 * Manager Pending Loans - placeholder
 * Later: fetch /applications?status=Pending and allow Approve / Reject
 */

const ManagerPendingLoans = () => {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-3">Pending Applications</h2>
      <p className="text-sm text-base-content/70 mb-4">List pending loan applications for review.</p>

      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr><th>#</th><th>User</th><th>Loan</th><th>Amount</th><th>Date</th><th>Actions</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>Small Business</td>
              <td>$2000</td>
              <td>2025-12-10</td>
              <td className="space-x-2"><button className="btn btn-xs btn-success">Approve</button><button className="btn btn-xs btn-error">Reject</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerPendingLoans;
