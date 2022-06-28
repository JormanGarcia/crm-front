import React, { useState } from "react";
import { BiChevronDown, BiRefresh, BiSearch } from "react-icons/bi";
import { keyframes, styled } from "../../stitches.config";
import IconButton from "../ui/icon-button";
import Input from "../ui/input";
import InputContainer from "../ui/input-container";
import InputIcon from "../ui/input-icon";

const TableFilterRow = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  borderBottom: "1px solid $gray200",
  padding: "16px 30px",
});

const Filters = styled("div", {
  display: "flex",
  gap: 12,
});

const LoadingAnimation = keyframes({
  from: {
    transform: "rotate(0deg)",
  },
  to: {
    transform: "rotate(360deg)",
  },
});

const RefetchButton = styled(IconButton, {
  variants: {
    loading: {
      true: {
        "& > svg": {
          animation: LoadingAnimation + " 2s linear infinite",
        },
      },
    },
  },
});

export interface TableFilterProps {
  refetch: any;
  extraFilters?: React.ReactNode;
  refetching?: boolean;
}

function TableFilters({
  refetch,
  extraFilters,
  refetching = false,
}: TableFilterProps) {
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  function onChangeSearch(e: any) {
    setSearch(e.target.value);
    refetch();
  }

  return (
    <TableFilterRow>
      <Filters>
        <InputContainer css={{ width: 230 }}>
          <Input placeholder="Buscar..." />
          <InputIcon as={BiSearch} />
        </InputContainer>

        {extraFilters && extraFilters}
      </Filters>

      <RefetchButton
        loading={refetching}
        onClick={() => refetch()}
        variant={"ghost"}
      >
        <BiRefresh />
      </RefetchButton>
    </TableFilterRow>
  );
}

export default TableFilters;
