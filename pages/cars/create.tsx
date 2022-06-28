import PageHeader from "@/components/ui/page-header";
import PageHeaderTitle from "@/components/ui/page-header-title";
import Button from "@/components/ui/button";
import Layout from "@/components/ui/layout";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React, { ReactElement, useRef } from "react";
import { BiPlus } from "react-icons/bi";
import { styled } from "stitches.config";
import BackButton from "@/components/ui/back-button";
import Typography from "@/components/ui/typography";
import CarsForm from "@/components/cars/cars-form";
import FormContainer from "@/components/ui/form-container";
import { ROUTES } from "utils/routes";

export default function CreateProducts() {
  const { t } = useTranslation("common");

  const ref = useRef<any>(null)!;

  return (
    <>
      <PageHeader>
        <BackButton href={ROUTES.CARS}>{t("nav-title.cars")}</BackButton>

        <Button withIcon onClick={() => ref!.current!.submit()}>
          <BiPlus />
          Save
        </Button>
      </PageHeader>

      <FormContainer>
        <Typography size={"2xl"} weight="bold">
          Crear Automovil
        </Typography>

        <CarsForm ref={ref} />
      </FormContainer>
    </>
  );
}

CreateProducts.layout = Layout;
