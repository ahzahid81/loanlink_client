import React from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// TEMP: demo data – later replace with API call
const demoLoans = [
  {
    _id: "demo-1",
    title: "Small Business Starter Loan",
    description:
      "A flexible microloan designed for new and small businesses to cover inventory, setup or expansion costs.",
    category: "Business",
    interest: 8.5,
    maxLimit: 5000,
    emiPlans: ["3 months", "6 months", "12 months"],
    image:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
  },
  {
    _id: "demo-2",
    title: "Agriculture Support Loan",
    description:
      "Support for farmers to purchase seeds, fertilizer or small equipment with friendly EMI options.",
    category: "Agriculture",
    interest: 7.2,
    maxLimit: 3000,
    emiPlans: ["6 months", "9 months", "12 months"],
    image:
      "https://images.pexels.com/photos/219794/pexels-photo-219794.jpeg",
  },
];

const LoanDetails = () => {
  const { id } = useParams();
  const { user, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // TEMP: find from demo list – replace with API later
  const loan = demoLoans.find((l) => l._id === id) || demoLoans[0];

  const isBorrower = role === "borrower";
  const isManagerOrAdmin = role === "manager" || role === "admin";

  const handleApply = () => {
    if (!user) {
      // Not logged in → send to login, remember where user came from
      navigate("/login", { state: { from: location } });
      return;
    }

    if (!isBorrower) {
      // Admin / manager shouldn't apply
      return;
    }

    // Borrower & logged in → go to application form page (we'll build later)
    navigate(`/apply/${loan._id}`);
  };

  // Decide button label and disabled state
  let applyLabel = "Apply Now";
  let applyDisabled = false;

  if (!user) {
    applyLabel = "Login to Apply";
  } else if (isManagerOrAdmin) {
    applyLabel = "Only borrowers can apply";
    applyDisabled = true;
  }

  return (
    <div className="bg-base-100">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        {/* Breadcrumb / Back link */}
        <div className="mb-4 text-sm">
          <Link to="/all-loans" className="link link-hover text-base-content/70">
            ← Back to All Loans
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* LEFT: IMAGE */}
          <div className="rounded-2xl overflow-hidden border border-base-200 bg-base-100">
            <div className="h-64 md:h-80 w-full">
              <img
                src={loan.image}
                alt={loan.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT: DETAILS */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-base-content">
              {loan.title}
            </h1>
            <p className="mt-2 text-sm text-base-content/70">
              Category:{" "}
              <span className="font-medium text-base-content">
                {loan.category}
              </span>
            </p>

            <p className="mt-4 text-sm md:text-base text-base-content/80 leading-relaxed">
              {loan.description}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-base-100 border border-base-200">
                <p className="text-base-content/60 text-xs uppercase tracking-wide">
                  Interest Rate
                </p>
                <p className="text-lg font-semibold text-base-content">
                  {loan.interest}% per year
                </p>
              </div>
              <div className="p-4 rounded-xl bg-base-100 border border-base-200">
                <p className="text-base-content/60 text-xs uppercase tracking-wide">
                  Max Loan Limit
                </p>
                <p className="text-lg font-semibold text-base-content">
                  ${loan.maxLimit.toLocaleString()}
                </p>
              </div>
            </div>

            {/* EMI PLANS */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-base-content mb-2">
                Available EMI Plans
              </p>
              <div className="flex flex-wrap gap-2">
                {loan.emiPlans?.map((plan) => (
                  <span key={plan} className="badge badge-outline">
                    {plan}
                  </span>
                ))}
              </div>
            </div>

            {/* APPLY BUTTON */}
            <div className="mt-8 flex flex-col md:flex-row gap-3 md:items-center">
              <button
                onClick={handleApply}
                disabled={applyDisabled}
                className="btn btn-primary min-w-[150px] disabled:btn-disabled"
              >
                {applyLabel}
              </button>

              <p className="text-xs text-base-content/60">
                By applying, you agree to share your income details, contact
                information and repayment plans with the loan manager.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
