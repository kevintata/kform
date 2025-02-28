import React from "react";
import {
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import * as S from "./styles";
import { FormFieldsConfig } from "../types/FormFields";
import { MultiValueSelect } from "../../MultiValueSelect";

type InputGroupProps<T extends FieldValues> = {
  register: UseFormRegister<T>; // register function from react-hook-form
  setValue: UseFormSetValue<T>; // setValue function from react-hook-form
  watch: UseFormWatch<T>; // watch function from react-hook-form
  formFields: FormFieldsConfig<T>; // array of objects
};

export const InputGroup = <T extends FieldValues>({
  register,
  setValue,
  watch,
  formFields,
}: InputGroupProps<T>) => {
  const [multiSelectValues, setMultiSelectValues] = React.useState<{
    [key: string]: string[];
  }>({});

  const handleMultiChange = (
    key: string,
    values: string[],
    setVal: React.Dispatch<React.SetStateAction<{ [key: string]: string[] }>>
  ) => {
    setVal((prevValues) => ({
      ...prevValues,
      [key]: values,
    }));
  };

  return (
    <S.InputGroupContainer>
      {formFields.fields.map((field) => (
        <>
          {field.type === "text" && (
            <div key={field.label}>
              <label htmlFor={field.registerKey}>{field.label}</label>
              <input
                type="text"
                {...register(field.registerKey, {
                  required: field.required,
                })}
                placeholder={field.placeholder}
                required={field.required}
                disabled={field.disabled}
              />
            </div>
          )}
          {field.type === "number" && (
            <div key={field.label}>
              <label htmlFor={field.registerKey}>{field.label}</label>
              <input
                type="number"
                {...register(field.registerKey, {
                  required: field.required,
                })}
                placeholder={field.placeholder}
                required={field.required}
                disabled={field.disabled}
              />
            </div>
          )}
          {field.type === "switch" && (
            <div key={field.label}>
              <label htmlFor={field.registerKey}>{field.label}</label>
              <input
                type="checkbox"
                {...register(field.registerKey)}
                disabled={field.disabled}
              />
            </div>
          )}
          {field.type === "select" && (
            <div key={field.label}>
              <label htmlFor={field.registerKey}>{field.label}</label>
              <select
                {...register(field.registerKey, {
                  required: field.required,
                })}
                required={field.required}
                disabled={field.disabled}
              >
                {field.selectOptions?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
          )}
          {field.type === "multiSelect" && (
            <MultiValueSelect<T>
              id={field.registerKey}
              registerKey={field.registerKey}
              options={
                formFields.fields.find(
                  (f) => f.registerKey === field.registerKey
                )?.selectOptions || []

                // ? field.selectOptions || [] might be the same as above
              }
              values={
                ((watch(field.registerKey) as string[]) ||
                  multiSelectValues[field.registerKey as string]) ??
                []
              }
              onChange={(values: string[]) =>
                handleMultiChange(
                  field.registerKey,
                  values,
                  setMultiSelectValues
                )
              }
              key={field.registerKey} // get rid of this prop
              label={field.label}
              required={field.required}
              setValue={setValue}
              register={register}
              isSortable={field.isMultiSelectSortable}
            />
          )}
        </>
      ))}
    </S.InputGroupContainer>
  );
};
