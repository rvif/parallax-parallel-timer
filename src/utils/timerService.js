class TimerService {
  constructor() {
    this.timers = new Map();
    this.timeStates = new Map();
  }

  startTimer(activity, onTimeUpdate, onComplete, isFloating = false) {
    if (this.timers.has(activity.id)) return;

    if (!this.timeStates.has(activity.id)) {
      this.timeStates.set(activity.id, {
        remainingTime: activity.remainingTime,
        totalTime: activity.totalTime,
      });
    }

    const timer = setInterval(() => {
      const state = this.timeStates.get(activity.id);
      const newTime = state.remainingTime - 1;

      if (newTime <= 0) {
        this.stopTimer(activity.id);
        this.timeStates.delete(activity.id);

        import("../utils/audioManager").then(({ audioManager }) => {
          audioManager.play();
        });

        import("react-hot-toast").then(({ toast }) => {
          toast.success(`${activity.title} completed!`, {
            icon: "🎉",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        });

        onComplete(activity.id);
      } else {
        this.timeStates.set(activity.id, {
          ...state,
          remainingTime: newTime,
        });

        onTimeUpdate(activity.id, newTime);
      }
    }, 1000);

    this.timers.set(activity.id, timer);
  }

  stopTimer(activityId) {
    if (this.timers.has(activityId)) {
      clearInterval(this.timers.get(activityId));
      this.timers.delete(activityId);
    }
  }

  syncTimerState(activityId, remainingTime) {
    this.timeStates.set(activityId, {
      remainingTime,
      totalTime: this.timeStates.get(activityId)?.totalTime || remainingTime,
    });
  }

  isRunning(activityId) {
    return this.timers.has(activityId);
  }

  cleanup() {
    this.timers.forEach((timer) => clearInterval(timer));
    this.timers.clear();
    this.timeStates.clear();
  }
}

const timerService = new TimerService();
export { timerService };
