import CategoryTable from "@/components/categories/category-table";
import Button from "@/components/ui/button";
import Layout from "@/components/ui/layout";
import PageHeader from "@/components/ui/page-header";
import PageHeaderTitle from "@/components/ui/page-header-title";
import { useGetCategoriesQuery } from "graphql/genenerated";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React, { ReactElement } from "react";
import { BiPlus } from "react-icons/bi";

export default function Products() {
  const { t } = useTranslation("common");
  const { data, refetch, loading } = useGetCategoriesQuery({
    /*
    variables: {
      limit: 10,
      orderBy: {
        createdAt: "DESC",
      },
    },
    */
    fetchPolicy: "no-cache",
  });
  return (
    <>
      <PageHeader>
        <PageHeaderTitle>{t("nav-title.categories")}</PageHeaderTitle>
        <Link href="/categories/create">
          <Button withIcon>
            <BiPlus />
            Create Category
          </Button>
        </Link>
      </PageHeader>

      <CategoryTable
        count={data ? data.categories.count : 0}
        data={data ? data.categories.data : []}
        refetch={refetch}
        loading={loading}
        refetching={loading}
      />
    </>
  );
}

Products.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
