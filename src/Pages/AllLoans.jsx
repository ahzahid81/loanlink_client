import React from "react";
import { Link } from "react-router-dom";

const AllLoans = () => {
  // TODO: later replace this with real data from backend
  const demoLoans = [
    {
      _id: "demo-1",
      title: "Small Business Starter Loan",
      category: "Business",
      interest: 8.5,
      maxLimit: 5000,
      image:
        "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg", // or any placeholder
    },
    {
      _id: "demo-2",
      title: "Agriculture Support Loan",
      category: "Agriculture",
      interest: 7.2,
      maxLimit: 3000,
      image:
        "https://images.pexels.com/photos/219794/pexels-photo-219794.jpeg",
    },
    {
      _id: "demo-3",
      title: "Education Microloan",
      category: "Education",
      interest: 6.9,
      maxLimit: 2000,
      image:
        "https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg",
    },
    {
      _id: "demo-4",
      title: "Women Entrepreneur Loan",
      category: "Women Empowerment",
      interest: 7.9,
      maxLimit: 4000,
      image:
        "https://images.pexels.com/photos/1181555/pexels-photo-1181555.jpeg",
    },
    {
      _id: "demo-5",
      title: "Emergency Personal Loan",
      category: "Personal",
      interest: 9.5,
      maxLimit: 1500,
      image:
        "https://images.pexels.com/photos/4968633/pexels-photo-4968633.jpeg",
    },
    {
      _id: "demo-6",
      title: "Student Support Loan",
      category: "Student",
      interest: 5.9,
      maxLimit: 2500,
      image:
        "https://images.pexels.com/photos/1462630/pexels-photo-1462630.jpeg",
    },
  ];

  return (
    <div className="bg-base-100">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-base-content">
              All Loans
            </h1>
            <p className="text-sm text-base-content/70 mt-1 max-w-2xl">
              Browse all microloan products available in the system. Later, this
              list will be loaded from MongoDB with filtering, search and
              pagination.
            </p>
          </div>

          {/* placeholder for future filter/search */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search by title or category"
              className="input input-sm md:input-md input-bordered w-full md:w-64"
              // TODO: hook this to actual search logic later
            />
            <button className="btn btn-sm md:btn-md btn-outline">
              Search
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {demoLoans.map((loan) => (
            <div
              key={loan._id}
              className="card bg-base-100 border border-base-200 hover:border-primary/50 hover:shadow-md transition"
            >
              <figure className="h-40 w-full overflow-hidden">
                <img
                  src={loan.image}
                  alt={loan.title}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-base">{loan.title}</h2>
                <p className="text-xs text-base-content/70">
                  Category: <span className="font-medium">{loan.category}</span>
                </p>

                <div className="mt-3 flex justify-between text-[11px] text-base-content/80">
                  <span>Interest: {loan.interest}%</span>
                  <span>Max: ${loan.maxLimit.toLocaleString()}</span>
                </div>

                <div className="card-actions mt-4 justify-end">
                  <Link
                    to={`/loan/${loan._id}`} // later use real MongoDB _id
                    className="btn btn-sm btn-outline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* TODO: later add pagination controls here */}
      </div>
    </div>
  );
};

export default AllLoans;
