// src/pages/admin/AdminLoanApplications.jsx
import React, { useEffect, useMemo, useState } from "react";
import axiosSecure from "../../services/axiosSecure";
import Swal from "sweetalert2";
import PageTitle from "../../Component/PageTitle";

const PAGE_SIZE = 8;

const AdminLoanApplications = () => {
  const [applications, setApplications] = useState([]);
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  // Load all applications
  useEffect(() => {
    const loadApplications = async () => {
      try {
        const res = await axiosSecure.get("/applications");
        setApplications(res.data || []);
      } catch {
        Swal.fire("Error", "Failed to load applications", "error");
      } finally {
        setLoading(false);
      }
    };
    loadApplications();
  }, []);

  // Filtered applications
  const filtered = useMemo(() => {
    if (status === "All") return applications;
    return applications.filter((app) => app.status === status);
  }, [applications, status]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginatedApps = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  // View details
  const viewApplication = (app) => {
    Swal.fire({
      title: "Loan Application Details",
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
          <p><b>NID:</b> ${app.nid}</p>
          <hr/>
          <p><b>Status:</b> ${app.status}</p>
          <p><b>Fee Status:</b> ${app.applicationFeeStatus}</p>
          <p><b>Applied At:</b> ${new Date(app.createdAt).toLocaleString()}</p>
        </div>
      `,
    });
  };

  // Approve / Reject
  const updateStatus = async (app, newStatus) => {
    const confirm = await Swal.fire({
      title: `${newStatus} Application?`,
      text: app.loanTitle,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/applications/${app._id}/status`, {
        status: newStatus,
      });

      setApplications((prev) =>
        prev.map((a) =>
          a._id === app._id ? { ...a, status: newStatus } : a
        )
      );

      Swal.fire("Updated", `Application ${newStatus}`, "success");
    } catch {
      Swal.fire("Error", "Failed to update status", "error");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div>
      <PageTitle title={"Loan Application"}></PageTitle>
      <h2 className="text-xl md:text-2xl font-bold mb-4">
        Loan Applications (Admin)
      </h2>

      {/* FILTER */}
      <div className="flex gap-3 mb-4">
        <select
          className="select select-bordered select-sm"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setPage(1);
          }}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>User</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Fee</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedApps.map((app) => (
              <tr key={app._id}>
                <td className="text-xs">{app.loanId}</td>
                <td>
                  <p className="font-semibold">{app.applicantName}</p>
                  <p className="text-xs text-base-content/60">
                    {app.userEmail}
                  </p>
                </td>
                <td>${Number(app.loanAmount).toLocaleString()}</td>
                <td>
                  {app.status === "Pending" && (
                    <span className="badge badge-warning">Pending</span>
                  )}
                  {app.status === "Approved" && (
                    <span className="badge badge-success">Approved</span>
                  )}
                  {app.status === "Rejected" && (
                    <span className="badge badge-error">Rejected</span>
                  )}
                </td>
                <td>
                  {app.applicationFeeStatus === "Paid" ? (
                    <span className="badge badge-success">Paid</span>
                  ) : (
                    <span className="badge badge-outline">Unpaid</span>
                  )}
                </td>
                <td className="space-x-2">
                  <button
                    className="btn btn-xs btn-outline"
                    onClick={() => viewApplication(app)}
                  >
                    View
                  </button>

                  {app.status === "Pending" && (
                    <>
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
                    </>
                  )}
                </td>
              </tr>
            ))}

            {!paginatedApps.length && (
              <tr>
                <td colSpan="6" className="text-center text-sm text-base-content/60">
                  No applications found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-end mt-4 gap-2">
          <button
            className="btn btn-xs"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </button>
          <span className="text-sm px-2">
            Page {page} of {totalPages}
          </span>
          <button
            className="btn btn-xs"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminLoanApplications;
