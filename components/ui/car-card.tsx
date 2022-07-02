import React, { useState } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { styled } from "stitches.config";
import { moneyFormatter } from "utils/money-formatter";
import { Stack } from "./stack";

export const CardImageButton = styled("button", {
  position: "absolute",
  top: 0,
  bottom: 0,
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: 2,
  borderRadius: "100%",
  width: "fit-content",
  height: "fit-content",
  background: "rgba(0,0,0,0.2)",
  border: "none",

  "&:hover": {
    background: "rgba(0,0,0,0.5)",
  },

  variants: {
    position: {
      right: {
        right: 12,
      },
      left: {
        left: 12,
      },
    },
  },
});

export const CardContainer = styled("div", {
  width: "100%",
  border: "1px solid $gray200",
  borderRadius: 8,
  overflow: "hidden",
  background: "white",
  transition: "0.2s",
  cursor: "default",
  "&:hover": {
    borderColor: "$gray300",
  },
});

export const CardImage = styled("img", {
  width: "100%",
  height: 200,
  objectFit: "cover",
});

export const CardImageContainer = styled("div", {
  position: "relative",

  [`& ${CardImageButton}`]: {
    display: "none",
  },

  [`&:hover ${CardImageButton}`]: {
    display: "flex",
  },
});

export const CardImageChevron = styled("svg", {
  color: "white",
  fontSize: 24,
});

export const CardDescription = styled("div", { padding: 20 });
export const CardDescriptionHeader = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid $gray200",
  paddingBottom: 12,
});

export const CardPrice = styled("div", {
  fontSize: "$sm",
  color: "$main600",
  fontWeight: "600",
});

export const CardModel = styled("div", {
  color: "$text500",
  fontSize: "$sm",
});

export const CardInfo = styled("span", {
  fontSize: "$xs",
});

interface Props {
  image: string[];
  model: string;
  price: number;
  brand: string;
  year: number;
  transmission: string;
  mileage: number;
}

const CarCard = (props: Props) => {
  const { image, model, price, brand, transmission, year, mileage } = props;
  const [photo, setPhoto] = useState(0);

  function next() {
    if (photo + 1 < image.length) {
      setPhoto(photo + 1);
    } else {
      setPhoto(0);
    }
  }

  function prev() {
    if (photo === 0) {
      setPhoto(image.length - 1);
    } else {
      setPhoto(photo - 1);
    }
  }

  return (
    <CardContainer>
      <CardImageContainer>
        <CardImage src={image[photo]} />

        {image.length > 1 && (
          <>
            <CardImageButton position={"right"} onClick={next}>
              <CardImageChevron as={BiChevronRight} />
            </CardImageButton>
            <CardImageButton position={"left"} onClick={prev}>
              <CardImageChevron as={BiChevronLeft} />
            </CardImageButton>
          </>
        )}
      </CardImageContainer>
      <CardDescription>
        <CardDescriptionHeader>
          <CardModel>
            {brand} {model}
          </CardModel>
          <CardPrice>{moneyFormatter.format(price)}</CardPrice>
        </CardDescriptionHeader>
        <Stack css={{ gap: 8, paddingTop: 12 }}>
          <CardInfo>{year}</CardInfo>
          <CardInfo>{transmission}</CardInfo>
          <CardInfo>{mileage} Km</CardInfo>
        </Stack>
      </CardDescription>
    </CardContainer>
  );
};

export default CarCard;
