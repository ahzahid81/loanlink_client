import React, { useEffect, useState } from "react";
import axiosSecure from "../../services/axiosSecure";
import Swal from "sweetalert2";
import { useForm, useFieldArray } from "react-hook-form";
import PageTitle from "../../Component/PageTitle";

const AdminAllLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editLoan, setEditLoan] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "emiPlans",
  });

  // Load all loans
  useEffect(() => {
    const loadLoans = async () => {
      try {
        const res = await axiosSecure.get("/loans");
        setLoans(res.data || []);
      } catch {
        Swal.fire("Error", "Failed to load loans", "error");
      } finally {
        setLoading(false);
      }
    };
    loadLoans();
  }, []);

  // Open edit modal
  const openEditModal = (loan) => {
    setEditLoan(loan);
    reset({
      title: loan.title,
      description: loan.description,
      category: loan.category,
      interest: loan.interest,
      maxLimit: loan.maxLimit,
      images: loan.images?.join(", "),
      emiPlans: loan.emiPlans || [],
    });
    document.getElementById("editLoanModal").showModal();
  };

  // Update loan
  const onUpdate = async (data) => {
    try {
      const updatedData = {
        ...data,
        images: data.images.split(",").map((i) => i.trim()),
      };

      await axiosSecure.patch(`/loans/${editLoan._id}`, updatedData);

      setLoans((prev) =>
        prev.map((l) =>
          l._id === editLoan._id ? { ...l, ...updatedData } : l
        )
      );

      document.getElementById("editLoanModal").close();
      Swal.fire("Updated", "Loan updated successfully", "success");
    } catch {
      Swal.fire("Error", "Failed to update loan", "error");
    }
  };

  // Toggle show on home
  const toggleHome = async (loan) => {
    await axiosSecure.patch(`/loans/${loan._id}/home`, {
      showOnHome: !loan.showOnHome,
    });

    setLoans((prev) =>
      prev.map((l) =>
        l._id === loan._id
          ? { ...l, showOnHome: !l.showOnHome }
          : l
      )
    );
  };

  // Delete loan
  const deleteLoan = async (loan) => {
    const confirm = await Swal.fire({
      title: "Delete Loan?",
      text: loan.title,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.delete(`/loans/${loan._id}`);
      setLoans((prev) => prev.filter((l) => l._id !== loan._id));
      Swal.fire("Deleted", "Loan deleted", "success");
    } catch {
      Swal.fire("Error", "Delete failed", "error");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  return (
    <div>
      <PageTitle title={"All Loan"}></PageTitle>
      <h2 className="text-xl md:text-2xl font-bold mb-4">
        All Loans (Admin)
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Category</th>
              <th>Interest</th>
              <th>Max</th>
              <th>Home</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan, i) => (
              <tr key={loan._id}>
                <td>{i + 1}</td>
                <td>{loan.title}</td>
                <td>{loan.category}</td>
                <td>{loan.interest}%</td>
                <td>${loan.maxLimit}</td>
                <td>
                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={loan.showOnHome}
                    onChange={() => toggleHome(loan)}
                  />
                </td>
                <td className="space-x-2">
                  <button
                    className="btn btn-xs btn-outline"
                    onClick={() => openEditModal(loan)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => deleteLoan(loan)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      <dialog id="editLoanModal" className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg mb-3">
            Edit Loan (Assignment Fields)
          </h3>

          <form onSubmit={handleSubmit(onUpdate)} className="space-y-3">
            <input {...register("title")} className="input input-bordered w-full" placeholder="Title" />
            <textarea {...register("description")} className="textarea textarea-bordered w-full" placeholder="Description" />
            <input {...register("category")} className="input input-bordered w-full" placeholder="Category" />
            <input type="number" {...register("interest")} className="input input-bordered w-full" placeholder="Interest %" />
            <input type="number" {...register("maxLimit")} className="input input-bordered w-full" placeholder="Max Limit" />
            <input {...register("images")} className="input input-bordered w-full" placeholder="Image URLs (comma separated)" />

            {/* EMI Plans */}
            <div>
              <p className="font-semibold mb-1">EMI Plans</p>
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 mb-2">
                  <input type="number" {...register(`emiPlans.${index}.months`)} placeholder="Months" className="input input-bordered w-full" />
                  <input type="number" {...register(`emiPlans.${index}.monthlyAmount`)} placeholder="Monthly Amount" className="input input-bordered w-full" />
                  <button type="button" className="btn btn-xs btn-error" onClick={() => remove(index)}>X</button>
                </div>
              ))}
              <button type="button" className="btn btn-xs" onClick={() => append({ months: "", monthlyAmount: "" })}>
                + Add EMI
              </button>
            </div>

            <div className="modal-action">
              <button type="submit" className="btn btn-primary">Save</button>
              <button type="button" className="btn" onClick={() => document.getElementById("editLoanModal").close()}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default AdminAllLoans;