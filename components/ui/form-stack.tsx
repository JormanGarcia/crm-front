import { styled } from "stitches.config";

export const FormStack = styled("div", {
  display: "flex",
  variants: {
    direction: {
      horizontal: {
        flexDirection: "row",
        gap: 12,
      },
      vertical: {
        flexDirection: "column",
        gap: 20,
      },
    },
  },

  defaultVariants: {
    direction: "horizontal",
  },
});
