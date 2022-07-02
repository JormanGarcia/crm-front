import { useGetCarsQuery } from "graphql/genenerated";
import React, { useMemo } from "react";
import { styled } from "stitches.config";
import {
  SELECT_CATEGORIES_OPTIONS,
  SELECT_PRICE_OPTIONS,
  SELECT_TRANSMISSIONS_OPTIONS,
  SELECT_YEAR_OPTIONS,
} from "utils/constants";
import { Fieldset } from "../ui/fieldset";
import { Label } from "../ui/label";
import Select from "../ui/select";
import { Stack } from "../ui/stack";
import Typography from "../ui/typography";

const FilterContainer = styled("div", {
  padding: "20px 20px 0 20px",
  marginTop: 0,
  borderRadius: 8,
  display: "flex",
  flexDirection: "column",
  gap: 8,
  borderRight: "1px solid $gray200",
  width: 300,
  height: "100vh",
  flexShrink: 0,
});

const Filters = styled("div", {});

type SELECT_OPTIONS_TYPE = typeof SELECT_PRICE_OPTIONS;

function sortByAlphabet<T = {}>(items: T[], key: keyof T) {
  return items.sort(function (a, b) {
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  });
}

interface Props {
  value: {
    brand?: SELECT_OPTIONS_TYPE;
    model?: SELECT_OPTIONS_TYPE;
    category?: SELECT_OPTIONS_TYPE;
    transmission?: SELECT_OPTIONS_TYPE;
    fromYear?: SELECT_OPTIONS_TYPE;
    toYear?: SELECT_OPTIONS_TYPE;
    price?: SELECT_OPTIONS_TYPE;
  };

  setValue: (a: Props["value"] | ((b: Props["value"]) => void)) => void;
  count: number;
}

const CarsDataListFilter = ({ value, setValue, count }: Props) => {
  const { data: filtersData } = useGetCarsQuery();

  const brandOptions = useMemo(
    () =>
      filtersData
        ? filtersData.cars.data.reduce((prev, curr, index) => {
            const option = {
              label: curr.brand,
              value: curr.brand,
            };

            if (prev.map((item: any) => item.value).includes(curr.brand)) {
              return prev;
            }

            return [...prev, option];
          }, [])
        : [],
    [filtersData]
  );

  const modelOptions = filtersData
    ? filtersData.cars.data.reduce((prev, curr) => {
        if (!value.brand) return [];

        if (curr.brand !== (value.brand as any).value) return prev;

        if (prev.map((item: any) => item.value).includes(curr.model)) {
          return prev;
        }

        return [
          ...prev,
          {
            label: curr.model,
            value: curr.model,
          },
        ];
      }, [])
    : [];

  function onChangeValue(value, key) {
    setValue((prevValue) => ({
      ...prevValue,
      [key]: value,
    }));
  }

  return (
    <FilterContainer>
      <Typography size={"lg"} weight={"bold"} css={{ color: "$text500" }}>
        Busqueda
      </Typography>

      <Filters>
        <Stack direction={"vertical"} css={{ gap: 16 }}>
          <Fieldset>
            <Label>Marca</Label>
            <Select
              placeholder=""
              isClearable
              options={sortByAlphabet(brandOptions, "value")}
              onChange={(value) => {
                onChangeValue(value, "brand");
                onChangeValue(null, "model");
              }}
              value={value.brand}
            />
          </Fieldset>
          <Fieldset>
            <Label>Modelo</Label>
            <Select
              placeholder=""
              isClearable
              options={sortByAlphabet(modelOptions, "value")}
              onChange={(value) => onChangeValue(value, "model")}
              value={value.model}
            />
          </Fieldset>

          <Fieldset>
            <Label>Categoria</Label>
            <Select
              placeholder=""
              isClearable
              options={SELECT_CATEGORIES_OPTIONS}
              onChange={(value) => onChangeValue(value, "category")}
              value={value.category}
            />
          </Fieldset>
          <Fieldset>
            <Label>Transmision</Label>
            <Select
              placeholder=""
              isClearable
              options={SELECT_TRANSMISSIONS_OPTIONS}
              onChange={(value) => onChangeValue(value, "transmission")}
              value={value.transmission}
            />
          </Fieldset>

          <Stack direction={"horizontal"} css={{ gap: 16 }}>
            <Fieldset>
              <Label>Desde Año</Label>
              <Select
                placeholder=""
                isClearable
                options={SELECT_YEAR_OPTIONS}
                onChange={(value) => onChangeValue(value, "fromYear")}
                value={value.fromYear}
              />
            </Fieldset>
            <Fieldset>
              <Label>Hasta Año</Label>
              <Select
                placeholder=""
                isClearable
                options={SELECT_YEAR_OPTIONS}
                onChange={(value) => onChangeValue(value, "toYear")}
                value={value.toYear}
              />
            </Fieldset>
          </Stack>

          <Fieldset>
            <Label>Precio</Label>
            <Select
              placeholder=""
              isClearable
              options={SELECT_PRICE_OPTIONS}
              onChange={(value) => onChangeValue(value, "price")}
              value={value.price}
            />
          </Fieldset>
        </Stack>
      </Filters>
      <Typography css={{ color: "$text400" }} size="sm">
        Se han encontrado {count} resultados
      </Typography>
    </FilterContainer>
  );
};

export default CarsDataListFilter;
