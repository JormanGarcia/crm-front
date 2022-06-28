import useTranslation from "next-translate/useTranslation";
import React, { useId, useState } from "react";
import { BiChevronLeft, BiExit } from "react-icons/bi";
import { useAuth } from "utils/hooks/use-auth";
import useDisclousure from "utils/hooks/use-disclousure";
import { styled } from "../../../stitches.config";
import { NAV_ROUTES } from "../../../utils/nav-routes";
import NavItem from "./nav-item";

const Container = styled("aside", {
  height: "100vh",
  paddingTop: 120,
  borderRight: 1,
  borderRightStyle: "solid",
  borderRightColor: "$gray200",
  position: "relative",
  transition: "0.3s width",
  background: "white",
  zIndex: 10,
  flexShrink: 0,
  variants: {
    open: {
      false: {
        width: 16,
      },
      true: {
        width: 240,
      },
    },
  },
});

const ContainerHidden = styled("div", {
  overflow: "hidden",
  height: "calc(100% - 78px)",
});

const SidebarNav = styled("nav", {
  display: "flex",
  gap: 28,
  flexDirection: "column",
  paddingRight: 16,
  paddingLeft: 16,
  overflowY: "auto",
  height: "100%",
  overflowX: "hidden",
});

const SidebarGroup = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 8,
});

const SidebarToggleButtonContainer = styled("button", {
  borderRadius: "100%",
  border: "1px solid $gray300",
  position: "absolute",
  right: -16,
  top: 120,
  background: "White",
  cursor: "pointer",
  justifyContent: "center",
  alignItems: "center",
  width: 24,
  height: 24,

  "& svg": {
    fontSize: 20,
    padding: -5,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: "auto",
    color: "$gray300",
  },

  "&:hover svg": {
    color: "$text500",
  },

  transition: "0.5s transform",

  variants: {
    open: {
      false: {
        transform: "rotate(178deg)",
      },
    },
  },
});

const ProfileDropdown = styled("div", {
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

const ProfileContainer = styled("div", {
  height: "78px",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  width: "100%",
});

const ProfileInfo = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: 16,
  gap: 4,
});
const ProfileItem = styled("div", {
  display: "flex",
  padding: "12px 16px",
  width: "100%",
  gap: 8,
  alignItems: "center",
  cursor: "default",
  whiteSpace: "nowrap",
  flexShrink: 0,

  "&:hover": {
    background: "$gray200",
  },
});

const ProfileRole = styled("div", {
  fontSize: "$sm",
});

const Sidebar = () => {
  const { t } = useTranslation("common");
  const { isOpen, toggle } = useDisclousure(true);
  const {
    isOpen: isOpenProfile,
    toggle: toggleProfile,
    close: closeProfile,
  } = useDisclousure(false);

  const { user, logout } = useAuth();

  return (
    <Container open={isOpen}>
      <ContainerHidden>
        <SidebarToggleButtonContainer
          open={isOpen}
          onClick={() => {
            closeProfile();
            toggle();
          }}
        >
          <BiChevronLeft />
        </SidebarToggleButtonContainer>
        <SidebarNav>
          {NAV_ROUTES.map((groups) => {
            const key = Math.random();
            return (
              <SidebarGroup key={key}>
                {groups.map((routes) => (
                  <NavItem
                    title={t(routes.name)}
                    children={routes.children}
                    path={routes.path}
                    key={routes.name}
                    icon={routes.icon}
                  />
                ))}
              </SidebarGroup>
            );
          })}
        </SidebarNav>
      </ContainerHidden>
      <ProfileDropdown open={isOpenProfile}>
        <ProfileContainer onClick={toggleProfile}>
          <ProfileInfo>
            {user !== null && <div>{user.name}</div>}
            <ProfileRole>admin</ProfileRole>
          </ProfileInfo>
        </ProfileContainer>

        <ProfileItem onClick={logout}>
          <BiExit />
          <span>Cerrar Sesion</span>
        </ProfileItem>
      </ProfileDropdown>
    </Container>
  );
};

export default Sidebar;
