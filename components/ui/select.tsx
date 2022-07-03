import React, { forwardRef, useId } from "react";
import { styled, theme } from "stitches.config";
import SelectComponent, { Props as SelectProps } from "react-select";
import { Fieldset } from "./fieldset";
import { Label } from "./label";
import { ErrorField } from "./error-field";

interface Props extends Omit<SelectProps, "styles"> {
  hasError?: boolean;
  error?: string;
  required?: boolean;
  label?: string;
}

const Select = forwardRef<any, Props>((props, ref) => {
  const { hasError, error, label, required, ...rest } = props;

  const id = useId();

  return (
    <Fieldset>
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      <SelectComponent
        {...rest}
        id={id}
        isSearchable={false}
        isClearable={props.isClearable ? props.isClearable : false}
        styles={{
          control: (p, state) => ({
            border:
              props.hasError && !state.isFocused
                ? `1px solid ${theme.colors.red500.value}`
                : state.isFocused
                ? `1px solid ${theme.colors.main500.value}`
                : `1px solid ${theme.colors.gray400.value}`,
            display: "flex",
            borderRadius: 4,
            alignItems: "center",
            maxHeight: 35,
            minWidth: 120,
            background: "white",
            outline: `2px solid ${state.isFocused && "#BCBBFF"}`,
            transition: ".05s outline",
          }),

          singleValue: () => ({
            fontSize: theme.fontSizes.sm.value,
            cursor: "default",
          }),

          placeholder: () => ({
            fontSize: theme.fontSizes.sm.value,
            color: theme.colors.gray400.value,
          }),

          valueContainer: () => ({
            display: "flex",
            width: "100%",
            paddingLeft: "12px",
            alignItems: "center",
            gap: 8,
          }),

          dropdownIndicator: () => ({
            color: theme.colors.gray300.value,
            display: "flex",
            padding: "8px 8px 8px 8px",
          }),

          indicatorSeparator: () => ({}),

          option: (provided, state) => ({
            color: state.isSelected ? "white" : theme.colors.text400.value,
            background: state.isSelected
              ? theme.colors.main500.value
              : "transparent",
            padding: "8px 12px",
            cursor: "default",

            ":hover": {
              color: state.isSelected ? "white" : theme.colors.text500.value,
              background: state.isSelected
                ? theme.colors.main500.value
                : theme.colors.gray200.value,
            },
          }),

          menu: (provided) => ({
            ...provided,
            border: "1px solid " + theme.colors.gray400,
            marginTop: 12,
            borderRadius: 4,
            boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
          }),

          menuList: (provided) => ({
            ...provided,
            paddding: 0,
          }),

          multiValue: () => ({
            display: "flex",
            background: theme.colors.gray200.value,
            borderRadius: 2,
            padding: "0px 4px",
            alignItems: "center",
            gap: 8,
            cursor: "default",
          }),

          multiValueRemove: () => ({
            color: theme.colors.text400.value,
            display: "flex",
            padding: "1px 1px",
            borderRadius: 2,

            ":hover": {
              background: theme.colors.red500.value,
              color: "white",
            },
          }),
        }}
      />
      {hasError && error && <ErrorField as={"span"}>{error}</ErrorField>}
    </Fieldset>
  );
});

export default Select;
