import React from 'react'
import { styled } from 'stitches.config'

const IconButton = styled("button", {
    cursor: "pointer",
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 20,
    borderRadius: 4,
    color: "$font500",
    width: 30,
    height: 30,
    padding: -5,
    "&:focus": {
        outline: "none",
    },

    variants: {
        variant: {
            ghost: {
                background: "transparent",
                "&:hover": {
                    background: "$gray200"

                }
            },
            secondary: {
                background: "$gray200",
                "&:hover": {
                    background: "$gray300"

                }
            }
        }
    },

    defaultVariants: {
        variant: "secondary"
    }
})

export default IconButton