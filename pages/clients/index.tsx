import PageHeader from "@/components/ui/page-header";
import PageHeaderTitle from "@/components/ui/page-header-title";
import Button from "@/components/ui/button";
import Layout from "@/components/ui/layout";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React, { ReactElement, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { useGetProductsQuery, useGetUsersQuery } from "graphql/genenerated";
import ClientsTable from "@/components/clients/clients-table";

export default function Clients() {
  const { t } = useTranslation("common");
  const { data, refetch, loading } = useGetUsersQuery({
    variables: {
      /*
      orderBy: {
        createdAt: "DESC",
      },
      */
      limit: 10,
      offset: 0,
      where: {
        role: "CLIENT",
      },
    },
    fetchPolicy: "cache-and-network",
  });

  return (
    <>
      <PageHeader>
        <PageHeaderTitle>{t("nav-title.clients")}</PageHeaderTitle>
        {/*
        <Link href="/products/create">
          <Button withIcon>
            <BiPlus />
            Create Client
          </Button>
        </Link>
        */}
      </PageHeader>

      <ClientsTable
        refetching={loading}
        count={data ? data.users.count : 0}
        data={data ? data.users.data : []}
        refetch={refetch}
        loading={loading}
      />
    </>
  );
}

Clients.layout = Layout;
