import React from "react";
import Skeleton from "react-loading-skeleton";
import { styled } from "stitches.config";
import { TableContainer } from "./table";

const GridBody = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)",
  gap: 48,
  padding: "24px 32px",
});

const GridHeader = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)",
  gap: 48,
  padding: "12px 32px 9px 32px",
  boxShadow: "-2px 0 16px rgba(154,153,193,0.10)",

  alignContent: "center",
  alignItems: "center",
});

const TableSkeleton = () => {
  return (
    <TableContainer>
      <GridHeader>
        <Skeleton count={1} height={12} />
        <Skeleton count={1} height={12} />
        <Skeleton count={1} height={12} />
        <Skeleton count={1} height={12} />
        <Skeleton count={1} height={12} />
        <Skeleton count={1} height={12} />
      </GridHeader>

      {[...Array(8)].map((_, i) => (
        <GridBody as="div" key={i}>
          <Skeleton count={1} />
          <Skeleton count={1} />
          <Skeleton count={1} />
          <Skeleton count={1} />
          <Skeleton count={1} />
          <Skeleton count={1} />
        </GridBody>
      ))}
    </TableContainer>
  );
};

export default TableSkeleton;
