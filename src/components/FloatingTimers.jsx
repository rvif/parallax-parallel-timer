import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getCategoryColor } from "../utils/categoryUtils";
import { timerService } from "../utils/timerService";

function FloatingTimers({ activeActivities, onTimeUpdate, onComplete }) {
  const location = useLocation();

  useEffect(() => {
    activeActivities.forEach((activity) => {
      if (activity.remainingTime > 0) {
        timerService.startTimer(activity, onTimeUpdate, onComplete, true);
      }
    });

    return () => {
      activeActivities.forEach((activity) => {
        timerService.stopTimer(activity.id);
      });
    };
  }, [activeActivities, onTimeUpdate, onComplete]);

  if (location.pathname === "/" || !activeActivities?.length) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col-reverse gap-2 max-h-[70vh] overflow-y-auto animate-fade-in">
      {activeActivities.map((activity) => {
        const categoryColors = getCategoryColor(activity.category);
        const progressPercentage =
          (activity.remainingTime / activity.totalTime) * 100;

        return (
          <div
            key={activity.id}
            className="w-[280px] p-3 rounded-[20px] bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium truncate max-w-[180px] text-gray-700">
                {activity.title}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors.label}`}
              >
                {Math.floor(activity.remainingTime / 60)}:
                {String(activity.remainingTime % 60).padStart(2, "0")}
              </span>
            </div>

            <div className="h-2 rounded-full overflow-hidden bg-gray-100">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-linear
                  bg-gradient-to-r ${categoryColors.progress}`}
                style={{
                  width: `${progressPercentage}%`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FloatingTimers;
