import React from "react";
import { useAuth } from "../../context/AuthContext";

const DashboardProfile = () => {
  const { user, role, logoutUser } = useAuth();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <div className="grid md:grid-cols-[160px,1fr] gap-6 items-start">
        <div className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 rounded-full overflow-hidden border border-base-300">
            <img
              src={user?.photoURL || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <button onClick={logoutUser} className="btn btn-outline btn-sm">Logout</button>
        </div>

        <div className="space-y-2 text-sm">
          <div>
            <p className="font-semibold">Name</p>
            <p className="text-base-content/70">{user?.displayName || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold">Email</p>
            <p className="text-base-content/70">{user?.email}</p>
          </div>
          <div>
            <p className="font-semibold">Role</p>
            <p className="text-base-content/70">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfile;
