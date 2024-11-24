import React, { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { audioManager } from "../utils/audioManager";
import {
  categories,
  getCategoryColor,
  formatTime,
} from "../utils/categoryUtils";

function ActivityCard({
  activity,
  onDoubleClick,
  isActive,
  onTimeUpdate,
  onComplete,
}) {
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        if (activity.remainingTime <= 1) {
          clearInterval(intervalRef.current);

          // Use the global audio manager
          audioManager.play();

          toast.success(`${activity.title} completed!`, {
            icon: "🎉",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });

          onComplete(activity.id);
        } else {
          onTimeUpdate(activity.id, activity.remainingTime - 1);
        }
      }, 1000);

      return () => clearInterval(intervalRef.current);
    }
  }, [isActive, activity.remainingTime, activity.id, activity.title]);

  const progressPercent =
    ((activity.totalTime - activity.remainingTime) / activity.totalTime) * 100;

  if (isNaN(activity.remainingTime)) {
    return null;
  }

  return (
    <div
      onDoubleClick={() => onDoubleClick(activity)}
      className="relative w-full p-4 rounded-xl shadow-sm border border-gray-100
        hover:shadow-md transform transition-all duration-300 hover:scale-[1.02] 
        cursor-pointer bg-white"
    >
      <div className="flex flex-col h-full">
        <div className="text-lg font-medium text-[#2c3e50] mb-2">
          {activity.title}
        </div>

        {/* Only show label if category exists */}
        {activity.category && (
          <div className="mb-3">
            <span
              className={`
              inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium
              border ${getCategoryColor(activity.category).label}
            `}
            >
              {categories.find((c) => c.id === activity.category)?.icon}
              {categories.find((c) => c.id === activity.category)?.label}
            </span>
          </div>
        )}

        {/* Timer and Progress Bar */}
        <div className="mt-auto">
          <div className="text-lg sm:text-xl font-mono">
            {formatTime(activity.remainingTime)}
          </div>

          {isActive && (
            <div className="mt-2">
              <div className="bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${
                    activity.category
                      ? getCategoryColor(activity.category).progress
                      : "from-red-400 to-red-600"
                  } 
                    transition-all duration-1000`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActivityCard;
