
import React from 'react'
import { styled } from 'stitches.config'

const Typography = styled("p", {
    color: "$text500",
    variants: {
        size: {
            sm: {
                fontSize: "$sm"
            },
            md: {
                fontSize: "$md"
            },
            xs: {
                fontSize: "$xs"
            },

            lg: {
                fontSize: "$lg"
            },

            xl: {
                fontSize: "$xl"
            },

            "2xl": {
                fontSize: "$2xl"
            }
        },
        weight: {
            medium: {
                fontWeight: 500
            },
            normal: {
                fontWeight: 400
            },
            bold: {
                fontWeight: 700
            }
        }
    },
    defaultVariants: {
        size: "md",
        weight: "normal"
    }
})

export default Typography