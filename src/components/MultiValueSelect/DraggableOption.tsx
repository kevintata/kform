import { useDraggable } from "@dnd-kit/core";
import React from "react";

type DraggableOptionProps = {
  value: string;
  handleRemoveClick: (value: string) => void;
};

export const DraggableOption: React.FC<DraggableOptionProps> = ({
  value,
  handleRemoveClick,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: value,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div
      style={{ ...style, display: "flex", gap: "0.5rem", alignItems: "center" }}
    >
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        key={value}
        className="flex items-center justify-between bg-gray-100 dark:bg-gray-500 text-gray-900 dark:text-white text-sm rounded-lg py-3.5 px-2 w-fit gap-3 pr-10"
      >
        <span>{value}</span>
      </div>
      <button
        onClick={() => handleRemoveClick(value)}
        style={{ marginLeft: "-35px" }}
        className=" text-white px-0 py-0 rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-500 hover:cursor-pointer transition-colors duration-300 ease-in-out  dark:hover:bg-red-500 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};
