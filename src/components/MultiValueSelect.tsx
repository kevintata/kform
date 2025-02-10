import React from "react";

import { Select } from "./MultiValueSelect/Select";
import { DraggableOption } from "./MultiValueSelect/DraggableOption";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

export const MultiValueSelect = () => {
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
  const [selectedValue, setSelectedValue] = React.useState<string | null>(null);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };

  const handleAddClick = () => {
    if (selectedValue && !selectedValues.includes(selectedValue)) {
      setSelectedValues((prevValues) => [...prevValues, selectedValue]);
      setSelectedValue(null);
    }
    setSelectedValue(null);
  };

  const handleRemoveClick = (value: string) => {
    setSelectedValues((prevValues) =>
      prevValues.filter((val) => val !== value)
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    console.log(active.id, over?.id);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-5 p-5 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-lg">
        <Select
          selectedValues={selectedValues}
          selectedValue={selectedValue}
          handleSelectChange={handleSelectChange}
          handleAddClick={handleAddClick}
        />

        {selectedValues.length > 0 && (
          <div
            className="flex flex-row gap-2"
            style={{
              maxWidth: "14em",
            }}
          >
            {selectedValues.map((value) => (
              <DraggableOption
                value={value}
                handleRemoveClick={handleRemoveClick}
              />
            ))}
          </div>
        )}
      </div>
    </DndContext>
  );
};
