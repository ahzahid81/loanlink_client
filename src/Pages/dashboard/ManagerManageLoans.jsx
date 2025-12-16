import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axiosSecure from "../../services/axiosSecure";
import { useQuery } from '@tanstack/react-query';
import Swal from "sweetalert2";
import EditLoanModal from "../../Component/modals/EditLoanModal";


const fetchManagerLoans = async (email) => {
  const res = await axiosSecure.get("/loans", {
    params: { createdBy: email },
  });


  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res.data?.data)) return res.data.data;
  return [];
}


const ManagerManageLoans = () => {
  const { user } = useAuth();
  const [selectedLoan, setSelectedLoan] = useState(null);


  const {
    data: loans = [],
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["manager-loans", user?.email],
    enabled: !!user?.email,
    queryFn: () => fetchManagerLoans(user.email),
  })

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Loan?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });


    if (!confirm.isConfirmed) return;


    try {
      await axiosSecure.delete(`/loans/${id}`);
      Swal.fire("Deleted!", "Loan has been removed.", "success");
      refetch();
    } catch (err) {
      Swal.fire("Error", "Failed to delete loan.", "error")
    }
  };



  return (
    <div className="bg-base-100 p-4 rounded-xl">
      <h2 className="text-xl md:text-2xl font-bold mb-3">Manage Loans</h2>
      <p className="text-sm text-base-content/70 mb-4">List loans created by this manager, with edit/delete.</p>

      {
        isLoading && (
          <div className="text-center py-8">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        )
      }

      {
        isLoading && loans.length === 0 && (
          <div className="text-center text-base-content/60 py-6">
            You haven’t created any loans yet.
          </div>
        )
      }

      {
        isError && (
          <div className="text-red-500 text-sm">
            Failed to load loans: {error?.message}
          </div>
        )
      }
      {
        loans.length > 0 && (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr className="bg-base-200">
                  <th>#</th>
                  <th>Title</th>
                  <th>Interest</th>
                  <th>Category</th>
                  <th>Max Limit</th>
                  <th className=" text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  loans.map((loan, index) => (
                    <tr key={loan._id}>
                      <td>{index + 1}</td>
                      <td className="font-medium">{loan.title}</td>
                      <td>{loan.interest} %</td>
                      <td>{loan.category}</td>
                      <td>{loan.maxLimit}</td>
                      <td className="text-right space-x-2">
                        <label htmlFor={`edit-${loan._id}`} className="btn btn-xs btn-outline">
                          Edit
                        </label>

                        <EditLoanModal
                          loan={loan}
                          modalId={`edit-${loan._id}`}
                          refetch={refetch}
                        />

                        <button className="btn btn-xs btn-error" onClick={() => handleDelete(loan._id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        )
      }

      <EditLoanModal
        loan={selectedLoan}
        isOpen={!!selectedLoan}
        onClose={() => selectedLoan(null)}
        refetch={refetch}
      >
      </EditLoanModal>
    </div>
  );
};

export default ManagerManageLoans;
