import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen mt-[-35px]">
      <div className="flex justify-center items-center text-sm pl-4 pr-4 pt-3 pb-3 rounded-2xl bg-zinc-100 dark:bg-zinc-700">
        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        <span>🌟 Loading wonders... Please wait...</span>
      </div>
    </div>
  );
}
