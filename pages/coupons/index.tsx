import PageHeader from "@/components/ui/page-header";
import PageHeaderTitle from "@/components/ui/page-header-title";
import ProductTable from "@/components/products/product-table";
import Button from "@/components/ui/button";
import Layout from "@/components/ui/layout";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React, { ReactElement, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { useGetProductsQuery } from "graphql/genenerated";
import CouponsTable from "@/components/coupons/coupons-table";

export default function Coupons() {
  const { t } = useTranslation("common");
  const { data, refetch, loading } = useGetProductsQuery({
    variables: {
      limit: 10,
      orderBy: {
        createdAt: "DESC",
      },
      offset: 0,
    },
    fetchPolicy: "cache-and-network",
  });

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>{t("nav-title.coupons")}</PageHeaderTitle>
        <Link href="/products/create">
          <Button withIcon>
            <BiPlus />
            Create Coupon
          </Button>
        </Link>
      </PageHeader>

      <CouponsTable
        refetching={loading}
        count={data ? data.products.count : 0}
        data={data ? data.products.data : []}
        refetch={refetch}
        loading={loading}
      />
    </>
  );
}

Coupons.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
