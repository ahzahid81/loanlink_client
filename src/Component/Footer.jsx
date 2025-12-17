import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Footer = () => {
  const { user } = useAuth();

  const footerLinks = (
    <>
      <NavLink to="/" className="hover:text-yellow-300">Home</NavLink>
      <NavLink to="/all-loans" className="hover:text-yellow-300">All Loans</NavLink>
      {!user && (
        <>
          <NavLink to="/about" className="hover:text-yellow-300">About</NavLink>
          <NavLink to="/contact" className="hover:text-yellow-300">Contact</NavLink>
        </>
      )}
      {user && (
        <NavLink to="/dashboard" className="hover:text-yellow-300">
          Dashboard
        </NavLink>
      )}
    </>
  );

  return (
    <footer className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3 items-start">

          {/* BRAND */}
          <div>
            <Link to="/" className="text-2xl font-extrabold tracking-wide">
              Loan <span className="text-yellow-300">Link</span>
            </Link>
            <p className="mt-3 text-sm text-white/80 max-w-xs">
              A modern microloan management platform for borrowers, managers,
              and administrators.
            </p>
          </div>

          {/* NAV LINKS */}
          <div>
            <h4 className="font-semibold mb-3 uppercase tracking-wide text-sm">
              Navigation
            </h4>
            <div className="flex flex-col space-y-2 text-sm font-medium">
              {footerLinks}
            </div>
          </div>

          {/* INFO */}
          <div>
            <h4 className="font-semibold mb-3 uppercase tracking-wide text-sm">
              Contact
            </h4>
            <div className="space-y-2 text-sm text-white/80">
              <p>Email: support@loanlink.com</p>
              <p>Phone: +966 50 924 2168</p>
              <p>Bangladesh Office: Sobujbug, Sylhet</p>
              <p>Saudi Office: Islamic University of Madinah, Madinah</p>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/20 my-6" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/70">
          <p>
            © {new Date().getFullYear()} LoanLink. All rights reserved.
          </p>
          <p>
            Built for assignment & portfolio showcase.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
