import { IconType } from "@react-icons/all-files";
import React, {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useId,
  useState,
} from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { styled } from "stitches.config";
import { StitchesComponent } from "types/commons";
import { ErrorField } from "./error-field";
import { Fieldset } from "./fieldset";
import InputContainer from "./input-container";
import InputIcon from "./input-icon";
import { Label } from "./label";
import Typography from "./typography";

const StyledInput = styled("input", {
  padding: "8px 12px",
  fontSize: "$sm",
  color: "$text500",
  border: "none",
  width: "100%",

  "&:focus-visible": {
    border: "none",
    outline: "none",
  },
});

interface Props
  extends StitchesComponent,
    InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  rightIcon?: IconType;
  hasError?: boolean;
  error?: string;
  hideControlPasswordIcon?: boolean;
}

export const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    css,
    label,
    rightIcon,
    required,
    error,
    hasError,
    autoComplete = "off",
    type,
    hideControlPasswordIcon = false,
    ...rest
  } = props;
  const id = useId();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Fieldset>
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      <InputContainer css={css} error={hasError}>
        <StyledInput
          {...rest}
          ref={ref}
          id={id}
          required={required}
          autoComplete={autoComplete}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
        />
        {rightIcon && <InputIcon as={rightIcon} />}
        {!hideControlPasswordIcon && type === "password" && (
          <InputIcon
            as={!showPassword ? BiShow : BiHide}
            onClick={() => setShowPassword(!showPassword)}
            css={{ "&:hover": { color: "$text500" }, marginRight: 8 }}
          />
        )}
      </InputContainer>
      {hasError && error && <ErrorField as={"span"}>{error}</ErrorField>}
    </Fieldset>
  );
});

export default Input;
