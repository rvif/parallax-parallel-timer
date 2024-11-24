import React from "react";
import ActivityCard from "./ActivityCard";

function ActivityList({
  activities,
  onDoubleClick,
  isActive,
  onTimeUpdate,
  onComplete,
}) {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          onDoubleClick={onDoubleClick}
          isActive={isActive}
          onTimeUpdate={onTimeUpdate}
          onComplete={onComplete}
        />
      ))}
    </div>
  );
}

export default ActivityList;
