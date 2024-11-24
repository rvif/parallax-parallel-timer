import React from "react";
import { Link } from "react-router-dom";

function FeatureCard({ title, items, icon }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:border-blue-100 transition-colors">
      <div className="flex items-center gap-3 mb-6">
        {icon}
        <h2 className="text-xl font-semibold text-[#2c3e50]">{title}</h2>
      </div>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-gray-600 leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeaturesPage() {
  const features = [
    {
      title: "Activity Management",
      icon: (
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
      ),
      items: [
        "Create activities with custom titles",
        "Set precise durations (hours, minutes, seconds)",
        "Quick time presets (15m, 30m, 1h, 2h)",
        "Categorize activities (Work, Study, Exercise, etc.)",
        "Run multiple activities in parallel",
        "Clear all activities with confirmation",
      ],
    },
    {
      title: "Activity Categories",
      icon: (
        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
            />
          </svg>
        </div>
      ),
      items: [
        "Work - for professional tasks",
        "Study - for learning activities",
        "Exercise - for fitness activities",
        "Personal - for personal tasks",
        "Meeting - for appointments and calls",
        "Break - for rest periods",
        "Visual category indicators with icons",
        "Color-coded categories for easy recognition",
      ],
    },
    {
      title: "Timer Features",
      icon: (
        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-purple-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      ),
      items: [
        "Real-time countdown display",
        "Progress bar visualization",
        "Double-click to start/pause activities",
        "Automatic completion handling",
        "Sound notification on completion",
        "Volume control for notifications",
        "Toast notifications for completed activities",
      ],
    },
    {
      title: "History Tracking",
      icon: (
        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-indigo-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0zM3 3l18 18"
            />
          </svg>
        </div>
      ),
      items: [
        "Chronological activity history",
        "Timeline visualization",
        "Completion timestamps",
        "Duration records",
        "Category tracking in history",
        "Session-based history (clears on refresh)",
        "Visual timeline with gradient accents",
      ],
    },
    {
      title: "User Interface",
      icon: (
        <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
            />
          </svg>
        </div>
      ),
      items: [
        "Clean, minimal design",
        "Responsive grid layout",
        "Interactive hover states",
        "Loading states and animations",
        "Confirmation dialogs for important actions",
        "Toast notifications for user feedback",
        "Gradient accents and visual hierarchy",
        "Consistent color scheme and typography",
      ],
    },
    {
      title: "Technical Features",
      icon: (
        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
          <svg
            className="w-5 h-5 text-orange-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        </div>
      ),
      items: [
        "React-based SPA architecture",
        "React Router for navigation",
        "State management for activities",
        "Real-time updates and rendering",
        "Audio handling for notifications",
        "Time formatting utilities",
        "Category management system",
        "Responsive design principles",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9ff] font-['Poppins']">
      <div className="container mx-auto p-6">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h1 className="text-3xl font-semibold text-[#2c3e50] mb-4">
            Parallax Features
          </h1>
          <p className="text-gray-600">
            Discover how Parallax helps you manage multiple activities with ease
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              items={feature.items}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturesPage;
