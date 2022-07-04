import React from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { styled } from "stitches.config";
import { useAuth } from "utils/hooks/use-auth";
import useDisclousure from "utils/hooks/use-disclousure";

const ProfileDropdownContainer = styled("div", {
  height: "78px",
  display: "flex",
  alignItems: "start",
  borderTop: "1px solid $gray200",
  position: "absolute",
  bottom: 0,
  width: "100%",
  transition: "0.2s",
  flexDirection: "column",
  overflow: "hidden",
  color: "$text500",
  whiteSpace: "nowrap",

  variants: {
    open: {
      true: {
        height: "120px",
      },
      false: {
        height: "78px",
      },
    },
  },
});

const ProfileName = styled("span", {
  color: "$text500",
  transition: "0.2s",
  fontSize: "$md",
});

const ProfileContainer = styled("div", {
  height: "78px",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  width: "100%",
  transition: "0.2s",
  variants: {
    active: {
      true: {
        background: "$main950",
        ["& " + ProfileName]: {
          color: "White",
        },
      },
      false: {
        background: "white",
      },
    },
  },
});

const ProfileInfo = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: "16px 12px",
  gap: 4,
});

const ProfileItem = styled("div", {
  display: "flex",
  padding: "16px 12px",
  width: "100%",
  gap: 8,
  alignItems: "center",
  cursor: "default",
  whiteSpace: "nowrap",
  flexShrink: 0,
  fontSize: "$sm",
  fontWeight: 500,

  "&:hover": {
    background: "$gray200",
  },

  svg: {
    fontSize: 18,
  },
});

const ProfileRole = styled("div", {
  fontSize: "12.8px",
  color: "$text400",
});

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

const ProfileDropdown = ({ isOpen, onToggle }: Props) => {
  const { user, logout } = useAuth();

  return (
    <ProfileDropdownContainer open={isOpen}>
      <ProfileContainer onClick={onToggle} active={isOpen}>
        <ProfileInfo>
          {user !== null && <ProfileName>{user.name}</ProfileName>}
          <ProfileRole>admin</ProfileRole>
        </ProfileInfo>
      </ProfileContainer>

      <ProfileItem onClick={logout} css={{ color: "$red500" }}>
        <BiLogOutCircle />
        <span>Cerrar Sesion</span>
      </ProfileItem>
    </ProfileDropdownContainer>
  );
};

export default ProfileDropdown;
