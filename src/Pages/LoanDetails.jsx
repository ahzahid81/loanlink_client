// src/pages/LoanDetails.jsx
import React from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import axiosSecure from "../services/axiosSecure";

const fetchLoanById = async (id) => {
  const res = await axiosSecure.get(`/loans/${id}`);
  return res.data;
};

const LoanDetails = () => {
  const { id } = useParams();
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    data: loan,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["loan", id],
    queryFn: () => fetchLoanById(id),
    enabled: !!id,
  });

  const isBorrower = role === "borrower";
  const isManagerOrAdmin = role === "manager" || role === "admin";

  const handleApply = () => {
    if (!user) {
      navigate("/login", { state: { from: location } });
      return;
    }

    if (!isBorrower) return;

    navigate(`/apply/${loan._id}`);
  };

  let applyLabel = "Apply Now";
  let applyDisabled = false;

  if (!user) {
    applyLabel = "Login to Apply";
  } else if (isManagerOrAdmin) {
    applyLabel = "Only borrowers can apply";
    applyDisabled = true;
  }

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <span className="loading loading-dots loading-lg text-primary" />
      </div>
    );
  }

  if (isError || !loan) {
    return (
      <div className="py-20 text-center text-red-500">
        Failed to load loan details.
      </div>
    );
  }

  return (
    <div className="bg-base-100">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        {/* Back */}
        <div className="mb-4 text-sm">
          <Link to="/all-loans" className="link link-hover text-base-content/70">
            ← Back to All Loans
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* IMAGE */}
          <div className="rounded-2xl overflow-hidden border border-base-200">
            <img
              src={loan.images?.[0]}
              alt={loan.title}
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>

          {/* DETAILS */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              {loan.title}
            </h1>

            <p className="mt-2 text-sm text-base-content/70">
              Category:{" "}
              <span className="font-medium">{loan.category}</span>
            </p>

            <p className="mt-4 text-sm md:text-base text-base-content/80">
              {loan.description}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border">
                <p className="text-xs uppercase text-base-content/60">
                  Interest Rate
                </p>
                <p className="text-lg font-semibold">
                  {loan.interest}%
                </p>
              </div>
              <div className="p-4 rounded-xl border">
                <p className="text-xs uppercase text-base-content/60">
                  Max Loan Limit
                </p>
                <p className="text-lg font-semibold">
                  ${loan.maxLimit.toLocaleString()}
                </p>
              </div>
            </div>

            {/* EMI Plans */}
            <div className="mt-6">
              <p className="text-sm font-semibold mb-2">
                Available EMI Plans
              </p>
              <div className="flex flex-wrap gap-2">
                {loan.emiPlans?.map((plan, i) => (
                  <span key={i} className="badge badge-outline">
                    {plan.months} months – ${plan.monthlyAmount}/mo
                  </span>
                ))}
              </div>
            </div>

            {/* APPLY */}
            <div className="mt-8 flex flex-col md:flex-row gap-3">
              <button
                onClick={handleApply}
                disabled={applyDisabled}
                className="btn btn-primary min-w-[160px]"
              >
                {applyLabel}
              </button>

              <p className="text-xs text-base-content/60 max-w-md">
                By applying, you agree to share your income details and
                repayment information with the loan manager.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
