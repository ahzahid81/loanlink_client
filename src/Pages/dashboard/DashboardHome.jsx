import React from "react";
import { useAuth } from "../../context/AuthContext";

const DashboardHome = () => {
  const { user, role } = useAuth();

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-3">
        Welcome back, {user?.displayName || "User"} 👋
      </h1>
      <p className="text-sm text-base-content/70 mb-6">
        You are logged in as <span className="font-semibold">{role}</span>. Use
        the sidebar to navigate through your dashboard tools.
      </p>

      <div className="grid md:grid-cols-3 gap-4 text-sm">
        <div className="p-4 rounded-xl bg-base-200/60">
          <p className="font-semibold mb-1">Quick Tip</p>
          <p className="text-base-content/70">
            Keep your profile up to date so managers and admins can verify your
            applications faster.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-base-200/60">
          <p className="font-semibold mb-1">Status</p>
          <p className="text-base-content/70">
            This section will later show quick stats relevant to your role.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-base-200/60">
          <p className="font-semibold mb-1">Next Steps</p>
          <p className="text-base-content/70">
            Borrowers can review their loans, managers can approve, and admins
            can manage users and products.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
