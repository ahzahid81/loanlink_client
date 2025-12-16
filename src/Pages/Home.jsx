import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../services/axiosSecure";

const fetchHomeLoans = async () => {
  const res = await axiosSecure.get("/loans");
  return res.data;
};

const Home = () => {
  const {
    data: loans = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["home-loans"],
    queryFn: fetchHomeLoans,
    staleTime: 1000 * 60,
  });

  // ✅ Assignment rule: only 6 loans shown on home
  const homeLoans = loans
    .filter((loan) => loan.showOnHome)
    .slice(0, 6);

  return (
    <div className="bg-base-100">
      {/* HERO SECTION */}
      <section className="bg-base-100 border-b border-base-200">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="uppercase tracking-[0.3em] text-xs text-primary mb-3">
              Microloan Platform
            </p>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Smart microloans for{" "}
              <span className="text-primary">real people</span>.
            </h1>
            <p className="mt-4 text-sm md:text-base text-base-content/70 max-w-xl">
              LoanLink lets borrowers, managers and admins manage loan
              applications, approvals, EMIs and repayments in one modern
              dashboard.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/all-loans" className="btn btn-primary">
                Explore Loans
              </Link>
              <Link to="/dashboard" className="btn btn-outline">
                Apply for Loan
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 py-10 md:py-14 space-y-14">
        {/* AVAILABLE LOANS */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl md:text-3xl font-bold">
              Available Loans
            </h2>
            <Link to="/all-loans" className="link text-sm text-primary">
              View all loans →
            </Link>
          </div>

          <p className="text-sm text-base-content/70 mb-6 max-w-2xl">
            Browse microloan products fetched directly from our system.
          </p>

          {isLoading ? (
            <div className="text-center py-12">
              <span className="loading loading-dots loading-lg text-primary" />
            </div>
          ) : isError ? (
            <p className="text-red-500">Failed to load loans.</p>
          ) : homeLoans.length === 0 ? (
            <p className="text-base-content/70">No loans available.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {homeLoans.map((loan) => (
                <div
                  key={loan._id}
                  className="card bg-base-100 border border-base-200 hover:shadow-md transition"
                >
                  <figure className="h-40 w-full overflow-hidden">
                    <img
                      src={loan.images?.[0]}
                      alt={loan.title}
                      className="w-full h-full object-cover"
                    />
                  </figure>

                  <div className="card-body p-4">
                    <h3 className="card-title text-base">{loan.title}</h3>
                    <p className="text-xs text-base-content/70">
                      {loan.category}
                    </p>

                    <div className="mt-3 flex justify-between text-[11px]">
                      <span>Max: ${loan.maxLimit}</span>
                      <span>Interest: {loan.interest}%</span>
                    </div>

                    <div className="card-actions mt-4 justify-end">
                      <Link
                        to={`/loan/${loan._id}`}
                        className="btn btn-sm btn-outline"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* EXTRA SECTION 1 */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-base-content mb-3">
            Why Teams Choose LoanLink
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="p-5 rounded-2xl bg-base-100 border border-base-200">
              <h3 className="font-semibold mb-2 text-base-content">
                Centralized Workflow
              </h3>
              <p className="text-sm text-base-content/70">
                Replace scattered spreadsheets with a single source of truth for
                all loan applications.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-base-100 border border-base-200">
              <h3 className="font-semibold mb-2 text-base-content">
                Role-based Access
              </h3>
              <p className="text-sm text-base-content/70">
                Admins, managers and borrowers each see only what they need to
                make decisions quickly.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-base-100 border border-base-200">
              <h3 className="font-semibold mb-2 text-base-content">
                Data-driven Insights
              </h3>
              <p className="text-sm text-base-content/70">
                Use dashboards and charts (later in dashboard) to understand
                portfolio health and repayment trends.
              </p>
            </div>
          </div>
        </section>

        {/* EXTRA SECTION 2: CTA */}
        <section className="rounded-2xl bg-base-200/60 border border-base-200 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-base-content mb-2">
              Ready to streamline your microloan workflow?
            </h2>
            <p className="text-sm text-base-content/70 max-w-xl">
              Create a free account as a borrower or manager and test the
              end-to-end loan journey in LoanLink.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/register" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-outline">
              Already have an account?
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;

