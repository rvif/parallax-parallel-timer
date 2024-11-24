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
  const category = categories.find((c) => c.id === categoryId);
  switch (category?.id) {
    case "work":
      return {
        label: "bg-blue-50 text-blue-600 border-blue-100",
        progress: "from-blue-400 to-blue-600",
      };
    case "study":
      return {
        label: "bg-green-50 text-green-600 border-green-100",
        progress: "from-green-400 to-green-600",
      };
    case "exercise":
      return {
        label: "bg-orange-50 text-orange-600 border-orange-100",
        progress: "from-orange-400 to-orange-600",
      };
    case "personal":
      return {
        label: "bg-purple-50 text-purple-600 border-purple-100",
        progress: "from-purple-400 to-purple-600",
      };
    case "meeting":
      return {
        label: "bg-indigo-50 text-indigo-600 border-indigo-100",
        progress: "from-indigo-400 to-indigo-600",
      };
    case "break":
      return {
        label: "bg-pink-50 text-pink-600 border-pink-100",
        progress: "from-pink-400 to-pink-600",
      };
    default:
      return {
        label: "bg-gray-50 text-gray-600 border-gray-100",
        progress: "from-gray-400 to-gray-600",
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
