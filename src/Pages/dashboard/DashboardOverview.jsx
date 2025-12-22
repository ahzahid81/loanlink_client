import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import axiosSecure from "../../services/axiosSecure";
import { useAuth } from "../../context/AuthContext";
import PageTitle from "../../Component/PageTitle";

const COLORS = ["#facc15", "#22c55e", "#ef4444"];

const DashboardOverview = () => {
  const { role } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard-stats");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-error text-center">
        Failed to load dashboard statistics
      </p>
    );
  }

  // ✅ SAFE destructuring (prevents crash)
  const {
    totalLoans = 0,
    totalApplications = 0,
    pending = 0,
    approved = 0,
    rejected = 0,
    monthly = [],
  } = data || {};

  const pieData = [
    { name: "Pending", value: pending },
    { name: "Approved", value: approved },
    { name: "Rejected", value: rejected },
  ];

  // ⚠️ Month-only aggregation (backend returns month number)
  const monthlyData = monthly.map((m) => ({
    month: new Date(2025, m._id - 1).toLocaleString("default", {
      month: "short",
    }),
    count: m.count,
  }));

  return (
    <div>
      <PageTitle title={"Overview"}></PageTitle>
      <h2 className="text-xl md:text-2xl font-bold mb-6">
        Dashboard Overview
      </h2>

      {/* ===== STATS ===== */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Stat title="Total Loans" value={totalLoans} />
        <Stat title="Pending Applications" value={pending} />
        <Stat title="Approved Loans" value={approved} />
        <Stat title="Rejected Loans" value={rejected} />

        {role === "admin" && (
          <Stat title="Total Applications" value={totalApplications} />
        )}
      </div>

      {/* ===== CHARTS ===== */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* BAR CHART */}
        <div className="bg-base-100 border border-base-200 rounded-xl p-4">
          <h3 className="font-semibold mb-3">
            Monthly Loan Applications
          </h3>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar
                  dataKey="count"
                  fill="#6366f1"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PIE CHART */}
        <div className="bg-base-100 border border-base-200 rounded-xl p-4">
          <h3 className="font-semibold mb-3">
            Application Status Distribution
          </h3>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  dataKey="value"
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const Stat = ({ title, value }) => (
  <div className="bg-base-100 border border-base-200 rounded-xl p-4">
    <p className="text-xs text-base-content/60">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default DashboardOverview;
