import { useFormik } from "formik";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { styled, theme } from "stitches.config";
import { Fieldset } from "../ui/fieldset";
import Input from "../ui/input";
import InputContainer from "../ui/input-container";
import { Label } from "../ui/label";
import {
  Attachment,
  useCreateCarMutation,
  useUpdateCarMutation,
} from "graphql/genenerated";
import { useRouter } from "next/router";
import Select from "../ui/select";
import FileUpload from "../ui/file-upload";
import { toast } from "react-toastify";
import { Stack } from "../ui/stack";
import { ROUTES } from "utils/routes";
import * as Yup from "yup";
import {
  SELECT_CAR_STATUS_OPTIONS,
  SELECT_CATEGORIES_OPTIONS,
  SELECT_TRANSMISSIONS_OPTIONS,
  SELECT_YEAR_OPTIONS,
} from "utils/constants";

const Form = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: 28,
});

interface valuesTypes {
  position: number;
  status: string | typeof SELECT_CAR_STATUS_OPTIONS[0];
  brand: string;
  model: string;
  price: number;
  year: number | typeof SELECT_YEAR_OPTIONS[0];
  mileage: number;
  transmission: string | typeof SELECT_TRANSMISSIONS_OPTIONS[0];
  category: string | typeof SELECT_CATEGORIES_OPTIONS[0];
  attachments: Attachment[];
}

const initialValues = {
  position: 0,
  status: SELECT_CAR_STATUS_OPTIONS[0],
  brand: "",
  model: "",
  price: 0,
  year: undefined,
  mileage: 0,
  transmission: "",
  category: "",
  attachments: [],
};

interface Props {
  initialValues?: valuesTypes;
  setLoading?: (boolean: boolean) => void;
}

const formSchema = Yup.object().shape({
  position: Yup.number()
    .min(1, "La posicion del automovil debe de ser mayor a 0.")
    .required(),
  status: Yup.object().required(),
  brand: Yup.string().required("Este campo es obligatorio."),
  model: Yup.string().required("Este campo es obligatorio."),
  price: Yup.number().min(1, "Precio debe ser mayor a 1").required(),
  year: Yup.object().required("Este campo es obligatorio."),
  mileage: Yup.number().min(0).required("Este campo es obligatorio."),
  transmission: Yup.object().required("Este campo es obligatorio."),
  category: Yup.object().required("Este campo es obligatorio."),
});

const CarsForm = forwardRef((props: Props, ref) => {
  const router = useRouter();

  const [updateCar, { loading: loadingUpdate }] = useUpdateCarMutation({
    onCompleted() {
      toast("Automovil actualizado satisfactoriamente", {
        type: "success",
      });

      router.push(ROUTES.CARS);
    },
    onError(e) {
      toast("Automovil creado satisfactoriamente", {
        type: "error",
      });

      console.log(e.message, "error");
    },
  });

  const [createCar, { loading: loadingCreate }] = useCreateCarMutation({
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

      console.log(e.stack, "error");
    },
  });

  const [files, setFiles] = useState<Attachment[]>(
    props.initialValues ? props.initialValues.attachments : []
  );

  const {
    handleSubmit,
    resetForm,
    getFieldProps,
    values,
    setFieldValue,
    errors,
    touched,
    handleBlur,
    setFieldTouched,
  } = useFormik({
    initialValues: props.initialValues
      ? {
          position: props.initialValues.position,
          brand: props.initialValues.brand,
          price: props.initialValues.price,
          model: props.initialValues.model,
          mileage: props.initialValues.mileage,
          category: SELECT_CATEGORIES_OPTIONS.find(
            (item) => props.initialValues.category === item.value
          ),
          status: SELECT_CAR_STATUS_OPTIONS.find(
            (item) => props.initialValues.status === item.value
          ),

          year: SELECT_YEAR_OPTIONS.find(
            (item) => props.initialValues.year === item.value
          ),
          transmission: SELECT_TRANSMISSIONS_OPTIONS.find(
            (item) => props.initialValues.transmission === item.value
          ),
        }
      : initialValues,
    onSubmit: async (data) => {
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
        attachments: files.map((item) => item.id),
      };

      if (input.attachments.length < 1) {
        toast("Por favor agrega por lo menos una imagen", {
          type: "error",
        });
        return;
      }

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
    validationSchema: formSchema,
  });

  useImperativeHandle(
    ref,
    () => ({
      submit: handleSubmit,
      reset: resetForm,
    }),
    []
  );

  useEffect(() => {
    if (props.setLoading) {
      props.setLoading(loadingCreate || loadingUpdate);
    }
  }, [loadingCreate, loadingUpdate]);

  return (
    <Form onSubmit={handleSubmit}>
      <Stack css={{ gap: 20 }} direction={"vertical"}>
        <Input
          label="Posicion"
          required
          {...getFieldProps("position")}
          hasError={Boolean(errors.position && touched.position)}
          type={"number"}
          error={errors.position}
        />
        <Stack css={{ gap: 16, alignItems: "start" }}>
          <Input
            label="Marca"
            required
            {...getFieldProps("brand")}
            hasError={Boolean(errors.brand && touched.brand)}
            error={errors.brand}
          />

          <Input
            label="Modelo"
            required
            {...getFieldProps("model")}
            hasError={Boolean(errors.model && touched.model)}
            error={errors.model}
          />
        </Stack>

        <Input
          label="Precio (CLP)"
          required
          {...getFieldProps("price")}
          hasError={Boolean(errors.price && touched.price)}
          error={errors.price}
          type="number"
        />

        <Select
          value={values.category}
          options={SELECT_CATEGORIES_OPTIONS}
          onChange={(e) => setFieldValue("category", e)}
          onBlur={() => setFieldTouched("category")}
          hasError={Boolean(errors.category && touched.category)}
          error={errors.category as string}
          label="Categoria"
          required
        />

        <Fieldset>
          <Label>Imagenes</Label>
          <FileUpload value={files} setValue={setFiles} />
        </Fieldset>
        <Stack css={{ gap: 16 }}>
          <Select
            value={values.status}
            options={SELECT_CAR_STATUS_OPTIONS}
            onChange={(e) => setFieldValue("status", e)}
            onBlur={() => setFieldTouched("status")}
            hasError={Boolean(errors.status && touched.status)}
            error={errors.status as string}
            label="Status"
            required
          />

          <Select
            value={values.year}
            onChange={(e) => setFieldValue("year", e)}
            onBlur={() => setFieldTouched("year")}
            options={SELECT_YEAR_OPTIONS}
            hasError={Boolean(errors.year && touched.year)}
            error={errors.year as string}
            label="Año"
            required
          />
        </Stack>
        <Input
          label="Kilometraje"
          required
          {...getFieldProps("mileage")}
          hasError={Boolean(errors.mileage && touched.mileage)}
          error={errors.mileage}
          type="number"
        />

        <Select
          value={values.transmission}
          onChange={(e) => setFieldValue("transmission", e)}
          options={SELECT_TRANSMISSIONS_OPTIONS}
          onBlur={() => setFieldTouched("transmission")}
          hasError={Boolean(errors.transmission && touched.transmission)}
          error={errors.transmission as string}
          label="Transmission"
          required
        />
      </Stack>
    </Form>
  );
});

export default CarsForm;
