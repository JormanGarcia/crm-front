import React from "react";
import { styled } from "stitches.config";
import LoadingSpinner from "./loading-spinner";

const LoadingViewContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
});

const TableLoadingView = () => {
  return (
    <LoadingViewContainer>
      <LoadingSpinner />
    </LoadingViewContainer>
  );
};

export default TableLoadingView;
