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
  year: SELECT_YEAR_OPTIONS[0],
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
  position: Yup.number().min(1).required(),
  status: Yup.object().required(),
  brand: Yup.string().required(),
  model: Yup.string().required(),
  price: Yup.number().min(1).required(),
  year: Yup.object().required(),
  mileage: Yup.number().min(1).required(),
  transmission: Yup.object().required(),
  category: Yup.object().required(),
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
        <Fieldset>
          <Label required>Posicion</Label>
          <InputContainer error={Boolean(errors.position && touched.position)}>
            <Input {...getFieldProps("position")} type={"number"} />
          </InputContainer>
        </Fieldset>
        <Stack css={{ gap: 16 }}>
          <Fieldset>
            <Label required>Marca</Label>
            <InputContainer error={Boolean(errors.brand && touched.brand)}>
              <Input {...getFieldProps("brand")} />
            </InputContainer>
          </Fieldset>

          <Fieldset>
            <Label required>Modelo</Label>
            <InputContainer error={Boolean(errors.model && touched.model)}>
              <Input {...getFieldProps("model")} />
            </InputContainer>
          </Fieldset>
        </Stack>

        <Fieldset>
          <Label required>Precio (CLP)</Label>
          <InputContainer error={Boolean(errors.price && touched.price)}>
            <Input {...getFieldProps("price")} type="number" />
          </InputContainer>
        </Fieldset>
        <Fieldset>
          <Label required>Categoria</Label>

          <Select
            value={values.category}
            onChange={(e) => setFieldValue("category", e)}
            options={SELECT_CATEGORIES_OPTIONS}
            error={!!errors.category}
          />
        </Fieldset>
        <Fieldset>
          <Label>Imagenes</Label>
          <FileUpload value={files} setValue={setFiles} />
        </Fieldset>
        <Stack css={{ gap: 16 }}>
          <Fieldset>
            <Label required>Estado</Label>

            <Select
              value={values.status}
              onChange={(e) => setFieldValue("status", e)}
              options={SELECT_CAR_STATUS_OPTIONS}
              error={!!errors.status}
            />
          </Fieldset>
          <Fieldset>
            <Label required>Año</Label>

            <Select
              value={values.year}
              onChange={(e) => setFieldValue("year", e)}
              options={SELECT_YEAR_OPTIONS}
              error={!!errors.year}
            />
          </Fieldset>
        </Stack>
        <Fieldset>
          <Label required>Kilometraje</Label>
          <InputContainer error={Boolean(errors.mileage && touched.mileage)}>
            <Input {...getFieldProps("mileage")} type="number" />
          </InputContainer>
        </Fieldset>
        <Fieldset>
          <Label required>Transmicion</Label>

          <Select
            error={!!errors.transmission}
            value={values.transmission}
            onChange={(e) => setFieldValue("transmission", e)}
            options={SELECT_TRANSMISSIONS_OPTIONS}
          />
        </Fieldset>
      </Stack>
    </Form>
  );
});

export default CarsForm;
