import React from "react";

const StatusBadge = ({ status }) => {
  let bgClass = "";
  let dotClass = "";

  switch (status) {
    case "pending":
      bgClass = "bg-[#FF8F001A] text-[#FF8F00]";
      dotClass = "bg-[#FF8F00]";
      break;
    case "paid":
      bgClass = "bg-[#33D69F1A] text-[#33D69F]";
      dotClass = "bg-[#33D69F]";
      break;
    case "draft":
      bgClass = "bg-[#DFE3FA] text-[#373B53]";
      dotClass = "bg-[#373B53]";
      break;
    default:
      bgClass = "bg-gray-200 text-gray-600"; // Default fallback
      dotClass = "bg-gray-600";
  }

  return (
    <div
      className={`px-6 py-2 rounded-md capitalize flex items-center gap-2 ${bgClass}`}
    >
      <span className={`w-2 h-2 rounded-full ${dotClass}`}></span>
      {status}
    </div>
  );
};

export default StatusBadge;
