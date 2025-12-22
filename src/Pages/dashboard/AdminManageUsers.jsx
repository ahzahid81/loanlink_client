import React, { useEffect, useMemo, useState } from "react";
import axiosSecure from "../../services/axiosSecure";
import Swal from "sweetalert2";
import PageTitle from "../../Component/PageTitle";


const AdminManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Load users
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await axiosSecure.get("/users");
        setUsers(res.data || []);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to load users", "error");
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  // Search filter (name/email)
  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users;
    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        u.email?.toLowerCase().includes(q) ||
        u.name?.toLowerCase().includes(q)
    );
  }, [users, search]);

  // Change role
  const handleChangeRole = async (user) => {
    if (user.role === "admin") {
      return Swal.fire("Not Allowed", "Admin role cannot be changed", "warning");
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
      confirmButtonText: "Yes, Change",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/users/${user._id}`, { role: newRole });

      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id ? { ...u, role: newRole } : u
        )
      );

      Swal.fire("Updated", "User role updated", "success");
    } catch {
      Swal.fire("Failed", "Could not update role", "error");
    }
  };

  // Suspend user
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
    } catch {
      Swal.fire("Failed", "Could not suspend user", "error");
    }
  };

  // Unsuspend user (extra polish)
  const handleUnsuspend = async (user) => {
    const confirm = await Swal.fire({
      title: "Unsuspend User?",
      text: user.email,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Unsuspend",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/users/${user._id}`, {
        status: "active",
        suspendReason: "",
      });

      setUsers((prev) =>
        prev.map((u) =>
          u._id === user._id
            ? { ...u, status: "active", suspendReason: "" }
            : u
        )
      );

      Swal.fire("Success", "User unsuspended", "success");
    } catch {
      Swal.fire("Failed", "Could not unsuspend user", "error");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div>
      <PageTitle title={"Manage User"}></PageTitle>
      <h2 className="text-xl md:text-2xl font-bold mb-4">Manage Users</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or email"
        className="input input-bordered input-sm mb-4 w-full md:w-72"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

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
            {filteredUsers.map((user, index) => (
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
                  {user.status === "active" && (
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleSuspend(user)}
                    >
                      Suspend
                    </button>
                  )}

                  {/* Unsuspend */}
                  {user.status === "suspended" && (
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() => handleUnsuspend(user)}
                    >
                      Unsuspend
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <p className="text-sm text-center py-6 text-base-content/60">
            No users found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminManageUsers;
