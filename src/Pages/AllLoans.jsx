// src/Pages/AllLoans.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../services/axiosSecure";

const PAGE_LIMIT = 9;

// ✅ Correct queryFn (TanStack v5)
const fetchLoans = async () => {
  const res = await axiosSecure.get("/loans");
  return res.data;
};

const AllLoans = () => {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  // debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(searchInput.trim().toLowerCase());
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [searchInput]);

  const {
    data: loans = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["loans"],
    queryFn: fetchLoans,
    staleTime: 1000 * 60,
  });

  // ✅ Client-side search
  const filteredLoans = useMemo(() => {
    if (!debouncedSearch) return loans;
    return loans.filter(
      (l) =>
        l.title?.toLowerCase().includes(debouncedSearch) ||
        l.category?.toLowerCase().includes(debouncedSearch)
    );
  }, [loans, debouncedSearch]);

  // ✅ Client-side pagination
  const start = (page - 1) * PAGE_LIMIT;
  const paginatedLoans = filteredLoans.slice(start, start + PAGE_LIMIT);
  const isLastPage = start + PAGE_LIMIT >= filteredLoans.length;

  return (
    <div className="bg-base-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">All Loans</h1>
            <p className="text-sm text-base-content/70 mt-1 max-w-2xl">
              Browse all microloan products available in the system.
            </p>
          </div>

          {/* Search */}
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by title or category"
            className="input input-sm md:input-md input-bordered w-full md:w-64"
          />
        </div>

        {/* States */}
        {isLoading ? (
          <div className="text-center py-16">
            <span className="loading loading-dots text-primary"></span>
          </div>
        ) : isError ? (
          <div className="text-center py-8 text-red-500">
            {error?.message || "Failed to load loans"}
          </div>
        ) : paginatedLoans.length === 0 ? (
          <div className="text-center py-8 text-base-content/70">
            No loans found.
          </div>
        ) : (
          <>
            {/* Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {paginatedLoans.map((loan) => (
                <div
                  key={loan._id}
                  className="card bg-base-100 border border-base-200 hover:shadow-md"
                >
                  <figure className="h-40 w-full overflow-hidden">
                    <img
                      src={loan.images?.[0] || "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"}
                      alt={loan.title}
                      className="w-full h-full object-cover"
                    />
                  </figure>

                  <div className="card-body p-4">
                    <h2 className="card-title text-base">{loan.title}</h2>
                    <p className="text-xs text-base-content/70">
                      Category: {loan.category}
                    </p>

                    <div className="mt-3 flex justify-between text-[11px]">
                      <span>Interest: {loan.interest}%</span>
                      <span>Max: ${Number(loan.maxLimit).toLocaleString()}</span>
                    </div>

                    <div className="card-actions mt-4 justify-end">
                      <Link
                        to={`/loan/${loan._id}`}
                        className="btn btn-sm btn-outline"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-8">
              <span className="text-sm">Page {page}</span>
              <div className="btn-group">
                <button
                  className="btn btn-sm"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Prev
                </button>
                <button
                  className="btn btn-sm"
                  disabled={isLastPage}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllLoans;
