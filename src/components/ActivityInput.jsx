import React, { useState, useMemo } from "react";
import ConfirmDialog from "./ConfirmDialog";
import { categories } from "../utils/categoryUtils";

const timePresets = [
  { label: "15m", seconds: 900 },
  { label: "30m", seconds: 1800 },
  { label: "1h", seconds: 3600 },
  { label: "2h", seconds: 7200 },
];

function ActivityInput({ onAdd, onClearAll }) {
  const [title, setTitle] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [category, setCategory] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isValid = useMemo(() => {
    return title.trim() !== "" && (hours > 0 || minutes > 0 || seconds > 0);
  }, [title, hours, minutes, seconds]);

  const handlePresetClick = (presetSeconds) => {
    const h = Math.floor(presetSeconds / 3600);
    const m = Math.floor((presetSeconds % 3600) / 60);
    const s = presetSeconds % 60;
    setHours(h);
    setMinutes(m);
    setSeconds(s);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    onAdd(title.trim(), totalSeconds, category);
    setTitle("");
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setCategory("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Activity Title"
          className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />

        {/* Quick Presets */}
        <div className="flex flex-wrap gap-2">
          {timePresets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => handlePresetClick(preset.seconds)}
              className="px-4 py-2 text-sm rounded-lg bg-white border border-gray-200 
                hover:bg-gray-50 text-gray-700 transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Categories with icons */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Category</label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2
                  ${
                    category === cat.id
                      ? `bg-${cat.color}-100 text-${cat.color}-600 border border-${cat.color}-200`
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {/* Hours */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Hours</span>
              <span className="text-blue-600 font-medium">{hours}</span>
            </div>
            <input
              type="range"
              min="0"
              max="23"
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Minutes */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Minutes</span>
              <span className="text-blue-600 font-medium">{minutes}</span>
            </div>
            <input
              type="range"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => setMinutes(parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Seconds */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Seconds</span>
              <span className="text-blue-600 font-medium">{seconds}</span>
            </div>
            <input
              type="range"
              min="0"
              max="59"
              value={seconds}
              onChange={(e) => setSeconds(parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 text-center">
          <span className="text-gray-600">Total Time: </span>
          <span className="font-mono font-medium text-blue-600">
            {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </span>
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full p-3 rounded-lg font-medium transition-all
            ${
              isValid
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
        >
          Add Activity
        </button>

        <button
          type="button"
          onClick={() => setIsDialogOpen(true)}
          className="w-full p-3 rounded-lg font-medium text-red-500 bg-red-50 hover:bg-red-100 transition-all"
        >
          Clear All Activities
        </button>
      </form>

      <ConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={() => {
          onClearAll();
          setIsDialogOpen(false);
        }}
        title="Clear All Activities"
        message="Are you sure you want to clear all activities from Parallax? This action cannot be undone."
      />
    </>
  );
}

export default ActivityInput;
