import React from 'react'
import { styled } from 'stitches.config'

const InputContainer = styled("div", {
    border: "1px solid $gray400",
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    outline: "0px solid #BCBBFF",
    transition: ".1s outline",
    overflow: "hidden",


    "&:focus-within": {
        border: "1px solid $main500",
        outline: "3px solid #BCBBFF"
    }
})

export default InputContainer