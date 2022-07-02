import { useFormik } from "formik";
import React, { forwardRef, useImperativeHandle, useMemo } from "react";
import { styled, theme } from "stitches.config";
import { Fieldset } from "../ui/fieldset";
import Input from "../ui/input";
import InputContainer from "../ui/input-container";
import { Label } from "../ui/label";
import TextEditor from "../ui/text-editor";
import {
  useCreateProductOneMutation,
  useGetCategoriesQuery,
} from "graphql/genenerated";
import { useRouter } from "next/router";
import Select from "../ui/select";
import { PRODUCT_STATUS } from "types/product-status";
import FileUpload from "../ui/file-upload";
import { toast } from "react-toastify";
import slugify from "slugify";
import { FormStack } from "../ui/form-stack";

const Form = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: 28,
});

const InputStack = styled("div", {
  display: "flex",
  gap: 12,
  width: "100%",
});

const CategoryForm = forwardRef((props, ref) => {
  const router = useRouter();

  const StatusOptions = useMemo(
    () => [
      {
        label: "Published",
        value: PRODUCT_STATUS.PUBLISHED,
      },
      {
        label: "Draft",
        value: PRODUCT_STATUS.DRAFT,
      },
    ],
    []
  );

  const initialValues = useMemo(
    () => ({
      name: "",
      description: "",
      categories: [] as any[],
      tags: "",
      status: StatusOptions[1],
      stock: 0,
      price: 0,
    }),
    []
  );

  const { data: categoriesQuery, loading: loadingCategories } =
    useGetCategoriesQuery();

  const [createProduct, { data }] = useCreateProductOneMutation({
    onCompleted() {
      toast("Operation Completed.", {
        type: "success",
      });

      router.push("/products");
    },
    onError(e) {
      toast("Something went wrong.", {
        type: "error",
      });
    },
  });

  const {
    handleSubmit,
    resetForm,
    getFieldProps,
    values,
    setFieldValue,
    submitForm,
  } = useFormik({
    initialValues: initialValues,
    onSubmit: (data) => {
      const { description, name, price, stock, status, categories } = data;

      createProduct({
        variables: {
          object: {
            description,
            name,
            price,
            slug: slugName,
            stock,
            status: (status as any).value,
            categories: categories.map((item) => item.value),
          },
        },
      });
    },
  });

  const slugName = useMemo(
    () =>
      slugify(values.name, {
        lower: true,
      }),
    [values.name]
  );

  useImperativeHandle(ref, () => ({
    submit: handleSubmit,
    reset: resetForm,
  }));

  return (
    <FormStack as="form" onSubmit={handleSubmit}>
      <FormStack direction={"vertical"}>
        <FormStack direction={"horizontal"}>
          <Fieldset>
            <Label required>Name</Label>
            <InputContainer>
              <Input {...getFieldProps("name")} />
            </InputContainer>
          </Fieldset>

          <Fieldset>
            <Label required>Slug</Label>
            <InputContainer>
              <Input value={slugName} readOnly />
            </InputContainer>
          </Fieldset>
        </FormStack>

        <Fieldset>
          <Label required>Description</Label>

          <TextEditor
            value={values.description}
            onChange={(data) => setFieldValue("description", data)}
            name={"description"}
          />
        </Fieldset>

        <Fieldset>
          <Label required>Categories</Label>

          <Select
            isMulti
            options={
              categoriesQuery?.categories.data.map((item) => ({
                value: item.id,
                label: item.name,
              })) ?? []
            }
            isLoading={loadingCategories}
            value={values.categories}
            onChange={(value) => setFieldValue("categories", value)}
          />
        </Fieldset>
      </FormStack>

      <Fieldset>
        <Label required>Tags</Label>
        <InputContainer>
          <Input {...getFieldProps("tags")} />
        </InputContainer>
      </Fieldset>

      <Fieldset>
        <Label>Preview images</Label>
      </Fieldset>

      <Fieldset>
        <Label required>Stock</Label>
        <InputContainer>
          <Input {...getFieldProps("stock")} type={"number"} />
        </InputContainer>
      </Fieldset>

      <Fieldset>
        <Label required>Price</Label>
        <InputContainer>
          <Input {...getFieldProps("price")} type="number" />
        </InputContainer>
      </Fieldset>

      <Fieldset>
        <Label required>Status</Label>

        <Select
          value={values.status}
          placeholder="Select Status"
          options={StatusOptions}
          onChange={(x: any) => setFieldValue("status", x)}
        />
      </Fieldset>
    </FormStack>
  );
});

export default CategoryForm;
