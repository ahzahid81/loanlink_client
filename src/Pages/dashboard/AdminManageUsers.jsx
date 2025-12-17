import React, { useEffect, useState } from "react";
import axiosSecure from "../../services/axiosSecure";
import Swal from "sweetalert2";

/**
 * AdminManageUsers
 * - GET /users
 * - PATCH /users/:id
 * Business rules:
 *  - Admin role cannot be changed
 *  - Suspended users cannot change role
 *  - Suspended users cannot be suspended again
 */

const AdminManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load users
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await axiosSecure.get("/users");
        setUsers(res.data || []);
      } catch (err) {
        console.error("Failed to load users", err);
        Swal.fire("Error", "Failed to load users", "error");
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  // Change Role
  const handleChangeRole = async (user) => {
    if (user.role === "admin") {
      return Swal.fire(
        "Not Allowed",
        "Admin role cannot be changed",
        "warning"
      );
    }

    if (user.status === "suspended") {
      return Swal.fire(
        "User Suspended",
        "Unsuspend the user before changing role",
        "warning"
      );
    }

    const newRole = user.role === "borrower" ? "manager" : "borrower";

    const confirm = await Swal.fire({
      title: "Change Role?",
      text: `Change ${user.email} to ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, change",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/users/${user._id}`, { role: newRole });

      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id ? { ...u, role: newRole } : u
        )
      );

      Swal.fire("Updated", "User role updated successfully", "success");
    } catch (err) {
      Swal.fire("Failed", "Could not update role", "error");
    }
  };

  // Suspend User
  const handleSuspend = async (user) => {
    if (user.status === "suspended") return;

    const { value: reason } = await Swal.fire({
      title: "Suspend User",
      input: "textarea",
      inputLabel: "Suspension Reason",
      inputPlaceholder: "Why are you suspending this user?",
      showCancelButton: true,
      confirmButtonText: "Suspend",
    });

    if (!reason) return;

    try {
      await axiosSecure.patch(`/users/${user._id}`, {
        status: "suspended",
        suspendReason: reason,
      });

      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id
            ? { ...u, status: "suspended", suspendReason: reason }
            : u
        )
      );

      Swal.fire("Suspended", "User has been suspended", "success");
    } catch (err) {
      Swal.fire("Failed", "Could not suspend user", "error");
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
      <h2 className="text-xl md:text-2xl font-bold mb-4">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name || "N/A"}</td>
                <td>{user.email}</td>

                <td>
                  <span
                    className={`badge ${
                      user.role === "admin"
                        ? "badge-primary"
                        : user.role === "manager"
                        ? "badge-secondary"
                        : "badge-outline"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td>
                  {user.status === "active" ? (
                    <span className="badge badge-success">Active</span>
                  ) : (
                    <span className="badge badge-error">Suspended</span>
                  )}
                </td>

                <td className="space-x-2">
                  {/* Change Role */}
                  <button
                    className="btn btn-xs"
                    disabled={
                      user.role === "admin" ||
                      user.status === "suspended"
                    }
                    onClick={() => handleChangeRole(user)}
                  >
                    Change Role
                  </button>

                  {/* Suspend */}
                  <button
                    className="btn btn-xs btn-error"
                    disabled={user.status === "suspended"}
                    onClick={() => handleSuspend(user)}
                  >
                    Suspend
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

export default AdminManageUsers;
