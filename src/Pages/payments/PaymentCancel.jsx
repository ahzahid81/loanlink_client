// src/pages/payment/PaymentCancel.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTimesCircle } from "react-icons/fa";

const PaymentCancel = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-md w-full bg-base-100 border border-base-200 rounded-2xl p-8 text-center shadow"
            >
                <FaTimesCircle className="text-error text-6xl mx-auto mb-4" />

                <h1 className="text-2xl font-bold mb-2">
                    Payment Cancelled
                </h1>

                <p className="text-sm text-base-content/70 mb-6">
                    Your payment was not completed.
                    No money has been charged.
                </p>

                <div className="space-y-2">
                    <button
                        onClick={() => navigate("/dashboard/my-loans")}
                        className="btn btn-outline w-full"
                    >
                        Back to My Loans
                    </button>

                    <button
                        onClick={() => navigate(-1)}
                        className="btn btn-primary w-full"
                    >
                        Try Again
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default PaymentCancel;
