import React, { useEffect } from "react";
import { categories, getCategoryColor } from "../utils/categoryUtils";
import { timerService } from "../utils/timerService";

function ActivityCard({
  activity,
  onDoubleClick,
  isActive,
  onTimeUpdate,
  onComplete,
}) {
  const categoryColors = getCategoryColor(activity.category);

  useEffect(() => {
    if (isActive && activity.remainingTime > 0) {
      timerService.startTimer(activity, onTimeUpdate, onComplete, false);
    }
  }, [isActive, activity.id, activity.remainingTime]);

  if (!activity.remainingTime) return null;

  return (
    <div
      onDoubleClick={() => onDoubleClick(activity)}
      className="relative w-full p-4 rounded-xl shadow-sm border border-gray-100
        hover:shadow-md transform transition-all duration-300 hover:scale-[1.02] 
        cursor-pointer bg-white"
    >
      <div className="text-lg font-medium text-[#2c3e50] mb-2">
        {activity.title}
      </div>

      {activity.category && (
        <div className="mb-3">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium ${categoryColors.label}`}
          >
            {categories.find((c) => c.id === activity.category)?.icon}
            {categories.find((c) => c.id === activity.category)?.label}
          </span>
        </div>
      )}

      {isActive && (
        <div className="h-2 rounded-full overflow-hidden bg-gray-100">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-linear
              bg-gradient-to-r ${categoryColors.progress}`}
            style={{
              width: `${
                (1 - activity.remainingTime / activity.totalTime) * 100
              }%`,
            }}
          />
        </div>
      )}

      <div className="mt-3 text-sm text-gray-600">
        {Math.floor(activity.remainingTime / 60)}:
        {String(activity.remainingTime % 60).padStart(2, "0")}
      </div>
    </div>
  );
}

export default ActivityCard;
