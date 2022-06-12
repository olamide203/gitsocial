import React from "react";
import { styled } from "@stitches/react";
import * as LabelPrimitive from "@radix-ui/react-label";

const StyledLabel = styled(LabelPrimitive.Root, {
    fontSize: 15,
    fontWeight: 500,
    // color: "white",
    userSelect: "none",
});

// Exports
export default StyledLabel;
