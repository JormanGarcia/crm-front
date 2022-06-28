import { ReactNode } from "react";
import { styled } from "stitches.config";

const StyledFormContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: "0px 40px",
  maxWidth: "700px",
  margin: "0px auto",
  gap: 32,
  marginTop: 20,
  marginBottom: 120,
});

const Container = styled("div", {
  overflow: "auto",
  height: "calc(100% - 86px)",
});

interface Props {
  children: ReactNode;
}

function FormContainer({ children }: Props) {
  return (
    <Container>
      <StyledFormContainer>{children}</StyledFormContainer>
    </Container>
  );
}

export default FormContainer;
