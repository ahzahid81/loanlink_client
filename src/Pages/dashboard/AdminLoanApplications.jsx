import React from "react";

/**
 * AdminLoanApplications - placeholder
 * Admin can filter by status and view application details.
 */

const AdminLoanApplications = () => {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-3">Loan Applications (Admin)</h2>
      <p className="text-sm text-base-content/70 mb-4">This page will show all loan applications and allow filtering by status.</p>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead><tr><th>#</th><th>User</th><th>Loan</th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>John</td><td>Small Business</td><td>$2,000</td><td><span className="badge badge-warning">Pending</span></td><td><button className="btn btn-xs">View</button></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLoanApplications;
