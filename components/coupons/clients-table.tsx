import React from "react";
import { useTable } from "react-table";
import Table from "../ui/table";
import TableFooter from "../ui/table-footer";
import IconButton from "../ui/icon-button";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { TableContainer } from "../ui/table-container";
import TableFilters from "../ui/table-filters";
import { DataTableProps, TableColumnsType } from "types/commons";

const CouponsTable = (props: DataTableProps) => {
  const { data, refetch, count } = props;

  const columns = React.useMemo<TableColumnsType>(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },

      {
        Header: "Code",
        accessor: "code",
      },

      {
        Header: "Amount",
        accessor: "amount",
      },

      {
        Header: "Created At",
        accessor: "createdAt",
      },

      {
        Header: () => <div style={{ textAlign: "right" }}>Actions</div>,
        accessor: "actions",
        Cell: () => (
          <IconButton css={{ marginLeft: "auto" }}>
            <BiDotsHorizontalRounded />
          </IconButton>
        ),
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });

  return (
    <TableContainer>
      <TableFilters refetch={refetch} />

      <Table instance={tableInstance} loading={props.loading} />
      <TableFooter refetch={refetch} totalItems={count} />
    </TableContainer>
  );
};

export default CouponsTable;
