import { styled } from "@stitches/react";
import React, { useState } from "react";
import { PAGINATION_LIMIT_DEFAULT } from "utils/constants";
import { usePaginator } from "utils/hooks/use-paginator";

const StyledFooter = styled("footer", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "auto",
  borderTop: "1px solid $gray200",
  padding: "28px 32px",
  position: "sticky",
  bottom: 0,
  background: "white",
});

const TotalItems = styled("div", {
  fontSize: "$sm",
  fontWeight: 500,
  color: "$main700",
});

const PaginatorContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 36,
});

const CurrentPage = styled(TotalItems, {
  fontSize: "$sm",
  fontWeight: 500,
  color: "$main700",
});

const PaginatorButtons = styled("div", {
  display: "flex",
  gap: 16,
});
const PaginatorButton = styled("button", {
  border: "none",
  background: "transparent",
  padding: 2,
  fontWeight: 500,
  fontFamily: "'DM Sans', sans-serif",
  color: "$main700",

  variants: {
    disabled: {
      true: {
        color: "$gray400",
        cursor: "not-allowed",
      },
      false: {
        "&:hover": {
          color: "$main500",
          cursor: "pointer",
        },
      },
    },
  },

  defaultVariants: {
    disabled: false,
  },
});

interface Props {
  totalItems: number;
  refetch: any;
}

const TableFooter = (props: Props) => {
  const { totalItems, refetch } = props;

  const { totalPages, isLastPage, current, handlePagination } = usePaginator({
    total: totalItems,
    refetch,
  });

  function onPrevHandler() {
    if (current <= 1) return;

    handlePagination(current - 1);
  }

  function onNextHandler() {
    if (isLastPage) return;

    handlePagination(current + 1);
  }

  return (
    <StyledFooter>
      <TotalItems>{totalItems} items</TotalItems>

      <PaginatorContainer>
        <CurrentPage>
          Page {current} - {totalPages}
        </CurrentPage>

        <PaginatorButtons>
          <PaginatorButton disabled={current === 1} onClick={onPrevHandler}>
            Prev
          </PaginatorButton>
          <PaginatorButton disabled={isLastPage} onClick={onNextHandler}>
            Next
          </PaginatorButton>
        </PaginatorButtons>
      </PaginatorContainer>
    </StyledFooter>
  );
};

export default TableFooter;
