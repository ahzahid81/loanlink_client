import React from "react";

/**
 * Manager Manage Loans - placeholder table.
 * Later: fetch /loans?createdBy=managerId and allow edit/delete.
 */

const ManagerManageLoans = () => {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-3">Manage Loans</h2>
      <p className="text-sm text-base-content/70 mb-4">List loans created by this manager, with edit/delete.</p>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr><th>#</th><th>Title</th><th>Interest</th><th>Category</th><th>Actions</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>Sample Loan</td><td>8.5%</td><td>Business</td><td><button className="btn btn-xs">Edit</button></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerManageLoans;
