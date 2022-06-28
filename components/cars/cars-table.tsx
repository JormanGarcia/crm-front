import React, { useCallback } from "react";
import ProductTableFilters from "./product-table-filters";
import { Column, useTable } from "react-table";
import Table from "../ui/table";
import TableFooter from "../ui/table-footer";
import IconButton from "../ui/icon-button";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Badge from "../ui/badge";
import dayjs from "dayjs";
import { TableContainer } from "../ui/table-container";
import { PRODUCT_STATUS } from "types/product-status";
import { DataTableProps, TableColumnsType } from "types/commons";
import { ActionsMenu } from "../ui/ActionsMenu";
import { ROUTES } from "utils/routes";
import { useAlertDialog } from "utils/hooks/use-alert-dialog";
import TableFilters from "../ui/table-filters";
import { GetCarsDocument, useDeleteCarMutation } from "graphql/genenerated";
import { CAR_STATUS } from "types/car-status";
import { CAR_CATEGORIES } from "types/car-categories";

function parseStatus(status: CAR_STATUS) {
  switch (status) {
    case CAR_STATUS.ON_SALE:
      return "En venta";
    case CAR_STATUS.SELLED:
      return "Vendido";
    default:
      return "";
  }
}

function parseCategory(status: CAR_CATEGORIES) {
  switch (status) {
    case CAR_CATEGORIES.SUV:
      return "Suv";
    case CAR_CATEGORIES.SEDAN:
      return "Sedan";
    case CAR_CATEGORIES.MOTO:
      return "Moto";
    case CAR_CATEGORIES.PICK_UP:
      return "Pick Up";
    case CAR_CATEGORIES.OTHERS:
      return "Otros";
    default:
      return "";
  }
}

const ProductTable = (props: DataTableProps) => {
  const { data, refetch, count, refetching } = props;
  const [deleteCar] = useDeleteCarMutation({
    refetchQueries: [GetCarsDocument],
  });

  const { open } = useAlertDialog({
    title: "¿Estas seguro de borrar este automovil?",
    description: "Una vez confirmada no podras recuperar el elemento borrado",
    onConfirm: () => alert("deleted"),
  });

  const columns = React.useMemo<TableColumnsType>(
    () => [
      {
        Header: "Posicion",
        accessor: "position",
      },

      {
        Header: "Estado",
        accessor: "status",
        Cell: ({ cell: { value } }) => <>{parseStatus(value)}</>,
      },
      {
        Header: "Marca",
        accessor: "brand",
      },
      {
        Header: "Categoria",
        Cell: ({ cell: { value } }) => <>{parseCategory(value)}</>,
        accessor: "category",
      },
      {
        Header: "Modelo",
        accessor: "model",
      },
      {
        Header: "Año",
        accessor: "year",
      },
      {
        Header: "Kilometraje",
        accessor: "mileage",
      },
      {
        Header: "Transmicion",
        accessor: "transmission",
      },
      {
        Header: "Precio",
        accessor: "price",
      },
      {
        Header: "Comentarios",
        accessor: "comments",
      },
      {
        Header: "Fotos/Videos",
        accessor: "attathcments",
      },
      {
        Header: () => <div style={{ textAlign: "right" }}>Acciones</div>,
        accessor: "Acciones",
        Cell: ({ row }) => (
          <ActionsMenu
            onDelete={() =>
              open({
                async onConfirm() {
                  await deleteCar({
                    variables: {
                      id: row.original.id,
                    },
                  });
                },
              })
            }
            editUrl={ROUTES.CARS + `/${row.original.id}/edit`}
          />
        ),
      },
    ],
    []
  );

  const tableInstance = useTable({
    columns,
    data,
  });

  return (
    <TableContainer>
      <TableFilters refetch={refetch} refetching={refetching} />
      <Table loading={props.loading} instance={tableInstance} />
      <TableFooter totalItems={count} refetch={refetch} />
    </TableContainer>
  );
};

export default ProductTable;
