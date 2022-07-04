import { createStitches } from '@stitches/react';

export const { styled, getCssText, globalCss, keyframes, theme } = createStitches({
    theme: {
        fonts: {
            system: 'system-ui',
            sans: "'DM Sans', sans-serif"
        },
        colors: {
            main200: "#EBEBFF",
            main500: "#6663FD",
            main600: "#4946E7",
            main700: "#4D5B7D",
            main900: "#293452",
            main950: "#182135",

            gray200: "#F0F2F7",
            gray300: "#D2D7E3",
            gray400: "#BAC0CF",

            text400: "#7D8AAA",
            text500: "#182135",

            green200: "#E5FEEC",
            green700: "#415747",

            red500: "#C3251B"
        },
        fontSizes: {
            sm: '12.8px',
            md: '16px',
            xs: '10.2px',
            lg: "20px",
            xl: "25px",
            "2xl": "32px"
        },
    },
});