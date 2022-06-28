import { useApolloClient } from "@apollo/client";
import { GetProductsDocument } from "graphql/genenerated";
import React, { useMemo, useState } from "react";
import { BiChevronDown, BiRefresh, BiSearch } from "react-icons/bi";
import { PRODUCT_STATUS } from "types/product-status";
import { styled } from "../../stitches.config";
import IconButton from "../ui/icon-button";
import Input from "../ui/input";
import InputContainer from "../ui/input-container";
import InputIcon from "../ui/input-icon";
import Select from "../ui/select";
import TableFilters, { TableFilterProps } from "../ui/table-filters";

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

type Props = Omit<TableFilterProps, "extraFilters">;

function ProductTableFilters(props: Props) {
  const { refetch } = props;

  const StatusOptions = useMemo(
    () => [
      {
        label: "Published",
        value: PRODUCT_STATUS.PUBLISHED,
      },
      {
        label: "Draft",
        value: PRODUCT_STATUS.DRAFT,
      },
    ],
    []
  );

  const [status, setStatus] = useState();
  const [search, setSearch] = useState("");

  async function onChangeStatus(e: any) {
    setStatus(e);

    await refetch({
      where: {
        status: e ? e.value : null,
      },
    });
  }

  function onChangeSearch(e: any) {
    setSearch(e);
    refetch({
      where: {
        status: e.value,
      },
    });
  }

  const Filters = () => (
    <Select
      value={status}
      options={StatusOptions}
      onChange={onChangeStatus}
      isClearable
      placeholder="Select Status"
    />
  );

  return <TableFilters {...props} extraFilters={<Filters />} />;
}

export default ProductTableFilters;
