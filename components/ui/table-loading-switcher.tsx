import React, { FC, ReactNode } from "react";
import TableLoadingView from "./table-loading-view";

const TableLoadingSwitcher: FC<{
  children: ReactNode;
  loading: boolean;
}> = (props) => {
  const { children, loading } = props;

  if (loading) return <TableLoadingView />;
  return children;
};

export default TableLoadingSwitcher;
