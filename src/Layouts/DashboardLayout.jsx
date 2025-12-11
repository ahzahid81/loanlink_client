// src/layouts/DashboardLayout.jsx
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Dashboard layout:
 * - Sidebar (role-based links) on left (md: 3/12)
 * - Main content on right (md: 9/12) with <Outlet />
 * - Sidebar uses NavLink with `end` for exact matching (prevents duplicate active)
 */

const DashboardLayout = () => {
  const { role, user } = useAuth();

  const isAdmin = role === "admin";
  const isManager = role === "manager";
  const isBorrower = role === "borrower";

  const SidebarLink = ({ to, children, exact = false }) => (
    <NavLink
      to={to}
      end={exact}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-md text-sm ${
          isActive ? "bg-primary text-primary-content" : "hover:bg-base-200"
        }`
      }
    >
      {children}
    </NavLink>
  );

  return (
    <div className="bg-base-100 min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-3">
            <div className="md:sticky md:top-24 bg-base-100 border border-base-200 rounded-xl p-4">
              <div className="mb-4">
                <p className="text-xs uppercase tracking-wide text-base-content/60">SIGNED IN AS</p>
                <p className="font-semibold text-sm truncate">{user?.displayName || user?.email || "User"}</p>
                <p className="text-[11px] text-base-content/60">Role: {role || "N/A"}</p>
              </div>

              <div className="divider my-3" />

              <nav className="space-y-1 text-sm">
                <SidebarLink to="/dashboard" exact={true}>Overview</SidebarLink>
                <SidebarLink to="/dashboard/profile">My Profile</SidebarLink>

                {isBorrower && (
                  <>
                    <div className="mt-3 px-3 text-[11px] uppercase tracking-wide text-base-content/50">Borrower</div>
                    <SidebarLink to="/dashboard/my-loans">My Loans</SidebarLink>
                  </>
                )}

                {isManager && (
                  <>
                    <div className="mt-3 px-3 text-[11px] uppercase tracking-wide text-base-content/50">Manager</div>
                    <SidebarLink to="/dashboard/add-loan">Add Loan</SidebarLink>
                    <SidebarLink to="/dashboard/manage-loans">Manage Loans</SidebarLink>
                    <SidebarLink to="/dashboard/pending-loans">Pending Applications</SidebarLink>
                    <SidebarLink to="/dashboard/approved-loans">Approved Applications</SidebarLink>
                  </>
                )}

                {isAdmin && (
                  <>
                    <div className="mt-3 px-3 text-[11px] uppercase tracking-wide text-base-content/50">Admin</div>
                    <SidebarLink to="/dashboard/manage-users">Manage Users</SidebarLink>
                    <SidebarLink to="/dashboard/all-loan">All Loans</SidebarLink>
                    <SidebarLink to="/dashboard/loan-applications">Loan Applications</SidebarLink>
                  </>
                )}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <main className="md:col-span-9">
            <section className="bg-base-100 border border-base-200 rounded-xl p-4 md:p-6 min-h-[50vh]">
              <Outlet />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;