import React from "react";
import { FaUsers, FaMoneyCheckAlt, FaUserShield } from "react-icons/fa";
import PageTitle from "../Component/PageTitle";

const About = () => {
  return (
    <div className="bg-base-100">
      <PageTitle title={"About"}></PageTitle>
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-base-content">
            About <span className="text-primary">LoanLink</span>
          </h1>
          <p className="mt-3 text-sm md:text-base text-base-content/70 max-w-3xl mx-auto">
            LoanLink is a role-based microloan management system designed to
            simplify loan applications, approvals, and repayments for borrowers,
            managers, and administrators.
          </p>
        </div>

        {/* MISSION */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-base-content mb-3">
            Our Mission
          </h2>
          <p className="text-base-content/70 max-w-4xl">
            Our mission is to provide a transparent, efficient, and accessible
            digital platform for managing microloans. LoanLink empowers small
            businesses, individuals, and organizations by streamlining the loan
            lifecycle from application to repayment while maintaining strong
            administrative control.
          </p>
        </section>

        {/* WHO IT IS FOR */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-base-content mb-6">
            Who LoanLink Is For
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Borrower */}
            <div className="p-6 rounded-2xl border border-base-200 bg-base-100">
              <FaUsers className="text-primary text-3xl mb-3" />
              <h3 className="font-semibold text-lg mb-2">Borrowers</h3>
              <p className="text-sm text-base-content/70">
                Apply for loans online, track application status, pay processing
                fees, and manage repayments from a personalized dashboard.
              </p>
            </div>

            {/* Manager */}
            <div className="p-6 rounded-2xl border border-base-200 bg-base-100">
              <FaMoneyCheckAlt className="text-secondary text-3xl mb-3" />
              <h3 className="font-semibold text-lg mb-2">Managers</h3>
              <p className="text-sm text-base-content/70">
                Create loan products, review borrower applications, approve or
                reject requests, and manage loan portfolios efficiently.
              </p>
            </div>

            {/* Admin */}
            <div className="p-6 rounded-2xl border border-base-200 bg-base-100">
              <FaUserShield className="text-accent text-3xl mb-3" />
              <h3 className="font-semibold text-lg mb-2">Administrators</h3>
              <p className="text-sm text-base-content/70">
                Control system-wide operations including user management, loan
                visibility, role assignment, and overall platform monitoring.
              </p>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold text-base-content mb-6">
            Key Features
          </h2>

          <ul className="grid gap-4 md:grid-cols-2 text-sm text-base-content/70">
            <li>✔ Role-based authentication and dashboards</li>
            <li>✔ Secure JWT authentication with HTTP-only cookies</li>
            <li>✔ Loan creation, management, and approval workflow</li>
            <li>✔ Borrower application tracking and cancellation</li>
            <li>✔ Stripe-based loan application fee payment</li>
            <li>✔ Admin-controlled “Show on Home” loan visibility</li>
            <li>✔ Fully responsive UI using Tailwind CSS & DaisyUI</li>
          </ul>
        </section>

        {/* TECHNOLOGY */}
        <section>
          <h2 className="text-2xl font-bold text-base-content mb-4">
            Technology Stack
          </h2>
          <p className="text-base-content/70 max-w-4xl">
            LoanLink is built using modern web technologies including React,
            React Router, TanStack Query, Node.js, Express.js, MongoDB, Firebase
            Authentication, Stripe, and Tailwind CSS with DaisyUI. This ensures
            scalability, security, and a smooth user experience.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
