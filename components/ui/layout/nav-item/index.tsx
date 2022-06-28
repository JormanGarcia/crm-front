import Link from "next/link";
import React, { useId, useMemo } from "react";
import { RouteGroup } from "../../../../utils/nav-routes";
import { ChevronIcon, Container, ItemIcon, LeftStack, Title } from "./styled";
import { BsChevronDown } from "react-icons/bs";
import { IconType } from "react-icons/lib";
import useDisclousure from "../../../../utils/hooks/use-disclousure";
import useTranslation from "next-translate/useTranslation";
import { BiChevronDown } from "react-icons/bi";
import { useRouter } from "next/router";

interface NavItemProps {
  title: string;
  children?: RouteGroup["children"];
  path?: string;
  icon?: IconType;
  active?: boolean;
  isChildren?: boolean;
}

interface NavRowProps {
  title: string;
  isList?: boolean;
  onClick?: () => void;
  open?: boolean;
  icon?: IconType;
  active?: boolean;
  isChildren?: boolean;
}

const NavRow = (props: NavRowProps) => {
  const {
    title,
    isList = false,
    onClick,
    open,
    icon,
    active = false,
    isChildren = false,
  } = props;

  return (
    <Container onClick={onClick} active={active} isChildren={isChildren}>
      <LeftStack>
        {icon && <ItemIcon as={icon} />}
        <Title>{title}</Title>
      </LeftStack>

      {isList && <ChevronIcon as={BiChevronDown} open={open} />}
    </Container>
  );
};

const NavLink = ({ title, path, icon, isChildren }: NavItemProps) => {
  if (!path) return null;

  const router = useRouter();

  const isItemActive = () => {
    if (router.pathname === "/" && path === "/") return true;

    if (router.pathname.startsWith(path)) {
      if (path === "/") {
        return false;
      } else {
        return true;
      }
    }
  };

  return (
    <Link href={path}>
      <NavRow
        title={title}
        isList={false}
        icon={icon}
        active={isItemActive()}
        isChildren={isChildren}
      />
    </Link>
  );
};

const CollapsableNavItem = (props: NavItemProps) => {
  const { title, children, icon } = props;
  const { isOpen, toggle } = useDisclousure();

  const { t } = useTranslation("common");

  return (
    <div>
      <NavRow
        title={title}
        icon={icon}
        isList={true}
        open={isOpen}
        onClick={toggle}
      />
      <div>
        {isOpen &&
          children &&
          children.map((route) => (
            <NavLink
              title={t(route.name)}
              path={route.path}
              key={route.path}
              isChildren={true}
            />
          ))}
      </div>
    </div>
  );
};

const NavItem = (props: NavItemProps) => {
  const { children } = props;

  return Boolean(children?.length) ? (
    <CollapsableNavItem {...props} />
  ) : (
    <NavLink {...props} />
  );
};

export default NavItem;
