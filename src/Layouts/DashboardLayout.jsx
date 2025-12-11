import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
  const { role, user } = useAuth();

  const isAdmin = role === "admin";
  const isManager = role === "manager";
  const isBorrower = role === "borrower";

  return (
    <div className="bg-base-100 min-h-[calc(100vh-4rem)]">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <div className="grid md:grid-cols-[260px,1fr] gap-6">
          {/* SIDEBAR */}
          <aside className="bg-base-100 border border-base-200 rounded-xl p-4 h-fit md:sticky md:top-24">
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

            <nav className="space-y-1 text-sm">
              {/* Common */}
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg ${
                    isActive
                      ? "bg-primary text-primary-content"
                      : "hover:bg-base-200"
                  }`
                }
              >
                Overview
              </NavLink>

              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg ${
                    isActive
                      ? "bg-primary text-primary-content"
                      : "hover:bg-base-200"
                  }`
                }
              >
                My Profile
              </NavLink>

              {/* Borrower-only links */}
              {isBorrower && (
                <>
                  <div className="mt-3 text-[11px] uppercase tracking-wide text-base-content/50">
                    Borrower
                  </div>
                  <NavLink
                    to="/dashboard/my-loans"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg ${
                        isActive
                          ? "bg-primary text-primary-content"
                          : "hover:bg-base-200"
                      }`
                    }
                  >
                    My Loans
                  </NavLink>
                </>
              )}

              {/* Manager-only links */}
              {isManager && (
                <>
                  <div className="mt-3 text-[11px] uppercase tracking-wide text-base-content/50">
                    Manager
                  </div>
                  <NavLink
                    to="/dashboard/add-loan"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg ${
                        isActive
                          ? "bg-primary text-primary-content"
                          : "hover:bg-base-200"
                      }`
                    }
                  >
                    Add Loan
                  </NavLink>
                  <NavLink
                    to="/dashboard/manage-loans"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg ${
                        isActive
                          ? "bg-primary text-primary-content"
                          : "hover:bg-base-200"
                      }`
                    }
                  >
                    Manage Loans
                  </NavLink>
                  <NavLink
                    to="/dashboard/pending-loans"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg ${
                        isActive
                          ? "bg-primary text-primary-content"
                          : "hover:bg-base-200"
                      }`
                    }
                  >
                    Pending Applications
                  </NavLink>
                  <NavLink
                    to="/dashboard/approved-loans"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg ${
                        isActive
                          ? "bg-primary text-primary-content"
                          : "hover:bg-base-200"
                      }`
                    }
                  >
                    Approved Applications
                  </NavLink>
                </>
              )}

              {/* Admin-only links */}
              {isAdmin && (
                <>
                  <div className="mt-3 text-[11px] uppercase tracking-wide text-base-content/50">
                    Admin
                  </div>
                  <NavLink
                    to="/dashboard/manage-users"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg ${
                        isActive
                          ? "bg-primary text-primary-content"
                          : "hover:bg-base-200"
                      }`
                    }
                  >
                    Manage Users
                  </NavLink>
                  <NavLink
                    to="/dashboard/all-loan"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg ${
                        isActive
                          ? "bg-primary text-primary-content"
                          : "hover:bg-base-200"
                      }`
                    }
                  >
                    All Loans
                  </NavLink>
                  <NavLink
                    to="/dashboard/loan-applications"
                    className={({ isActive }) =>
                      `block px-3 py-2 rounded-lg ${
                        isActive
                          ? "bg-primary text-primary-content"
                          : "hover:bg-base-200"
                      }`
                    }
                  >
                    Loan Applications
                  </NavLink>
                </>
              )}
            </nav>
          </aside>

          {/* MAIN CONTENT AREA */}
          <section className="bg-base-100 border border-base-200 rounded-xl p-4 md:p-6 min-h-[50vh]">
            <Outlet />
          </section>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
