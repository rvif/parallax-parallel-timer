import React, { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import { toast } from "react-toastify";

function Timer({
  title,
  activityId,
  expiryTimestamp,
  flag,
  dataFromTimer,
  checkForDead,
}) {
  const { seconds, minutes, hours, start, pause } = useTimer({
    expiryTimestamp,
    autoStart: false,
    onExpire: () => {
      checkForDead(activityId);
      toast.success(`Activity ${title}'s duration is complete!`);
    },
  });

  useEffect(() => {
    if (flag) {
      start();
    } else {
      pause();
    }
  }, [flag, start, pause]);

  useEffect(() => {
    if (flag) {
      const interval = setInterval(() => {
        dataFromTimer({ id: activityId, time: [hours, minutes, seconds] });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [flag, hours, minutes, seconds, activityId, dataFromTimer]);

  return (
    <div>
      <div style={{ fontSize: "40px" }}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}

export default Timer;
