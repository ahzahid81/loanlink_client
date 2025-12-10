// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
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
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-base-content">
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

            <div className="mt-6 grid grid-cols-2 gap-4 text-xs md:text-sm text-base-content/70">
              <div>
                <p className="font-semibold text-base-content">+2x faster</p>
                <p>loan approvals for officers</p>
              </div>
              <div>
                <p className="font-semibold text-base-content">Built-in</p>
                <p>role-based dashboards</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="rounded-2xl border border-base-200 bg-base-100 shadow-sm p-5 md:p-6">
              <p className="text-sm font-semibold mb-4">
                Portfolio Snapshot (Demo)
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-base-content/70">Active Loans</span>
                  <span className="font-semibold text-base-content">128</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/70">
                    Pending Applications
                  </span>
                  <span className="font-semibold text-warning">14</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/70">
                    On-time Repayment Rate
                  </span>
                  <span className="font-semibold text-success">92%</span>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 text-[11px]">
                <div className="badge badge-outline">Borrower View</div>
                <div className="badge badge-outline badge-primary">
                  Manager Tools
                </div>
                <div className="badge badge-outline badge-ghost">
                  Admin Control
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT (aligned with navbar width) */}
      <main className="max-w-7xl mx-auto px-4 py-10 md:py-14 space-y-14">
        {/* AVAILABLE LOANS */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl md:text-3xl font-bold text-base-content">
              Available Loans
            </h2>
            <Link to="/all-loans" className="link text-sm text-primary">
              View all loans →
            </Link>
          </div>
          <p className="text-sm text-base-content/70 mb-6 max-w-2xl">
            Browse microloan products tailored for small businesses, farmers and
            individuals. Loaded from real data in your dashboard later.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* TODO: Replace with real MongoDB data */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="card bg-base-100 border border-base-200 hover:border-primary/50 hover:shadow-md transition"
              >
                <figure className="h-40 w-full bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
                <div className="card-body p-4">
                  <h3 className="card-title text-base">
                    Starter Business Loan #{i}
                  </h3>
                  <p className="text-xs text-base-content/70">
                    Ideal for micro-entrepreneurs who need a small capital
                    boost to grow.
                  </p>
                  <div className="mt-3 flex justify-between text-[11px] text-base-content/80">
                    <span>Max: $5,000</span>
                    <span>Interest: 8.5%</span>
                  </div>
                  <div className="card-actions mt-4 justify-end">
                    <Link
                      to={`/loan/demo-${i}`} // later use real _id
                      className="btn btn-sm btn-outline"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-base-content mb-3">
            How It Works
          </h2>
          <p className="text-sm text-base-content/70 mb-6 max-w-2xl">
            A simple 3-step flow designed for borrowers, managers and admins.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="p-5 rounded-2xl bg-base-100 border border-base-200">
              <div className="text-3xl mb-2">1</div>
              <h3 className="font-semibold mb-2 text-base-content">
                Submit Application
              </h3>
              <p className="text-sm text-base-content/70">
                Borrowers create an account, pick a loan product and submit
                their application online.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-base-100 border border-base-200">
              <div className="text-3xl mb-2">2</div>
              <h3 className="font-semibold mb-2 text-base-content">
                Manager Reviews
              </h3>
              <p className="text-sm text-base-content/70">
                Loan officers validate data, check required documents and
                approve or reject with one click.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-base-100 border border-base-200">
              <div className="text-3xl mb-2">3</div>
              <h3 className="font-semibold mb-2 text-base-content">
                Track & Repay
              </h3>
              <p className="text-sm text-base-content/70">
                Approved borrowers track disbursement, EMIs and repayments from
                their dashboard.
              </p>
            </div>
          </div>
        </section>

        {/* CUSTOMER FEEDBACK (DaisyUI Carousel) */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-base-content mb-3">
            Customer Feedback
          </h2>
          <p className="text-sm text-base-content/70 mb-6 max-w-2xl">
            A quick look at what borrowers and managers might say about using
            LoanLink in real life.
          </p>

          <div className="carousel w-full rounded-2xl bg-base-100 border border-base-200">
            <div id="slide1" className="carousel-item relative w-full p-8">
              <p className="text-base md:text-lg italic text-base-content/90">
                “LoanLink made it easy to apply for a loan for my small shop. I
                could track everything without visiting the branch.”
              </p>
              <p className="mt-3 text-sm font-semibold text-base-content/80">
                — Amina, Retail Borrower
              </p>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-4 right-4 top-1/2">
                <a href="#slide3" className="btn btn-circle btn-sm">
                  ❮
                </a>
                <a href="#slide2" className="btn btn-circle btn-sm">
                  ❯
                </a>
              </div>
            </div>

            <div id="slide2" className="carousel-item relative w-full p-8">
              <p className="text-base md:text-lg italic text-base-content/90">
                “As a loan officer, I can see pending, approved and rejected
                applications in one place. No more spreadsheet chaos.”
              </p>
              <p className="mt-3 text-sm font-semibold text-base-content/80">
                — Rahim, Loan Officer
              </p>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-4 right-4 top-1/2">
                <a href="#slide1" className="btn btn-circle btn-sm">
                  ❮
                </a>
                <a href="#slide3" className="btn btn-circle btn-sm">
                  ❯
                </a>
              </div>
            </div>

            <div id="slide3" className="carousel-item relative w-full p-8">
              <p className="text-base md:text-lg italic text-base-content/90">
                “We support many community borrowers, and the clear status
                tracking helps us stay transparent and organized.”
              </p>
              <p className="mt-3 text-sm font-semibold text-base-content/80">
                — Community NGO Partner
              </p>
              <div className="absolute flex justify-between transform -translate-y-1/2 left-4 right-4 top-1/2">
                <a href="#slide2" className="btn btn-circle btn-sm">
                  ❮
                </a>
                <a href="#slide1" className="btn btn-circle btn-sm">
                  ❯
                </a>
              </div>
            </div>
          </div>
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
