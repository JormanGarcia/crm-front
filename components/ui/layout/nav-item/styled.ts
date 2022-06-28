import { styled } from "../../../../stitches.config";

export const Container = styled("div", {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    cursor: "pointer",
    borderRadius: 4,

    variants: {
        active: {
            true: {
                background: "$main500",
                ["& svg, & span"]: {
                    color: "White",
                    fill: "White",
                },

            },
            false: {
                ["& svg, & span"]: {
                    color: "$text400",
                    fill: "$text400",
                },

                ["&:hover svg, &:hover span"]: {
                    color: "$text500",
                    fill: "$text500",
                },
            }
        },
        isChildren: {
            true: {
                padding: "16px 24px",
            }
        }
    },

});

export const Title = styled("span", {
    fontSize: "$sm",
    fontWeight: 500,
    letterSpacing: "3.5%",
    userSelect: "none"
});

export const LeftStack = styled("div", {
    display: "flex",
    alignItems: "center",
    gap: 24
});

export const ItemIcon = styled("svg", {
    fontSize: 24
})

export const ChevronIcon = styled(ItemIcon, {
    fontSize: 26,
    variants: {
        open: {
            true: {
                transform: "rotate(180deg)"
            }, false: {
                transform: "rotate(0deg)"
            }
        }
    }
})