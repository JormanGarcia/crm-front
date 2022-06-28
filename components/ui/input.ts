import React from 'react'
import { styled } from 'stitches.config'

const Input = styled("input", {
    padding: "8px 12px",
    fontSize: "$sm",
    color: '$text500',
    border: "none",
    width: "100%",

    "&:focus-visible": {
        border: "none",
        outline: "none"
    },

})
export default Input