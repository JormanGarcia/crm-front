import {
  Select as MantineSelect,
  SelectProps,
  MultiSelect,
  MultiSelectProps,
} from "@mantine/core";
import React from "react";
import { styled, theme } from "stitches.config";

const Select = (props: MultiSelectProps) => {
  return (
    <MultiSelect
      {...props}
      styles={{
        root: {
          fontFamily: theme.fonts.sans.value,
        },
        defaultVariant: {
          borderColor: theme.colors.gray400.value,
          transition: ".1s outline",

          ":focus-within": {
            borderColor: theme.colors.main500.value,
            outline: "3px solid " + "#BCBBFF",
          },
        },

        input: {
          color: theme.colors.text500.value,
          fontFamily: theme.fonts.sans.value,
        },

        item: {
          fontFamily: theme.fonts.sans.value,
          color: theme.colors.text400.value,
        },

        hovered: {
          background: "transparent",
          color: theme.colors.text500.value,
        },
      }}
    />
  );
};

export default Select;
