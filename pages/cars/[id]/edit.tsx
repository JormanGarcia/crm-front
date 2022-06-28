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
import { useRouter } from "next/router";
import { useGetCarByIdQuery } from "graphql/genenerated";

export default function EditCar() {
  const { t } = useTranslation("common");

  const ref = useRef<any>(null)!;

  const router = useRouter();

  const { data } = useGetCarByIdQuery({
    variables: {
      id: router.query.id as string,
    },
  });

  if (!data) return "Loading...";

  return (
    <>
      <PageHeader>
        <BackButton href={ROUTES.CARS}>{t("nav-title.cars")}</BackButton>

        <Button withIcon onClick={() => ref!.current!.submit()}>
          <BiPlus />
          Guardar
        </Button>
      </PageHeader>

      <FormContainer>
        <Typography size={"2xl"} weight="bold">
          Editar Automovil
        </Typography>

        <CarsForm ref={ref} initialValues={data.car} />
      </FormContainer>
    </>
  );
}

EditCar.layout = Layout;