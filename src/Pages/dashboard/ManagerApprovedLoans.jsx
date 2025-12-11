import React from "react";

const ManagerApprovedLoans = () => {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-3">Approved Applications</h2>
      <p className="text-sm text-base-content/70 mb-4">List of applications approved by the manager.</p>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead><tr><th>#</th><th>User</th><th>Loan</th><th>Amount</th><th>Approved Date</th></tr></thead>
          <tbody><tr><td>1</td><td>Jane Doe</td><td>Agri Loan</td><td>$1500</td><td>2025-12-01</td></tr></tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerApprovedLoans;
