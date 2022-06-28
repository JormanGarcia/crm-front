import { keyframes, styled } from "stitches.config";

const skeletonKeyframes = keyframes({
    "0%": {
        backgroundPosition: "calc(5% - 0px) 0%"
    },
    "100%": {
        backgroundPosition: "calc(20% - 0px) 0%"
    }
})

const Skeleton = styled("div", {
    animation: skeletonKeyframes + " 1200ms infinite",
    background: "linear-gradient(-90deg, #F0F0F0 0%, red 50%, #F0F0F0 100%)",
    backgroundSize: "#400% 400%",
    borderRadius: 4,
    display: "inline-block"
})

export default Skeleton
