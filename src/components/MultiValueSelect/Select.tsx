import React from "react";

type SelectProps = {
  selectedValues: string[] | null;
  selectedValue: string | null;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleAddClick: () => void;
};

export const Select: React.FC<SelectProps> = ({
  selectedValues,
  selectedValue,
  handleSelectChange,
  handleAddClick,
}) => {
  return (
    <div className="flex flex-row items-end justify-between gap-2.5">
      <div>
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select an option
        </label>
        <select
          id="countries"
          disabled={selectedValues?.length === 3}
          defaultValue=""
          onChange={handleSelectChange}
          value={selectedValue || ""}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:opacity-75 disabled:cursor-not-allowed disabled:bg-gray-500"
        >
          <option value="" disabled>
            Select a country
          </option>
          <option value="US" hidden={selectedValues?.includes("US")}>
            United States
          </option>
          <option value="CA" hidden={selectedValues?.includes("CA")}>
            Canada
          </option>
          <option value="BR" hidden={selectedValues?.includes("BR")}>
            Brasil
          </option>
        </select>
      </div>

      <button
        type="button"
        disabled={!selectedValue}
        aria-disabled={!selectedValue}
        onClick={handleAddClick}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 hover:cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed disabled:bg-gray-500"
      >
        Add
      </button>
    </div>
  );
};
