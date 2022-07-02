import CarsDataListFilter from "@/components/cars/cars-data-list-filter";
import CarCard from "@/components/ui/car-card";
import { Fieldset } from "@/components/ui/fieldset";
import Input from "@/components/ui/input";
import InputContainer from "@/components/ui/input-container";
import { Label } from "@/components/ui/label";
import LoadingSpinner from "@/components/ui/loading-spinner";
import Select from "@/components/ui/select";
import Slider from "@/components/ui/slider";
import { Stack } from "@/components/ui/stack";
import { useGetCarsLazyQuery, useGetCarsQuery } from "graphql/genenerated";
import useTranslation from "next-translate/useTranslation";
import { DependencyList, useEffect, useMemo, useState } from "react";
import { styled } from "stitches.config";

const CardList = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: 20,
  padding: 20,
  maxWidth: 1100,
  width: "100%",
  margin: "auto",
});

const Container = styled("div", {
  display: "flex",
  overflow: "hidden",
  width: "100vw",
  height: "100vh",
});

const MainContainer = styled("div", {
  width: "100%",
  overflowY: "auto",
});

const StateContainer = styled("div", {
  width: "100%",
  height: "calc(100vh - 8px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  vorflow: "hidden",
});

export default function Home() {
  const { t } = useTranslation("common");

  const [filters, setFilters] = useState({
    category: undefined,
    transmission: undefined,
    price: undefined,
    fromYear: undefined,
    toYear: undefined,
    brand: undefined,
    model: undefined,
  });

  const { loading, data } = useGetCarsQuery({
    fetchPolicy: "no-cache",
    variables: {
      where: {
        ...(filters.category ? { category: filters.category.value } : {}),
        ...(filters.transmission
          ? { transmission: filters.transmission.value }
          : {}),
        minPrice: filters.price && (filters.price as any).value[0],
        maxPrice: filters.price && (filters.price as any).value[1],
        minYear: filters.fromYear && (filters.fromYear as any).value,
        maxYear: filters.toYear && (filters.toYear as any).value,
        model: filters.model && (filters.model as any).value,
        brand: filters.brand && (filters.brand as any).value,
      },
      orderBy: {
        position: "ASC",
      },
    },
  });

  return (
    <Container>
      <CarsDataListFilter
        count={data ? data.cars.count : 0}
        value={filters}
        setValue={setFilters}
      />

      <MainContainer>
        {loading && (
          <StateContainer>
            <LoadingSpinner />
          </StateContainer>
        )}

        {!loading && data && data.cars.data.length === 0 && (
          <StateContainer>No se han encontrado resultados</StateContainer>
        )}
        <CardList>
          {data &&
            data.cars.data.map((item) => (
              <CarCard
                image={item.attachments.map((item) => item.thumbnail)}
                model={item.model}
                price={item.price}
                key={item.id}
                brand={item.brand}
                year={item.year}
                transmission={item.transmission}
                mileage={item.mileage}
              />
            ))}
        </CardList>
      </MainContainer>
    </Container>
  );
}
