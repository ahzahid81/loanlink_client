import React from "react";

/**
 * AdminAllLoans - placeholder
 * Admin should be able to see all loans, toggle showOnHome, edit or delete loans.
 */

const AdminAllLoans = () => {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-3">All Loans (Admin)</h2>
      <p className="text-sm text-base-content/70 mb-4">Admin view of all loan products. Controls to update, delete, and toggle show on home are needed here.</p>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead><tr><th>#</th><th>Title</th><th>Interest</th><th>Category</th><th>Show on Home</th><th>Actions</th></tr></thead>
          <tbody><tr><td>1</td><td>Sample Loan</td><td>8.5%</td><td>Business</td><td><input type="checkbox" /></td><td><button className="btn btn-xs">Edit</button></td></tr></tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAllLoans;
