import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { ROUTES } from "utils/routes";
import Layout from "../components/ui/layout";
import { NextPageWithLayout } from "./_app";

export default function Home() {
  const { t } = useTranslation("common");

  const router = useRouter();

  router.push(ROUTES.CARS);

  return <div></div>;
}

Home.layout = Layout;
