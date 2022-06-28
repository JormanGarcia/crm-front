import Link from "next/link";
import React from "react";
import { BiChevronLeft } from "react-icons/bi";
import { styled } from "stitches.config";
import PageHeaderTitle from "../page-header-title";

interface Props {
  children: string;
  href: string;
}

const BackTitle = styled(PageHeaderTitle);

const BackButtonContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 4,
  cursor: "pointer",
});

const Icon = styled(BiChevronLeft, {
  fontSize: 26,
});

const BackButton = (props: Props) => {
  const { children, href } = props;
  return (
    <Link href={href}>
      <BackButtonContainer>
        <Icon />
        <BackTitle>{children}</BackTitle>
      </BackButtonContainer>
    </Link>
  );
};

export default BackButton;
