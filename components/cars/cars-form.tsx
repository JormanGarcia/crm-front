import { useFormik } from "formik";
import React, { forwardRef, useImperativeHandle, useMemo } from "react";
import { styled, theme } from "stitches.config";
import { Fieldset } from "../ui/fieldset";
import Input from "../ui/input";
import InputContainer from "../ui/input-container";
import { Label } from "../ui/label";
import {
  useCreateCarMutation,
  useUpdateCarMutation,
} from "graphql/genenerated";
import { useRouter } from "next/router";
import Select from "../ui/select";
import FileUpload from "../ui/file-upload";
import { toast } from "react-toastify";
import { Stack } from "../ui/stack";
import { ROUTES } from "utils/routes";
import { CAR_STATUS } from "types/car-status";
import { CAR_CATEGORIES } from "types/car-categories";

const year = new Date().getFullYear();
const years = Array.from(new Array(80), (val, index) => year - index);

const YearsOptions = years.map((year: number) => ({
  label: year,
  value: year,
}));

const Form = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: 28,
});

const StatusOptions = [
  { label: "En Venta", value: CAR_STATUS.ON_SALE },
  { label: "Vendido", value: CAR_STATUS.SELLED },
];

const TransmissionOptions = [
  { label: "MT", value: "MT" },
  { label: "AT", value: "AT" },
];

const CategoriesOptions = [
  { label: "Sedan", value: CAR_CATEGORIES.SEDAN },
  { label: "Suv", value: CAR_CATEGORIES.SUV },
  { label: "Pick up", value: CAR_CATEGORIES.PICK_UP },
  { label: "Motos", value: CAR_CATEGORIES.MOTO },
  { label: "Otros", value: CAR_CATEGORIES.OTHERS },
];

const initialValues = {
  position: 0,
  status: StatusOptions[0],
  brand: "",
  model: "",
  price: 0,
  year: YearsOptions[0],
  mileage: 0,
  transmission: "",
  category: "",
};

interface Props {
  initialValues?: any;
}

const CarsForm = forwardRef((props: Props, ref) => {
  const router = useRouter();

  const [updateCar] = useUpdateCarMutation({
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

  const [createCar, { loading: loadingMutation }] = useCreateCarMutation({
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
      initialValues: props.initialValues
        ? {
            position: props.initialValues.position,
            brand: props.initialValues.brand,
            price: props.initialValues.price,
            model: props.initialValues.model,
            mileage: props.initialValues.mileage,
            category: CategoriesOptions.find(
              (item) => props.initialValues.category === item.value
            ),
            status: StatusOptions.find(
              (item) => props.initialValues.status === item.value
            ),

            year: YearsOptions.find(
              (item) => props.initialValues.year === item.value
            ),
            transmission: TransmissionOptions.find(
              (item) => props.initialValues.transmission === item.value
            ),
          }
        : initialValues,
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

        const input = {
          brand,
          comments: "",
          status: status.value,
          mileage: mileage,
          model,
          position,
          price,
          transmission: (transmission as any).value,
          year: (year as any).value,
          category: (category as any).value,
        };

        if (!props.initialValues) {
          createCar({
            variables: {
              object: input,
            },
          });
        } else {
          updateCar({
            variables: {
              object: input,
              id: router.query.id as string,
            },
          });
        }
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
        <Fieldset>
          <Label required>Posicion</Label>
          <InputContainer>
            <Input {...getFieldProps("position")} type={"number"} />
          </InputContainer>
        </Fieldset>
        <Stack css={{ gap: 16 }}>
          <Fieldset>
            <Label required>Marca</Label>
            <InputContainer>
              <Input {...getFieldProps("brand")} />
            </InputContainer>
          </Fieldset>

          <Fieldset>
            <Label required>Modelo</Label>
            <InputContainer>
              <Input {...getFieldProps("model")} />
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
            options={CategoriesOptions}
          />
        </Fieldset>
        <Fieldset>
          <Label>Imagenes</Label>
          <FileUpload />
        </Fieldset>
        <Stack css={{ gap: 16 }}>
          <Fieldset>
            <Label required>Estado</Label>

            <Select
              value={values.status}
              onChange={(e) => setFieldValue("status", e)}
              options={StatusOptions}
            />
          </Fieldset>
          <Fieldset>
            <Label required>Año</Label>

            <Select
              value={values.year}
              onChange={(e) => setFieldValue("year", e)}
              options={YearsOptions}
            />
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
            options={TransmissionOptions}
          />
        </Fieldset>
      </Stack>
    </Form>
  );
});

export default CarsForm;
