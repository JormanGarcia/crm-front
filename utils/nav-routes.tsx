import { IconType } from "react-icons";
import { ROUTES } from "./routes";
import {
  BiCar,
  BiCollection,
  BiHomeAlt,
  BiReceipt,
  BiShoppingBag,
  BiStore,
  BiUser,
  BiWrench,
} from "react-icons/bi";

export interface RouteGroup {
  path?: string;
  name: string;
  children?: Omit<RouteGroup, "children">[];
  icon?: IconType;
}

const HOME_ROUTES: RouteGroup[] = [
  {
    path: ROUTES.HOME,
    name: "nav-title.home",
    icon: ({ className }) => {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          className={className}
        >
          <path d="M12.71 2.29a1 1 0 0 0-1.42 0l-9 9a1 1 0 0 0 0 1.42A1 1 0 0 0 3 13h1v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7h1a1 1 0 0 0 1-1 1 1 0 0 0-.29-.71zM6 20v-9.59l6-6 6 6V20z"></path>
        </svg>
      );
    },
  },
];

const CRUD_ROUTES: RouteGroup[] = [
  {
    path: ROUTES.CARS,
    name: "nav-title.cars",
    icon: BiCar,
  },
  {
    path: ROUTES.CLIENTS,
    name: "nav-title.clients",
    icon: BiUser,
  },
];

const SETTINGS_ROUTES: RouteGroup[] = [
  {
    name: "nav-title.shop",
    icon: BiStore,
    children: [
      {
        path: ROUTES.SHOP_APPAREANCE,
        name: "nav-title.appareance",
      },
    ],
  },
  {
    path: ROUTES.SETTINGS,
    name: "nav-title.settings",
    icon: BiWrench,
  },
];

export const NAV_ROUTES = [CRUD_ROUTES];
