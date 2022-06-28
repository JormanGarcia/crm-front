import { styled } from "stitches.config"

const Badge = styled("div", {
    padding: "4px 6px",
    display: "flex",
    width: "fit-content",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "$xs",
    fontWeight: 500,
    letterSpacing: "-1%",
    borderRadius: 2,
    variants: {
        variant: {
            green: {
                background: "$green200",
                color: "$green700"
            },
            gray: {
                background: "$gray200",
                color: "$main900"

            }
        }
    },

    defaultVariants: {
        variant: "gray"
    }
})

export default Badge