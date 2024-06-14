import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Timer from "./Timer";

const Cards = ({
  obj,
  id,
  onDoubleClick,
  handleTimeData,
  removeDeadActivities,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const { title, flag } = obj;

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  let timeArray = obj.time;
  const [hours, minutes, seconds] = timeArray.map((time) => parseInt(time, 10));

  const time = new Date();
  time.setHours(time.getHours() + hours);
  time.setMinutes(time.getMinutes() + minutes);
  time.setSeconds(time.getSeconds() + seconds);

  return (
    <div
      onDoubleClick={onDoubleClick}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative w-full h-32 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-105 flex flex-col"
    >
      <div className="flex-1 overflow-hidden">
        <div className="text-xl font-medium text-black overflow-hidden overflow-ellipsis">
          {title}
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <Timer
          title={title}
          activityId={id}
          expiryTimestamp={time}
          flag={flag}
          dataFromTimer={handleTimeData}
          checkForDead={removeDeadActivities}
        />
      </div>
    </div>
  );
};

export default Cards;
