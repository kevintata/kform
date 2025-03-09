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
import Button from "@mui/material/Button";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";

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

  const handleInputChange = (event: SelectChangeEvent) => {
    setInputValue(event.target.value as string);
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
      <div className="flex flex-row items-end justify-center gap-4 pb-4 w-full">
        <Box sx={{ minWidth: 150 }}>
          <FormControl fullWidth>
            <Select
              id={React.useId()}
              disabled={isDisabled}
              label="Age"
              autoWidth
              value={inputValue}
              required={required}
              {...(includeUnaddedValue && {
                ...register(`${registerKey}[${values.length}]` as Path<T>),
              })}
              onChange={handleInputChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>

              {options
                .filter((option) => !values.includes(option.value))
                .map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.text}
                  </MenuItem>
                ))}
            </Select>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
          </FormControl>
        </Box>

        <Button
          variant="contained"
          onClick={() => handleAddValue(inputValue)}
          disabled={isDisabled || inputValue === ""}
        >
          Add
        </Button>
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
