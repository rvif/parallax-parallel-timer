import React, { useState } from "react";

const Input = ({ onSubmit, clearAll }) => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(["", "", ""]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(time);
    if (time[0] === "") {
      time[0] = 0;
    }
    if (time[1] === "") {
      time[1] = 0;
    }
    if (time[2] === "") {
      time[2] = 0;
    }

    onSubmit(title, time);

    setTitle("");
    setTime(["", "", ""]);
  };
  const handleReset = (e) => {
    e.preventDefault();
    clearAll();
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="space-y-4 p-6 bg-white rounded-xl shadow-md"
      >
        <div>
          <input
            type="text"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          {/* [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none, this style classes are used to remove arrows from input of type number for all browsers*/}
          <input
            min={0}
            max={23}
            className="inline-block w-16 h-12 m-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            placeholder="Hr"
            id="hours"
            value={time[0]}
            onChange={(e) => {
              let hr = e.target.value;
              setTime([hr, time[1], time[2]]);
            }}
          />

          <input
            min={0}
            max={60}
            className="inline-block w-16 h-12 m-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            value={time[1]}
            placeholder="Min"
            id="minutes"
            onChange={(e) => {
              let min = e.target.value;
              setTime([time[0], min, time[2]]);
            }}
          />

          <input
            min={0}
            max={60}
            className="inline-block w-16 h-12 m-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            placeholder="Sec"
            value={time[2]}
            id="seconds"
            onChange={(e) => {
              let sec = e.target.value;
              setTime([time[0], time[1], sec]);
            }}
          />
        </div>
        <div>
          {time[0] > 23 && (
            <p className="text-red-500 text-sm">Max hours is 23</p>
          )}
          {time[1] > 60 && (
            <p className="text-red-500 text-sm">Max minutes is 60</p>
          )}
          {time[1] > 60 && (
            <p className="text-red-500 text-sm">Max seconds is 60</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-all duration-300"
        >
          Add Task
        </button>
        <button
          type="reset"
          className="w-full bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition-all duration-300"
        >
          Clear all
        </button>
      </form>
    </div>
  );
};

export default Input;
