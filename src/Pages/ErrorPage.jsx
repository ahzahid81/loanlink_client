import React from "react";
import { Link, useRouteError } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import PageTitle from "../Component/PageTitle";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <PageTitle title={"Error"}></PageTitle>
      <div className="max-w-md w-full bg-base-100 border border-base-200 rounded-2xl p-8 text-center shadow-lg">
        <div className="flex justify-center mb-4">
          <FaExclamationTriangle className="text-error text-5xl" />
        </div>

        <h1 className="text-4xl font-extrabold text-error mb-2">
          Oops!
        </h1>

        <p className="text-base-content/70 mb-4">
          Sorry, an unexpected error has occurred.
        </p>

        {/* Error Message */}
        {error && (
          <div className="bg-base-200 rounded-lg p-3 mb-4 text-sm text-left">
            <p className="font-semibold">Error:</p>
            <p className="break-words">
              {error.statusText || error.message || "Page not found"}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
          <button
            className="btn btn-outline"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
