import React from "react";
import { useAuth } from "../../context/AuthContext";

const DashboardHome = () => {
  const { user, role } = useAuth();

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-2">
        Welcome, {user?.displayName || "User"}
      </h1>

      <p className="text-sm text-base-content/70 mb-6">
        You are logged in as <strong>{role}</strong>.
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="p-5 rounded-xl bg-base-100 border">
          <h3 className="font-semibold mb-1">Quick Actions</h3>
          <p className="text-sm text-base-content/70">
            Use the sidebar to manage your tasks.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-base-100 border">
          <h3 className="font-semibold mb-1">Status</h3>
          <p className="text-sm text-base-content/70">
            Track loans, applications, and approvals.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-base-100 border">
          <h3 className="font-semibold mb-1">Security</h3>
          <p className="text-sm text-base-content/70">
            Your data is protected with JWT & Firebase.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;