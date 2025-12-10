// src/pages/ApplyLoan.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

// TEMP demo loans (replace later with real API)
const demoLoans = [
  {
    _id: "demo-1",
    title: "Small Business Starter Loan",
    interest: 8.5,
  },
  {
    _id: "demo-2",
    title: "Agriculture Support Loan",
    interest: 7.2,
  },
];

const ApplyLoan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, role } = useAuth();

  const [loan, setLoan] = useState(null);

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Load loan data (later replace with backend)
  useEffect(() => {
    const foundLoan = demoLoans.find((l) => l._id === id);
    setLoan(foundLoan || demoLoans[0]);
  }, [id]);

  // If not logged in → redirect to login
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  // Managers/Admins can't apply
  if (role === "manager" || role === "admin") {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-semibold text-error">
          Managers and Admins are not allowed to apply for loans.
        </h2>
      </div>
    );
  }

  // Submit Handler
  const onSubmit = async (data) => {
    const applicationData = {
      ...data,
      loanId: loan._id,
      loanTitle: loan.title,
      interestRate: loan.interest,
      userEmail: user.email,
      status: "pending",
      feeStatus: "unpaid",
      appliedAt: new Date(),
    };

    console.log("Final Application Data:", applicationData);

    // Later: await axiosSecure.post("/applications", applicationData);

    Swal.fire({
      title: "Application Submitted!",
      text: "Your loan request is now pending review.",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/dashboard/my-loans");
    });
  };

  if (!loan) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="bg-base-100">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">
          Apply for: <span className="text-primary">{loan.title}</span>
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-base-100 border border-base-200 p-6 rounded-xl shadow"
        >
          {/* READ-ONLY FIELDS */}
          <div className="form-control">
            <label className="label font-medium">Applicant Email</label>
            <input
              readOnly
              value={user.email}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">Loan Title</label>
            <input readOnly value={loan.title} className="input input-bordered w-full" />
          </div>

          <div className="form-control">
            <label className="label font-medium">Interest Rate</label>
            <input
              readOnly
              value={`${loan.interest}%`}
              className="input input-bordered w-full"
            />
          </div>

          {/* USER INPUT FIELDS */}

          <div className="form-control">
            <label className="label font-medium">First Name</label>
            <input
              {...register("firstName", { required: true })}
              className="input input-bordered"
              placeholder="Enter first name"
            />
            {errors.firstName && <p className="text-error text-xs">Required</p>}
          </div>

          <div className="form-control">
            <label className="label font-medium">Last Name</label>
            <input
              {...register("lastName", { required: true })}
              className="input input-bordered"
              placeholder="Enter last name"
            />
            {errors.lastName && <p className="text-error text-xs">Required</p>}
          </div>

          <div className="form-control">
            <label className="label font-medium">Contact Number</label>
            <input
              {...register("contact", { required: true })}
              className="input input-bordered"
              placeholder="017XXXXXXXX"
            />
            {errors.contact && <p className="text-error text-xs">Required</p>}
          </div>

          <div className="form-control">
            <label className="label font-medium">National ID / Passport No.</label>
            <input
              {...register("nid", { required: true })}
              className="input input-bordered"
              placeholder="Enter ID number"
            />
            {errors.nid && <p className="text-error text-xs">Required</p>}
          </div>

          <div className="form-control">
            <label className="label font-medium">Income Source</label>
            <input
              {...register("incomeSource", { required: true })}
              className="input input-bordered"
              placeholder="Business / Job / Farming"
            />
            {errors.incomeSource && (
              <p className="text-error text-xs">Required</p>
            )}
          </div>

          <div className="form-control">
            <label className="label font-medium">Monthly Income</label>
            <input
              {...register("monthlyIncome", { required: true })}
              type="number"
              className="input input-bordered"
              placeholder="Example: 20000"
            />
            {errors.monthlyIncome && (
              <p className="text-error text-xs">Required</p>
            )}
          </div>

          <div className="form-control">
            <label className="label font-medium">Loan Amount</label>
            <input
              {...register("loanAmount", { required: true })}
              type="number"
              className="input input-bordered"
              placeholder="Amount you're requesting"
            />
            {errors.loanAmount && (
              <p className="text-error text-xs">Required</p>
            )}
          </div>

          <div className="form-control col-span-2">
            <label className="label font-medium">Reason for Loan</label>
            <textarea
              {...register("reason", { required: true })}
              className="textarea textarea-bordered"
              placeholder="Explain why you need this loan"
            ></textarea>
            {errors.reason && (
              <p className="text-error text-xs">Required</p>
            )}
          </div>

          <div className="form-control col-span-2">
            <label className="label font-medium">Full Address</label>
            <textarea
              {...register("address", { required: true })}
              className="textarea textarea-bordered"
              placeholder="Address with district, post, village/street"
            ></textarea>
            {errors.address && (
              <p className="text-error text-xs">Required</p>
            )}
          </div>

          <div className="form-control col-span-2">
            <label className="label font-medium">Extra Notes (Optional)</label>
            <textarea
              {...register("notes")}
              className="textarea textarea-bordered"
              placeholder="Write if you want to add anything..."
            ></textarea>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="col-span-2 mt-4">
            <button type="submit" className="btn btn-primary w-full">
              Submit Loan Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyLoan;
