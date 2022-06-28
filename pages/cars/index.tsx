import PageHeader from "@/components/ui/page-header";
import PageHeaderTitle from "@/components/ui/page-header-title";
import CarsTable from "@/components/cars/cars-table";
import Button from "@/components/ui/button";
import Layout from "@/components/ui/layout";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React, { ReactElement, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { useGetCarsQuery, useGetProductsQuery } from "graphql/genenerated";
import { ROUTES } from "utils/routes";
import AlertDialog from "@/components/ui/alert-dialog";

export default function Products() {
  const { t } = useTranslation("common");
  const { data, refetch, loading } = useGetCarsQuery({
    variables: {
      limit: 10,
      orderBy: {
        createdAt: "DESC",
      },
      offset: 0,
    },

    onError(error) {
      console.log(error);
    },
  });

  console.log(data);

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>{t("nav-title.cars")}</PageHeaderTitle>
        <Link href={ROUTES.CARS + "/create"}>
          <Button withIcon>
            <BiPlus />
            Agregar Automovil
          </Button>
        </Link>
      </PageHeader>

      <CarsTable
        refetching={loading}
        count={data ? data.cars.count : 0}
        data={data ? data.cars.data : []}
        refetch={refetch}
        loading={loading}
      />
    </>
  );
}

Products.layout = Layout;
