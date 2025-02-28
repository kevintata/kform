import { KFormTestType } from "./../types/KFormTestType";
import { FormFieldsConfig } from "./../types/FormFields";

const MULTI_SELECT: FormFieldsConfig<KFormTestType> = {
  title: "Multi Select",

  fields: [
    {
      label: "Multi Select",
      type: "multiSelect",
      registerKey: "names",
      required: true,
      placeholder: "Select multiple options",
      disabled: false,
    },
  ],
};

export const testInputGroups = {
  MULTI_SELECT,
};
