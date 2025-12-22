// src/pages/ApplyLoan.jsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../services/axiosSecure";
import Swal from "sweetalert2";
import PageTitle from "../Component/PageTitle";

const fetchLoan = async (id) => {
  const res = await axiosSecure.get(`/loans/${id}`);
  return res.data;
};

const ApplyLoan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, role } = useAuth();

  const {
    data: loan,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["loan", id],
    queryFn: () => fetchLoan(id),
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  // Block manager/admin
  if (role === "manager" || role === "admin") {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-semibold text-error">
          Only borrowers can apply for loans.
        </h2>
      </div>
    );
  }

  const onSubmit = async (data) => {
    const applicationData = {
      loanId: loan._id,
      loanTitle: loan.title,
      interest: loan.interest,
      loanAmount: data.loanAmount,
      userEmail: user.email,
      applicantName: `${data.firstName} ${data.lastName}`,
      contact: data.contact,
      nid: data.nid,
      incomeSource: data.incomeSource,
      monthlyIncome: data.monthlyIncome,
      reason: data.reason,
      address: data.address,
      notes: data.notes || "",
    };

    try {
      await axiosSecure.post("/applications", applicationData);

      Swal.fire({
        icon: "success",
        title: "Application Submitted",
        text: "Your loan application is now pending review.",
        confirmButtonText: "Go to My Loans",
      }).then(() => {
        navigate("/dashboard/my-loans");
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Please try again later.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <span className="loading loading-dots loading-lg text-primary" />
      </div>
    );
  }

  if (isError || !loan) {
    return (
      <div className="py-20 text-center text-error">
        Failed to load loan information.
      </div>
    );
  }

  return (
    <div className="bg-base-100">
      <PageTitle title={"Apply Loan"}></PageTitle>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">
          Apply for: <span className="text-primary">{loan.title}</span>
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 gap-6 border border-base-200 p-6 rounded-xl"
        >
          {/* READ ONLY */}
          <input readOnly value={user.email} className="input input-bordered" />
          <input readOnly value={loan.title} className="input input-bordered" />
          <input
            readOnly
            value={`${loan.interest}%`}
            className="input input-bordered"
          />

          {/* FORM */}
          <input {...register("firstName", { required: true })} className="input input-bordered" placeholder="First Name" />
          <input {...register("lastName", { required: true })} className="input input-bordered" placeholder="Last Name" />
          <input {...register("contact", { required: true })} className="input input-bordered" placeholder="Contact Number" />
          <input {...register("nid", { required: true })} className="input input-bordered" placeholder="NID / Passport" />
          <input {...register("incomeSource", { required: true })} className="input input-bordered" placeholder="Income Source" />
          <input type="number" {...register("monthlyIncome", { required: true })} className="input input-bordered" placeholder="Monthly Income" />
          <input type="number" {...register("loanAmount", { required: true })} className="input input-bordered" placeholder="Requested Loan Amount" />

          <textarea {...register("reason", { required: true })} className="textarea textarea-bordered col-span-2" placeholder="Reason for Loan" />
          <textarea {...register("address", { required: true })} className="textarea textarea-bordered col-span-2" placeholder="Full Address" />
          <textarea {...register("notes")} className="textarea textarea-bordered col-span-2" placeholder="Extra Notes (optional)" />

          <button type="submit" className="btn btn-primary col-span-2">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyLoan;
