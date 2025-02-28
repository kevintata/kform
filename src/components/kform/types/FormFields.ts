import { Path } from "react-hook-form";

import { FormInputTypes } from "./FormInputTypes";

export type FormFieldsConfig<T> = {
  title: string;
  fields: {
    label: string;
    registerKey: Path<T>;
    type: FormInputTypes;
    placeholder?: string;
    error?: boolean;
    errorMessage?: string;
    required?: boolean;
    selectOptions?: {
      text: string;
      value: string;
    }[];
    isMultiSelectSortable?: boolean;
    disabled?: boolean;
  }[];
};
