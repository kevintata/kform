import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import React from "react";
import {
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { SortableAddedOption } from "./components/SortableAddedOption";

type MultiValueSelectProps<T extends FieldValues> = {
  id: string;
  values: string[];
  onChange: (values: string[]) => void;
  registerKey: Path<T>;
  register: UseFormRegister<T>;
  setValue: UseFormSetValue<T>;
  options: { text: string; value: string }[];
  label?: string;
  placeholder?: string;
  isDisabled?: boolean;
  isSortable?: boolean;
  includeUnaddedValue?: boolean;
  required?: boolean;
};

export const MultiValueSelect = <T extends FieldValues>({
  id,
  values,
  onChange,
  registerKey,
  register,
  setValue,
  options,
  label,
  placeholder,
  isDisabled,
  isSortable,
  includeUnaddedValue,
  required,
}: MultiValueSelectProps<T>) => {
  const [inputValue, setInputValue] = React.useState<string>("");

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleAddValue = (value: string) => {
    if (values.includes(inputValue.trim())) {
      setInputValue("");
      return;
    }

    if (inputValue.trim() !== "") {
      onChange([...values, inputValue.trim()]);
      setValue(registerKey, [
        ...values,
        inputValue.trim(),
      ] as unknown as PathValue<T, Path<T>>);
      setInputValue("");
    }
  };

  const handleRemoveValue = (index: number) => {
    const newValues = values.filter((_, i) => i !== index);
    setValue(registerKey, newValues as unknown as PathValue<T, Path<T>>);
    onChange(newValues);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = values.findIndex((value) => value === active.id);
      const newIndex = values.findIndex((value) => value === over.id);

      const newValues = [...values];

      newValues.splice(oldIndex, 1);
      newValues.splice(newIndex, 0, active.id.toString());

      setValue(registerKey, newValues as unknown as PathValue<T, Path<T>>);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <button onClick={() => register} style={{ display: "none" }} />
      <div className="flex flex-row items-end justify-center gap-4 pb-4 w-full">
        <select
          id={React.useId()}
          disabled={isDisabled}
          value={inputValue}
          required={required}
          {...(includeUnaddedValue && {
            ...register(`${registerKey}[${values.length}]` as Path<T>),
          })}
          onChange={(e) => handleInputChange(e.currentTarget.value)}
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            {placeholder || "Select an option"}
          </option>
          {options
            .filter((option) => !values.includes(option.value))
            .map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
        </select>
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        <button
          type="button"
          onClick={() => handleAddValue(inputValue)}
          disabled={isDisabled || inputValue === ""}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          Add
        </button>
      </div>

      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext
          items={values}
          strategy={horizontalListSortingStrategy}
          id={id}
        >
          {values.length > 0 && (
            <div className="flex flex-wrap w-full gap-4">
              {values
                .filter((i) => i !== "")
                .map((value, index) => (
                  <SortableAddedOption
                    isDisabled={isDisabled}
                    key={`${value}-${index.toString()}`}
                    value={value}
                    id={value}
                    index={index}
                    handleRemoveValue={handleRemoveValue}
                    isSortable={isSortable}
                  />
                ))}
            </div>
          )}
        </SortableContext>
      </DndContext>
    </div>
  );
};
