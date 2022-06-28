import { keyframes, styled } from "stitches.config"

const SpinnerAnimation = keyframes({
    from: {
        transform: "rotate(0deg)"
    },
    to: {
        transform: "rotate(360deg)"

    }
})

const LoadingSpinner = styled("div", {
    border: "8px solid $main500",
    width: 50,
    height: 50,
    borderRadius: "100%",
    borderBottomColor: "transparent",
    animation: `1s ${SpinnerAnimation} infinite linear`



})
export default LoadingSpinner 