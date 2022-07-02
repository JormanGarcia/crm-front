import React, { useState } from "react";
import { BiX } from "react-icons/bi";
import { styled } from "stitches.config";

const Overlay = styled("div", {
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.6)",
  position: "fixed",
  top: 0,
  left: 0,
  zIndex: 5000,
});

const ImageContainer = styled("div", {
  zIndex: 5001,
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  margin: "auto",
  gap: 12,
});

const Image = styled("img", {
  width: "80vw",
  objectFit: "contain",
  maxHeight: "600px",
});

const CloseButton = styled("button", {
  zIndex: 5002,
  background: "transparent",
  border: "none",
});

const CloseIcon = styled(BiX, {
  color: "white",
  fontSize: 28,
});

interface Props {
  data: string[];
  open: boolean;
  onClose: () => void;
}

export const SlideShow = ({ data, onClose, open }: Props) => {
  if (!open) return null;
  const [state, setState] = useState(0);

  return (
    <div>
      <Overlay onClick={onClose} />

      <div>
        <ImageContainer>
          <Image src={data[state]} />
        </ImageContainer>
      </div>
    </div>
  );
};
