import { useFormik } from "formik";
import React, { forwardRef, useImperativeHandle, useMemo } from "react";
import { styled, theme } from "stitches.config";
import { Fieldset } from "../ui/fieldset";
import Input from "../ui/input";
import InputContainer from "../ui/input-container";
import { Label } from "../ui/label";
import TextEditor from "../ui/text-editor";
import {
  useCreateCarMutation,
  useCreateProductOneMutation,
  useGetCategoriesQuery,
} from "graphql/genenerated";
import { useRouter } from "next/router";
import Select from "../ui/select";
import FileUpload from "../ui/file-upload";
import { toast } from "react-toastify";
import { Stack } from "../ui/stack";
import { ROUTES } from "utils/routes";

const Form = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: 28,
});

const initialValues = {
  position: 0,
  status: { label: "En Venta", value: "ON_SALE" },
  brand: "",
  model: "",
  price: 0,
  year: 2022,
  mileage: 0,
  transmission: "",
  category: "",
};

interface Props {
  initialValues?: typeof initialValues;
}

const CarsForm = forwardRef((props: Props, ref) => {
  const router = useRouter();

  const { data: categoriesQuery, loading: loadingCategories } =
    useGetCategoriesQuery();

  const SelectCategoriesOptions = useMemo(
    () =>
      categoriesQuery
        ? categoriesQuery.categories.data.map((item) => ({
            value: item.id,
            label: item.name,
          }))
        : [],
    []
  );

  const [createProduct, { loading: loadingMutation }] = useCreateCarMutation({
    onCompleted() {
      toast("Operation Completed.", {
        type: "success",
      });

      router.push(ROUTES.CARS);
    },
    onError(e) {
      toast("Something went wrong.", {
        type: "error",
      });

      console.log(e.message, "error");
    },
  });

  const { handleSubmit, resetForm, getFieldProps, values, setFieldValue } =
    useFormik({
      initialValues: props.initialValues ?? initialValues,
      onSubmit: (data) => {
        console.log(data);
        const {
          brand,
          category,
          mileage,
          model,
          position,
          price,
          status,
          transmission,
          year,
        } = data;

        createProduct({
          variables: {
            object: {
              brand,
              comments: "",
              status: status.value,
              mileage: mileage,
              model,
              position,
              price,
              transmission: transmission.value,
              year,
              category: category.value,
            },
          },
        });
      },
    });

  useImperativeHandle(
    ref,
    () => ({
      submit: handleSubmit,
      reset: resetForm,
      submiting: true,
    }),
    [loadingMutation]
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Stack css={{ gap: 20 }} direction={"vertical"}>
        <Stack css={{ gap: 16 }}>
          <Fieldset>
            <Label required>Marca</Label>
            <InputContainer>
              <Input {...getFieldProps("model")} />
            </InputContainer>
          </Fieldset>

          <Fieldset>
            <Label required>Modelo</Label>
            <InputContainer>
              <Input {...getFieldProps("brand")} />
            </InputContainer>
          </Fieldset>
        </Stack>

        <Fieldset>
          <Label required>Precio</Label>
          <InputContainer>
            <Input {...getFieldProps("price")} type="number" />
          </InputContainer>
        </Fieldset>
        <Fieldset>
          <Label required>Categoria</Label>

          <Select
            value={values.category}
            onChange={(e) => setFieldValue("category", e)}
            options={[
              { label: "Sedan", value: "SEDAN" },
              { label: "Suv", value: "SUV" },
              { label: "Pick up", value: "PICK_UP" },
              { label: "Motos", value: "MOTO" },
              { label: "Otros", value: "Others" },
            ]}
          />
        </Fieldset>
        <Fieldset>
          <Label>Preview images</Label>
          <FileUpload />
        </Fieldset>
        <Stack css={{ gap: 16 }}>
          <Fieldset>
            <Label required>Estado</Label>

            <Select
              value={values.status}
              onChange={(e) => setFieldValue("status", e)}
              options={[{ label: "En Venta", value: "ON_SALE" }]}
            />
          </Fieldset>
          <Fieldset>
            <Label required>Año</Label>
            <InputContainer>
              <Input {...getFieldProps("year")} />
            </InputContainer>
          </Fieldset>
        </Stack>
        <Fieldset>
          <Label required>Kilometraje</Label>
          <InputContainer>
            <Input {...getFieldProps("mileage")} type="number" />
          </InputContainer>
        </Fieldset>
        <Fieldset>
          <Label required>Transmicion</Label>

          <Select
            value={values.transmission}
            onChange={(e) => setFieldValue("transmission", e)}
            options={[
              { label: "MT", value: "MT" },
              { label: "AT", value: "AT" },
            ]}
          />
        </Fieldset>
      </Stack>
    </Form>
  );
});

export default CarsForm;
