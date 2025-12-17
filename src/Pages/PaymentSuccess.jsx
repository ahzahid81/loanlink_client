import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosSecure from "../services/axiosSecure";
import Swal from "sweetalert2";

const PaymentSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        await axiosSecure.post(`/payment-success/${id}`);

        Swal.fire({
          title: "Payment Successful 🎉",
          text: "Your application fee has been paid.",
          icon: "success",
          confirmButtonText: "Go to My Loans",
        }).then(() => {
          navigate("/dashboard/my-loans");
        });
      } catch (err) {
        Swal.fire("Error", "Failed to confirm payment.", "error");
      }
    };

    confirmPayment();
  }, [id, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-spinner loading-lg" />
    </div>
  );
};

export default PaymentSuccess;
