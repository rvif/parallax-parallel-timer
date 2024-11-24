import { icons } from "./icons";

export const categories = [
  {
    id: "work",
    label: "Work",
    color: "blue",
    icon: icons.work,
  },
  {
    id: "study",
    label: "Study",
    color: "green",
    icon: icons.study,
  },
  {
    id: "exercise",
    label: "Exercise",
    color: "orange",
    icon: icons.exercise,
  },
  {
    id: "personal",
    label: "Personal",
    color: "purple",
    icon: icons.personal,
  },
  {
    id: "meeting",
    label: "Meeting",
    color: "indigo",
    icon: icons.meeting,
  },
  {
    id: "break",
    label: "Break",
    color: "pink",
    icon: icons.break,
  },
];

export const getCategoryColor = (categoryId) => {
  switch (categoryId) {
    case "work":
      return {
        label: "bg-blue-50 text-blue-600",
        progress: "from-blue-400 to-blue-600",
      };
    case "study":
      return {
        label: "bg-green-50 text-green-600",
        progress: "from-green-400 to-green-600",
      };
    case "exercise":
      return {
        label: "bg-orange-50 text-orange-600",
        progress: "from-orange-400 to-orange-600",
      };
    case "personal":
      return {
        label: "bg-purple-50 text-purple-600",
        progress: "from-purple-400 to-purple-600",
      };
    case "meeting":
      return {
        label: "bg-indigo-50 text-indigo-600",
        progress: "from-indigo-400 to-indigo-600",
      };
    case "break":
      return {
        label: "bg-pink-50 text-pink-600",
        progress: "from-pink-400 to-pink-600",
      };
    default:
      return {
        label: "bg-red-50 text-red-600",
        progress: "from-red-400 to-red-600",
      };
  }
};

export const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s
    .toString()
    .padStart(2, "0")}`;
};
