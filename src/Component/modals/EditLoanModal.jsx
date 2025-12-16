import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosSecure from "../../services/axiosSecure";

const EditLoanModal = ({ loan, modalId, refetch }) => {
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (loan) {
            reset({
                title: loan.title,
                category: loan.category,
                interest: loan.interest,
                maxLimit: loan.maxLimit,
            });
        }
    }, [loan, reset]);

    const onSubmit = async (data) => {
        try {
            await axiosSecure.patch(`/loans/${loan._id}`, data);
            refetch();
            document.getElementById(modalId).checked = false;
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <input type="checkbox" id={modalId} className="modal-toggle" />

            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">Edit Loan</h3>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                        <input
                            {...register("title", { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Title"
                        />

                        <input
                            {...register("category", { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Category"
                        />


                        <input
                            type="number"
                            step="0.1"
                            {...register("interest", { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Interest"
                        />

                        <input
                            type="number"
                            {...register("maxLimit", { required: true })}
                            className="input input-bordered w-full"
                            placeholder="Max Limit"
                        />

                        <div className="modal-action">
                            <label htmlFor={modalId} className="btn btn-outline">
                                Cancel
                            </label>
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditLoanModal;
