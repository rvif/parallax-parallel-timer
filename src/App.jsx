import React, { useState, useEffect } from "react";
import ActivityInput from "./components/ActivityInput";
import ActivityList from "./components/ActivityList";
import ActivityHistory from "./pages/HistoryPage";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import FeaturesPage from "./pages/FeaturesPage";
import Footer from "./components/Footer";

function App() {
  // Main activities list
  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem("activities");
    return saved ? JSON.parse(saved) : [];
  });

  // Active/ongoing activities
  const [activeActivities, setActiveActivities] = useState(() => {
    const saved = localStorage.getItem("activeActivities");
    return saved ? JSON.parse(saved) : [];
  });

  // Completed activities
  const [completedActivities, setCompletedActivities] = useState([]);

  // Save to localStorage whenever states change
  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem("activeActivities", JSON.stringify(activeActivities));
  }, [activeActivities]);

  const addActivity = (title, timeInSeconds, category) => {
    const newActivity = {
      id: Date.now(),
      title,
      totalTime: timeInSeconds,
      remainingTime: timeInSeconds,
      category,
    };
    setActivities((prev) => [...prev, newActivity]);
  };

  const toggleActivity = (activity) => {
    if (activeActivities.find((a) => a.id === activity.id)) {
      // If activity is active, move it back to inactive list
      const updatedActivity = activeActivities.find(
        (a) => a.id === activity.id
      );
      setActiveActivities((prev) => prev.filter((a) => a.id !== activity.id));
      setActivities((prev) => [...prev, updatedActivity]);
    } else {
      // If activity is inactive, move it to active list
      setActivities((prev) => prev.filter((a) => a.id !== activity.id));
      setActiveActivities((prev) => [...prev, activity]);
    }
  };

  const updateRemainingTime = (id, remainingTime) => {
    setActiveActivities((prev) =>
      prev.map((activity) =>
        activity.id === id ? { ...activity, remainingTime } : activity
      )
    );
  };

  const removeCompletedActivity = (activityId) => {
    const activity = activeActivities.find((a) => a.id === activityId);
    if (activity) {
      setCompletedActivities((prev) => [
        ...prev,
        {
          ...activity,
          completedAt: new Date().toISOString(),
        },
      ]);
      setActiveActivities((prev) => prev.filter((a) => a.id !== activityId));
    }
  };

  const clearAllActivities = () => {
    setActivities([]);
    setActiveActivities([]);
    localStorage.removeItem("activities");
    localStorage.removeItem("activeActivities");
  };

  const [showHistory, setShowHistory] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#f8f9ff] font-['Poppins']">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <div className="container mx-auto p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Input Column - Fixed height */}
                    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 h-fit">
                      <h2 className="text-xl font-medium mb-4 text-[#2c3e50]">
                        Add New Activity
                      </h2>
                      <ActivityInput
                        onAdd={addActivity}
                        onClearAll={clearAllActivities}
                      />
                    </div>

                    {/* Pending Activities Column */}
                    <div className="bg-[#ffe6fd] rounded-xl shadow-sm p-6 border border-pink-100 h-fit">
                      <h2 className="text-xl font-medium mb-4 text-[#2c3e50]">
                        Pending Activities
                      </h2>
                      {activities.length === 0 ? (
                        <div className="flex items-center justify-center h-[300px]">
                          <p className="text-gray-500 text-center text-sm select-none">
                            No pending activities
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <ActivityList
                            activities={activities}
                            onDoubleClick={toggleActivity}
                            isActive={false}
                          />
                        </div>
                      )}
                    </div>

                    {/* Active Activities Column */}
                    <div className="bg-[#e6f7ff] rounded-xl shadow-sm p-6 border border-blue-100 h-fit">
                      <h2 className="text-xl font-medium mb-4 text-[#2c3e50]">
                        Active Activities
                      </h2>
                      {activeActivities.length === 0 ? (
                        <div className="flex items-center justify-center h-[300px]">
                          <p className="text-gray-500 text-center text-sm select-none">
                            Double-click an activity to start
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <ActivityList
                            activities={activeActivities}
                            onDoubleClick={toggleActivity}
                            isActive={true}
                            onTimeUpdate={updateRemainingTime}
                            onComplete={removeCompletedActivity}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              }
            />
            <Route path="/features" element={<FeaturesPage />} />
            <Route
              path="/history"
              element={
                <ActivityHistory completedActivities={completedActivities} />
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
        }}
      />
    </BrowserRouter>
  );
}

export default App;
