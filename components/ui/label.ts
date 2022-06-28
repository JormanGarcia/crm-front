import { styled } from "stitches.config";

export const Label = styled("label", {
    fontWeight: "500",
    fontSize: 14,

    variants: {
        required: {
            true: {
                "&::after": {
                    content: "*",
                    color: "$main500"
                }
            },
            false: {

            }
        }
    },

    defaultVariants: {
        required: false
    }
});