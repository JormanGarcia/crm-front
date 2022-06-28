import React from "react";
import { Column, useTable } from "react-table";
import Table from "../ui/table";
import TableFooter from "../ui/table-footer";
import IconButton from "../ui/icon-button";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { TableContainer } from "../ui/table-container";
import TableFilters from "../ui/table-filters";
import { DataTableProps, TableColumnsType } from "types/commons";

const CategoryTable = (props: DataTableProps) => {
  const { data, refetch, count } = props;

  const columns = React.useMemo<TableColumnsType>(
    () => [
      {
        Header: "ID",
        accessor: "id",
        minWidth: 600,
      },

      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Icon",
        accessor: "icon",
        /*
        Cell: ({ cell: { value } }) => (
          <Badge variant={getBadgeVariant(value)}>
            {value === PRODUCT_STATUS.PUBLISHED ? "Published" : "Draft"}
          </Badge>
        ),
        */
      },
      {
        Header: "Slug",
        accessor: "slug",
      },
      {
        Header: "Amount of products",
        accessor: "products",
        Cell: ({ cell: { value } }) => <div>{value.length}</div>,
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

export default CategoryTable;
