import React, { useEffect, useState } from "react";
import { DndContext, closestCorners } from "@dnd-kit/core";
import Input from "./components/Input";
import Cards from "./components/Cards";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const App = () => {
  const [activities, setActivities] = useState(() => {
    const storedActivities = localStorage.getItem("activities");
    return storedActivities ? JSON.parse(storedActivities) : [];
  });

  const [ongoingActivities, setOnGoingActivities] = useState(() => {
    const storedOngoingActivities = localStorage.getItem("ongoingActivities");
    return storedOngoingActivities ? JSON.parse(storedOngoingActivities) : [];
  });

  // Update local storage whenever activities or ongoingActivities change
  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem(
      "ongoingActivities",
      JSON.stringify(ongoingActivities)
    );
  }, [ongoingActivities]);

  //? Placeholders
  // const [activities, setActivities] = useState([
  //   { id: 1, title: "Activity 1", time: [20, 30, 30], flag: false },
  //   { id: 2, title: "Activity 2", time: [20, 30, 30], flag: false },
  //   { id: 3, title: "Activity 3", time: [20, 30, 30], flag: false },
  // ]);

  // const [ongoingActivities, setOnGoingActivities] = useState([
  //   { id: 4, title: "Activity test", time: [10, 20, 20], flag: true },
  // ]);

  const [timeData, setTimeData] = useState([]);
  const handleTimeData = (data) => {
    setTimeData((prevData) => {
      const newData = [...prevData];
      const index = newData.findIndex((item) => item.id === data.id);
      if (index !== -1) {
        newData[index] = data;
      } else {
        newData.push(data);
      }
      return newData;
    });
  };
  // console.log(timeData);

  const addActivity = (title, time) => {
    setActivities((activities) => [
      ...activities,
      { id: activities.length + 1, title, time, flag: false },
    ]);
  };
  const clearAllActivities = () => {
    setActivities([]);
    setOnGoingActivities([]);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeList = activities.some((activity) => activity.id === active.id)
      ? activities
      : ongoingActivities;
    const setActiveList = activities.some(
      (activity) => activity.id === active.id
    )
      ? setActivities
      : setOnGoingActivities;

    const overList = activities.some((activity) => activity.id === over.id)
      ? activities
      : ongoingActivities;
    const setOverList = activities.some((activity) => activity.id === over.id)
      ? setActivities
      : setOnGoingActivities;

    const oldIndex = activeList.findIndex(
      (activity) => activity.id === active.id
    );
    const newIndex = overList.findIndex((activity) => activity.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    setActiveList((prevActivities) => {
      const updatedActivities = [...prevActivities];
      const [movedItem] = updatedActivities.splice(oldIndex, 1);
      updatedActivities.splice(newIndex, 0, movedItem);
      return updatedActivities;
    });
  };

  const doubleClickHandler = (id, status) => {
    if (status === "paused_activity") {
      setTimeData(() => {
        return timeData.filter((data) => data.id !== id);
      });
      const activity = ongoingActivities.find((act) => act.id === id);
      if (activity) {
        const timeObj = timeData.find((data) => data.id === id);
        const updatedActivity = {
          ...activity,
          time: timeObj.time,
          flag: false,
        };
        console.log(timeObj);
        console.log(updatedActivity);
        setOnGoingActivities((prev) => prev.filter((act) => act.id !== id));
        setActivities((prev) => [...prev, updatedActivity]);
      }
    } else if (status === "ongoing_activity") {
      const activity = activities.find((act) => act.id === id);
      if (activity) {
        setActivities((prev) => prev.filter((act) => act.id !== id));
        setOnGoingActivities((prev) => [...prev, { ...activity, flag: true }]);
      }
    }
  };

  const removeDeadActivities = (idToRemove) => {
    console.log(idToRemove);
    setOnGoingActivities((prevActivities) =>
      prevActivities.filter((activity) => activity.id !== idToRemove)
    );
  };
  return (
    <div className="flex h-screen">
      {/* Left Partition - Form */}
      <div className="w-1/4 p-4 ml-2">
        <Input onSubmit={addActivity} clearAll={clearAllActivities} />
      </div>

      {/* Center Partition - Cards */}
      <div className="w-1/3 p-4 grid grid-cols-1 gap-4 justify-items-center content-start overflow-y-auto overflow-x-hidden">
        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={activities}
            strategy={verticalListSortingStrategy}
          >
            {activities.map((activity) => (
              <Cards
                key={activity.id}
                obj={activity}
                id={activity.id}
                onDoubleClick={() =>
                  doubleClickHandler(activity.id, "ongoing_activity")
                }
                handleTimeData={handleTimeData}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>

      {/* Right Partition - Stage Area */}
      <div
        className={`w-1/3 p-4 bg-[#ffe6fd] ml-4 content-start overflow-y-auto overflow-x-hidden ${
          ongoingActivities.length === 0
            ? "flex items-center justify-center"
            : "grid grid-cols-1 gap-4 justify-items-center"
        }`}
      >
        {/* Double click activities to shift them to ongoing activity (right partition) and vice versa */}
        {ongoingActivities.length === 0 ? (
          <p className="text-gray-500 text-center">
            Double click on activities to add
          </p>
        ) : (
          <DndContext
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={ongoingActivities}
              strategy={verticalListSortingStrategy}
            >
              {ongoingActivities.map((activity) => (
                <Cards
                  key={activity.id}
                  obj={activity}
                  id={activity.id}
                  onDoubleClick={() =>
                    doubleClickHandler(activity.id, "paused_activity")
                  }
                  handleTimeData={handleTimeData}
                  removeDeadActivities={removeDeadActivities}
                />
              ))}
            </SortableContext>
          </DndContext>
        )}
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </div>
  );
};

export default App;
