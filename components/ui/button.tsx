import React from "react";
import { styled } from "../../stitches.config";

const Button = styled("button", {
  border: "none",
  fontWeight: 500,
  fontSize: "14px",
  padding: "8px 12px",
  borderRadius: 4,
  fontFamily: "'DM Sans', sans-serif",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 6,

  "& svg": {
    fontSize: 16,
  },

  "&:hover": {
    background: "$main600",
  },

  variants: {
    withIcon: {
      true: {
        padding: "8px 10px 8px 8px",
      },
      false: {
        padding: "8px 12px",
      },
    },

    variant: {
      secondary: {
        color: "$text500",
        background: "$gray200",

        "&:hover": {
          background: "$gray300",
        },
      },
      primary: {
        background: "$main500",
        color: "white",

        "&:hover": {
          background: "$main600",
        },
      },
    },
  },

  defaultVariants: {
    withIcon: false,
    variant: "primary",
  },
});
export default Button;
