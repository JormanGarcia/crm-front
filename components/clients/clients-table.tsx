import React from "react";
import { useTable } from "react-table";
import Table from "../ui/table";
import TableFooter from "../ui/table-footer";
import IconButton from "../ui/icon-button";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { TableContainer } from "../ui/table-container";
import TableFilters from "../ui/table-filters";
import { DataTableProps, TableColumnsType } from "types/commons";
import { ActionsMenu } from "../ui/ActionsMenu";
import { IdWrapper } from "../ui/id-wrapper";
import { GetUsersDocument, useDeleteUserMutation } from "graphql/genenerated";
import { useAlertDialog } from "utils/hooks/use-alert-dialog";

const ClientsTable = (props: DataTableProps) => {
  const { data, refetch, count } = props;

  const [deleteUser, {}] = useDeleteUserMutation({
    refetchQueries: [GetUsersDocument],
  });

  const { open } = useAlertDialog({
    title: "¿Estas seguro de que deseas borrar este usuario?",
    description: "Una vez confirmada la operacion, no habra vuelta atras.",
  });

  const columns = React.useMemo<TableColumnsType>(
    () => [
      {
        Header: "N° cliente",
        accessor: "id",
        maxWidth: 200,
        Cell: ({ cell: { value } }) => (
          <div>
            <IdWrapper>{value}</IdWrapper>
          </div>
        ),
      },

      {
        Header: "Sitio Web",
        accessor: "website",
      },

      {
        Header: "N° autos",
        accessor: "cars",
        Cell: ({ cell }) => <div>{cell.value.length}</div>,
      },

      {
        Header: "Cantidad paginas filtro",
        accessor: "orders",
      },

      {
        Header: "Password",
        accessor: "password",
      },

      {
        Header: "Comentarios",
        accessor: "comments",
      },

      {
        Header: () => <div style={{ textAlign: "right" }}>Acciones</div>,
        accessor: "actions",
        Cell: ({ row }) => (
          <ActionsMenu
            onDelete={() =>
              open({
                async onConfirm() {
                  await deleteUser({
                    variables: {
                      id: row.values.id,
                    },
                  });
                },
              })
            }
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
      <TableFilters refetch={refetch} />

      <Table instance={tableInstance} loading={props.loading} />
      <TableFooter refetch={refetch} totalItems={count} />
    </TableContainer>
  );
};

export default ClientsTable;
