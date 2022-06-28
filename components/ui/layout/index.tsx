import { useRouter } from "next/router";
import React, { FC, ReactNode, useEffect } from "react";
import { useAuth } from "utils/hooks/use-auth";
import { ROUTES } from "utils/routes";
import { styled } from "../../../stitches.config";
import Sidebar from "./sidebar";

const LayoutContainer = styled("div", {
  display: "flex",
  width: "100vw",
  height: "100vh",
});

const Main = styled("main", {
  overflow: "hidden",
  flexGrow: 0,
  width: "100%",
});

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.push(ROUTES.LOGIN);
    }
  }, [isAuth]);

  return (
    <LayoutContainer>
      <Sidebar />
      <Main>{children}</Main>
    </LayoutContainer>
  );
};

export default Layout;
