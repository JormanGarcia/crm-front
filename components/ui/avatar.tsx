import React from "react";
import { styled } from "stitches.config";
import { violet, blackA } from "@radix-ui/colors";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

const StyledAvatar = styled(AvatarPrimitive.Root, {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  verticalAlign: "middle",
  overflow: "hidden",
  userSelect: "none",
  width: 40,
  height: 40,
  borderRadius: "100%",
  backgroundColor: blackA.blackA3,
});

const StyledImage = styled(AvatarPrimitive.Image, {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "inherit",
});

const StyledFallback = styled(AvatarPrimitive.Fallback, {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "$main200",
  color: "$main500",
  fontSize: "$sm",
  lineHeight: 1,
  fontWeight: 500,
});

// Exports
export const AvatarRoot = StyledAvatar;
export const AvatarImage = StyledImage;
export const AvatarFallback = StyledFallback;

// Your app...
const Flex = styled("div", { display: "flex" });

const Avatar = ({ initials }: { initials: String }) => (
  <AvatarRoot>
    <AvatarImage alt="Colm Tuite" />
    <AvatarFallback delayMs={600}>{initials}</AvatarFallback>
  </AvatarRoot>
);

export default Avatar;
