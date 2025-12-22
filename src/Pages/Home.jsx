import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../services/axiosSecure";
import PageTitle from "../Component/PageTitle";

const fetchHomeLoans = async () => {
  const res = await axiosSecure.get("/loans");
  return res.data;
};

const reviews = [
  {
    name: "Ayesha Rahman",
    role: "Small Business Owner",
    text: "LoanLink helped me get a loan quickly without confusion. The dashboard is very easy to use.",
  },
  {
    name: "Md. Rahim",
    role: "Farmer",
    text: "I applied for an agriculture loan and got approval smoothly. Very transparent process.",
  },
  {
    name: "John Smith",
    role: "Startup Founder",
    text: "As a manager, reviewing applications is fast and organized. Highly recommended.",
  },
];

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

  const homeLoans = loans.filter((l) => l.showOnHome).slice(0, 6);

  return (
    <div className="bg-base-100">
      <PageTitle title="Home | LoanLink" />

      {/* ================= HERO ================= */}
      <section className="border-b border-base-200">
        <div className="max-w-7xl mx-auto px-4 py-14 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="uppercase tracking-[0.3em] text-xs text-primary mb-3">
              Microloan Platform
            </p>

            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              Smart microloans for{" "}
              <span className="text-primary">real people</span>
            </h1>

            <p className="mt-4 text-base-content/70 max-w-xl">
              LoanLink connects borrowers, managers, and admins in one secure
              platform to manage loan requests, approvals, and repayments.
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

          <motion.img
            src="https://media.assettype.com/deccanherald%2F2025-04-03%2Fk8f8g24o%2FInstant-Personal-Loan.png?w=undefined&auto=format%2Ccompress&fit=max"
            alt="Loan illustration"
            className="w-full max-w-md mx-auto"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </section>

      {/* ================= MAIN ================= */}
      <main className="max-w-7xl mx-auto px-4 py-14 space-y-20">
        {/* ================= AVAILABLE LOANS ================= */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl md:text-3xl font-bold">
              Available Loans
            </h2>
            <Link to="/all-loans" className="text-primary text-sm">
              View all →
            </Link>
          </div>

          {isLoading ? (
            <div className="text-center py-10">
              <span className="loading loading-dots loading-lg" />
            </div>
          ) : isError ? (
            <p className="text-error">Failed to load loans.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {homeLoans.map((loan) => (
                <motion.div
                  key={loan._id}
                  whileHover={{ y: -6 }}
                  className="card bg-base-100 border border-base-200"
                >
                  <figure className="h-40">
                    <img
                      src={loan.images?.[0]}
                      alt={loan.title}
                      className="w-full h-full object-cover"
                    />
                  </figure>

                  <div className="card-body p-4">
                    <h3 className="font-semibold">{loan.title}</h3>
                    <p className="text-xs text-base-content/70">
                      {loan.category}
                    </p>

                    <div className="mt-3 flex justify-between text-xs">
                      <span>Max: ${loan.maxLimit}</span>
                      <span>{loan.interest}%</span>
                    </div>

                    <div className="card-actions justify-end mt-4">
                      <Link
                        to={`/loan/${loan._id}`}
                        className="btn btn-sm btn-outline"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            How It Works
          </h2>

          <div className="grid gap-6 md:grid-cols-4">
            {[
              "Choose a Loan",
              "Submit Application",
              "Pay Application Fee",
              "Get Approval & EMI Plan",
            ].map((step, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-6 border border-base-200 rounded-xl text-center"
              >
                <div className="text-3xl font-bold text-primary mb-2">
                  {i + 1}
                </div>
                <p className="font-medium">{step}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= REVIEWS ================= */}
        <section className="bg-base-200/60 p-8 rounded-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            What Our Users Say
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((r, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="bg-base-100 p-6 rounded-xl shadow"
              >
                <p className="text-sm text-base-content/70 mb-4">
                  “{r.text}”
                </p>
                <p className="font-semibold">{r.name}</p>
                <p className="text-xs text-base-content/60">{r.role}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= EXTRA SECTION ================= */}
        <section className="bg-base-100 border border-base-200 rounded-2xl p-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-2">
              Ready to get started?
            </h2>
            <p className="text-sm text-base-content/70 max-w-xl">
              Join LoanLink today and experience a modern microloan system.
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/register" className="btn btn-primary">
              Register
            </Link>
            <Link to="/login" className="btn btn-outline">
              Login
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;