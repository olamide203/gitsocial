import React from "react";
import { styled, keyframes } from "@stitches/react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

const slideUpAndFade = keyframes({
    "0%": { opacity: 0, transform: "translateY(2px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
    "0%": { opacity: 0, transform: "translateX(-2px)" },
    "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
    "0%": { opacity: 0, transform: "translateY(-2px)" },
    "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
    "0%": { opacity: 0, transform: "translateX(2px)" },
    "100%": { opacity: 1, transform: "translateX(0)" },
});

const StyledContent = styled(TooltipPrimitive.Content, {
    borderRadius: 4,
    padding: "10px 15px",
    textTransform: "capitalize",
    fontSize: 15,
    lineHeight: 1,
    backgroundColor: "#1f2937",
    color: "white",
    boxShadow:
        "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
    "@media (prefers-reduced-motion: no-preference)": {
        animationDuration: "400ms",
        animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        animationFillMode: "forwards",
        willChange: "transform, opacity",
        '&[data-state="delayed-open"]': {
            '&[data-side="top"]': { animationName: slideDownAndFade },
            '&[data-side="right"]': { animationName: slideLeftAndFade },
            '&[data-side="bottom"]': { animationName: slideUpAndFade },
            '&[data-side="left"]': { animationName: slideRightAndFade },
        },
    },
});

const StyledArrow = styled(TooltipPrimitive.Arrow, {
    fill: "#1f2937",
});

function Tooltip({ element, tip, side, sideOffset }) {
    return (
        <TooltipPrimitive.Root>
            <TooltipPrimitive.Trigger>{element}</TooltipPrimitive.Trigger>
            <StyledContent sideOffset={sideOffset} side={side}>
                {tip}
                <StyledArrow />
            </StyledContent>
        </TooltipPrimitive.Root>
    );
}
Tooltip.defaultProps = {
    side: "bottom",
    sideOffset: 5,
};
export default Tooltip;
