import React from "react";
import { Link } from "react-router-dom";
import {
  categories,
  getCategoryColor,
  formatTime,
} from "../utils/categoryUtils";

function HistoryPage({ completedActivities }) {
  return (
    <div className="min-h-screen bg-[#f8f9ff] font-['Poppins']">
      <div className="container mx-auto p-6 pt-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#2c3e50]">
            Activity History
          </h1>
          <Link
            to="/"
            className="px-4 py-2 rounded-lg bg-white border border-gray-200 
              hover:bg-gray-50 text-gray-700 transition-colors flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Tracker
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          {completedActivities.length === 0 ? (
            <div className="min-h-[300px] flex flex-col items-center justify-center text-gray-500 space-y-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <p>No completed activities in this session</p>
              <Link
                to="/"
                className="text-blue-500 hover:text-blue-600 font-medium"
              >
                Start tracking activities
              </Link>
            </div>
          ) : (
            <div className="relative pl-8 py-4">
              {/* Timeline Branch */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500" />

              {/* Activity Items */}
              <div className="space-y-8">
                {completedActivities.map((activity) => (
                  <div key={activity.id} className="relative">
                    {/* Timeline Node */}
                    <div className="absolute -left-[23px] top-1.5 w-4 h-4 rounded-full border-2 border-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-md" />

                    {/* Activity Card */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 ml-2">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-sm sm:text-base font-medium text-gray-900">
                          {activity.title}
                        </h3>
                        <span className="text-xs sm:text-sm text-gray-500">
                          {new Date(activity.completedAt).toLocaleTimeString()}
                        </span>
                      </div>

                      {activity.category && (
                        <span
                          className={`
                          inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium
                          border ${
                            getCategoryColor(activity.category).label
                          } mb-2
                        `}
                        >
                          {
                            categories.find((c) => c.id === activity.category)
                              ?.icon
                          }
                          {
                            categories.find((c) => c.id === activity.category)
                              ?.label
                          }
                        </span>
                      )}

                      <div className="text-xs sm:text-sm text-gray-600">
                        Duration: {formatTime(activity.totalTime)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;
