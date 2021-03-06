import PageHeader from "@/components/ui/page-header";
import PageHeaderTitle from "@/components/ui/page-header-title";
import Button from "@/components/ui/button";
import Layout from "@/components/ui/layout";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React, { ReactElement, useRef, useState } from "react";
import { BiPlus, BiSave } from "react-icons/bi";
import { styled } from "stitches.config";
import BackButton from "@/components/ui/back-button";
import Typography from "@/components/ui/typography";
import CarsForm from "@/components/cars/cars-form";
import FormContainer from "@/components/ui/form-container";
import { ROUTES } from "utils/routes";
import { useRouter } from "next/router";
import { useGetCarByIdQuery } from "graphql/genenerated";
import lodash from "lodash";

export default function EditCar() {
  const { t } = useTranslation("common");

  const ref = useRef<any>(null)!;
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { data } = useGetCarByIdQuery({
    variables: {
      id: router.query.id as string,
    },
    fetchPolicy: "no-cache",
  });

  if (!data) return "Loading...";

  return (
    <>
      <PageHeader>
        <BackButton href={ROUTES.CARS}>{t("nav-title.cars")}</BackButton>

        <Button
          leftIcon={<BiPlus />}
          onClick={() => ref!.current!.submit()}
          loading={loading}
        >
          Guardar
        </Button>
      </PageHeader>

      <FormContainer>
        <Typography size={"2xl"} weight="bold">
          Editar Automovil
        </Typography>

        <CarsForm
          ref={ref}
          initialValues={{
            attachments: data.car.attachments,
            brand: data.car.brand,
            category: data.car.category,
            mileage: data.car.mileage,
            model: data.car.model,
            position: data.car.position,
            price: data.car.price,
            status: data.car.status,
            transmission: data.car.transmission,
            year: data.car.year,
          }}
          setLoading={setLoading}
        />
      </FormContainer>
    </>
  );
}

EditCar.layout = Layout;
