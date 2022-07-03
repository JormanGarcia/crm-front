import React, { ReactNode } from "react";
import { StitchesComponent } from "types/commons";
import { styled } from "../../stitches.config";
import LoadingSpinner from "./loading-spinner";

const StyledButton = styled("button", {
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
  position: "relative",
  overflow: "hidden",

  [`& ${LoadingSpinner}`]: {
    borderColor: "white",
    borderRightColor: "transparent",
    height: 12,
    width: 12,
    borderWidth: 2,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: "auto",
  },

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

const LoadingContainer = styled("div", {
  background: "$main500",
  width: "100%",
  height: "100%",
  position: "absolute",
  left: 0,
});

interface Props extends StitchesComponent {
  children: ReactNode;
  loading?: boolean;
  leftIcon?: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

const Button = (props: Props) => {
  const { children, loading, leftIcon, variant = "primary", ...rest } = props;

  return (
    <StyledButton {...rest} withIcon={!!leftIcon} variant={variant}>
      {leftIcon && leftIcon}

      {loading && (
        <LoadingContainer>
          <LoadingSpinner />
        </LoadingContainer>
      )}
      {children}
    </StyledButton>
  );
};

export default Button;
