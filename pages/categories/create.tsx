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
import ProductForm from "@/components/products/product-form";

const ButtonStack = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 8,
});

const FormContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: "0px 40px",
  maxWidth: "700px",
  margin: "0px auto",
  gap: 32,
  marginTop: 20,
  marginBottom: 120,
});

const Container = styled("div", {
  overflow: "auto",
  height: "calc(100% - 86px)",
});

export default function CreateCategory() {
  const { t } = useTranslation("common");

  const ref = useRef<any>(null)!;

  return (
    <>
      <PageHeader>
        <BackButton href="/products">{t("nav-title.categories")}</BackButton>
        <ButtonStack>
          <Button variant="secondary" onClick={() => ref.current.reset()}>
            Clean
          </Button>
          <Button withIcon onClick={() => ref!.current!.submit()}>
            <BiPlus />
            Save
          </Button>
        </ButtonStack>
      </PageHeader>

      <Container>
        <FormContainer>
          <Typography size={"2xl"} weight="bold">
            Create {t("nav-title.products")}
          </Typography>

          <ProductForm ref={ref} />
        </FormContainer>
      </Container>
    </>
  );
}

CreateCategory.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
