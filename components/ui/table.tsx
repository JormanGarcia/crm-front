import React from "react";
import ContentLoader from "react-content-loader";
import Skeleton from "react-loading-skeleton";
import { TableInstance } from "react-table";
import { styled } from "../../stitches.config";
import TableSkeleton from "./table-skeleton";

const TableHeader = styled("thead", {
  boxShadow: "-2px 0 16px rgba(154,153,193,0.10)",
  position: "sticky",
  top: 0,
});

export const TableContainer = styled("div", {
  height: "100%",
  overflowY: "auto",
});

const StyledTable = styled("table", {
  width: "100%",
  borderSpacing: 0,
});

const TableBodyRows = styled("tr", {
  // height: 50,
});

const TableBody = styled("tbody", {
  // overflowY: "scroll",
});

const TableRowCell = styled("td", {
  borderBottom: "1px solid $gray200",
  padding: "24px 32px",
  color: "$text500",
  fontSize: "$sm",
  textAlign: "left",
});

export const TableHeaderCell = styled("th", {
  borderBottom: "1px solid $gray200",
  padding: "12px 32px",
  color: "$text400",
  fontSize: "$sm",
  textAlign: "left",
  fontWeight: 500,
  position: "sticky",
  top: 0,
  background: "white",
  whiteSpace: "nowrap",
});

const NoDataContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "calc(100% - 42px)",
  width: "100%",
});

interface Props {
  instance: TableInstance;
  loading?: boolean;
}

const Table = ({ instance, loading }: Props) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    instance;

  if (loading) return <TableSkeleton />;

  return (
    <TableContainer>
      <StyledTable {...getTableProps()}>
        <TableHeader>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableHeaderCell {...column.getHeaderProps()}>
                  {column.render("Header")}
                </TableHeaderCell>
              ))}
            </tr>
          ))}
        </TableHeader>

        <TableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            return (
              <TableBodyRows {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableRowCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableRowCell>
                  );
                })}
              </TableBodyRows>
            );
          })}
        </TableBody>
      </StyledTable>

      {rows.length === 0 && (
        <NoDataContainer>No data Found :{"("}</NoDataContainer>
      )}
    </TableContainer>
  );
};

export default Table;
