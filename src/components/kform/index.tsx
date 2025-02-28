import { InputGroup } from "./InputGroup";
import { useForm } from "react-hook-form";
import { KFormTestType } from "./types/KFormTestType";
import { FormFieldsConfig } from "./types/FormFields";

export const KForm = () => {
  const { register, setValue, watch } = useForm<KFormTestType>();
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
        selectOptions: [
          { text: "Option 1", value: "option1" },
          { text: "Option 2", value: "option2" },
          { text: "Option 3", value: "option3" },
        ],
        isMultiSelectSortable: true,
      },
    ],
  };
  return (
    <div>
      <InputGroup
        register={register}
        setValue={setValue}
        watch={watch}
        formFields={MULTI_SELECT}
      />
    </div>
  );
};
