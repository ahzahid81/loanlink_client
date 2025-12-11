import React, { useEffect, useState } from "react";
import axiosSecure from "../../services/axiosSecure";
import Swal from "sweetalert2";

/**
 * AdminManageUsers
 * - GET /users
 * - PATCH /users/:id to update role/status (suspend reason)
 */

const AdminManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axiosSecure.get("/users");
        setUsers(res.data || []);
      } catch (err) {
        console.error("Failed to load users", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleChangeRole = async (id, newRole) => {
    try {
      await axiosSecure.patch(`/users/${id}`, { role: newRole });
      setUsers(u => u.map(x => x._id === id ? { ...x, role: newRole } : x));
      Swal.fire("Updated", "User role updated", "success");
    } catch (err) {
      Swal.fire("Failed", "Could not update role", "error");
    }
  };

  const handleSuspend = async (id) => {
    const { value: reason } = await Swal.fire({ input: 'textarea', inputLabel: 'Suspend reason', inputPlaceholder: 'Why suspend this user?', showCancelButton: true });
    if (!reason) return;
    try {
      await axiosSecure.patch(`/users/${id}`, { status: "suspended", suspendReason: reason });
      setUsers(u => u.map(x => x._id === id ? { ...x, status: "suspended", suspendReason: reason } : x));
      Swal.fire("Suspended", "User suspended with reason", "success");
    } catch (err) {
      Swal.fire("Failed", "Could not suspend user", "error");
    }
  };

  if (loading) return <div className="text-center py-8"><span className="loading loading-spinner loading-lg" /></div>;

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-3">Manage Users</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={u._id}>
                <td>{i+1}</td>
                <td>{u.name || "N/A"}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.status}</td>
                <td className="space-x-2">
                  <button className="btn btn-xs" onClick={() => handleChangeRole(u._id, u.role === "borrower" ? "manager" : "borrower")}>Toggle Role</button>
                  <button className="btn btn-xs btn-error" onClick={() => handleSuspend(u._id)}>Suspend</button>
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
