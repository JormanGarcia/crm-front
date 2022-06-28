import React from "react";
import { styled, theme } from "stitches.config";
import SelectComponent, { Props } from "react-select";

const Select = (props: Omit<Props, "styles">) => {
  return (
    <SelectComponent
      {...props}
      isSearchable={false}
      isClearable={props.isClearable ? props.isClearable : false}
      styles={{
        control: () => ({
          border: "1px solid " + theme.colors.gray400.value,
          display: "flex",
          borderRadius: 4,
          alignItems: "center",
          maxHeight: 35,
          minWidth: 120,
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
          },
        }),

        menu: (provided) => ({
          ...provided,
          border: "1px solid " + theme.colors.gray400,
          marginTop: 12,
          borderRadius: 4,
          boxShadow: "none",
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
  );
};

export default Select;
