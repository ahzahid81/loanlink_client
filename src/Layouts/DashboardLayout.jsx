import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Dashboard Layout (Assignment Correct)
 * - Role based sidebar
 * - Proper active link handling (NavLink + end)
 * - Sticky sidebar
 * - Clean UX spacing
 */

const DashboardLayout = () => {
  const { role, user } = useAuth();

  const isAdmin = role === "admin";
  const isManager = role === "manager";
  const isBorrower = role === "borrower";

  const SidebarLink = ({ to, children, end = false }) => (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition",
          isActive
            ? "bg-primary text-primary-content"
            : "text-base-content hover:bg-base-200",
        ].join(" ")
      }
    >
      {children}
    </NavLink>
  );

  return (
    <div className="min-h-screen bg-base-200">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* SIDEBAR */}
          <aside className="md:col-span-3">
            <div className="sticky top-6 bg-base-100 border border-base-300 rounded-xl p-4">
              {/* USER INFO */}
              <div className="mb-4">
                <p className="text-xs uppercase tracking-wide text-base-content/60">
                  Signed in as
                </p>
                <p className="font-semibold text-sm truncate">
                  {user?.displayName || user?.email || "User"}
                </p>
                <p className="text-[11px] text-base-content/60">
                  Role: {role || "N/A"}
                </p>
              </div>

              <div className="divider my-3" />

              {/* NAVIGATION */}
              <nav className="space-y-1">
                <SidebarLink to="/dashboard" end>
                  Overview
                </SidebarLink>

                <SidebarLink to="/dashboard/profile">
                  My Profile
                </SidebarLink>

                {isBorrower && (
                  <>
                    <p className="mt-4 px-3 text-[11px] uppercase tracking-wide text-base-content/50">
                      Borrower
                    </p>
                    <SidebarLink to="/dashboard/my-loans">
                      My Loans
                    </SidebarLink>
                  </>
                )}

                {isManager && (
                  <>
                    <p className="mt-4 px-3 text-[11px] uppercase tracking-wide text-base-content/50">
                      Manager
                    </p>
                    <SidebarLink to="/dashboard/add-loan">
                      Add Loan
                    </SidebarLink>
                    <SidebarLink to="/dashboard/manage-loans">
                      Manage Loans
                    </SidebarLink>
                    <SidebarLink to="/dashboard/pending-loans">
                      Pending Applications
                    </SidebarLink>
                    <SidebarLink to="/dashboard/approved-loans">
                      Approved Applications
                    </SidebarLink>
                  </>
                )}

                {isAdmin && (
                  <>
                    <p className="mt-4 px-3 text-[11px] uppercase tracking-wide text-base-content/50">
                      Admin
                    </p>
                    <SidebarLink to="/dashboard/manage-users">
                      Manage Users
                    </SidebarLink>
                    <SidebarLink to="/dashboard/all-loan">
                      All Loans
                    </SidebarLink>
                    <SidebarLink to="/dashboard/loan-applications">
                      Loan Applications
                    </SidebarLink>
                  </>
                )}
              </nav>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="md:col-span-9">
            <section className="bg-base-100 border border-base-300 rounded-xl p-4 md:p-6 min-h-[60vh]">
              <Outlet />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
