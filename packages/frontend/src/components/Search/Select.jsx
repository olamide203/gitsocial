import React, { useContext } from "react";
import * as Select from "@radix-ui/react-select";
import { styled } from "@stitches/react";
import {
    CheckIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from "@radix-ui/react-icons";
import SearchContext from "../../context/SearchContext";

const StyledTrigger = styled(Select.Trigger, {
    all: "unset",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    padding: "0 15px",
    fontSize: 13,
    lineHeight: 1,
    height: 35,
    gap: 5,
    backgroundColor: "#191D24",
    // color: violet.violet11,
    color: "#f9fafb",
    // boxShadow: `0 2px 10px ${blackA.blackA7}`,
    "&:hover": { backgroundColor: "#191D24" },
    "&:focus": { boxShadow: `0 0 0 2px black` },
});
const StyledContent = styled(Select.Content, {
    overflow: "hidden",
    backgroundColor: "white",
    borderRadius: 6,
    boxShadow:
        "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
});
const StyledViewport = styled(Select.Viewport, {
    padding: 5,
});

const StyledItem = styled(Select.Item, {
    all: "unset",
    fontSize: 13,
    lineHeight: 1,
    color: "#000",
    borderRadius: 3,
    display: "flex",
    alignItems: "center",
    height: 25,
    padding: "0 35px 0 25px",
    position: "relative",
    userSelect: "none",

    // "&[data-disabled]": {
    //     color: mauve.mauve8,
    //     pointerEvents: "none",
    // },

    "&:focus": {
        backgroundColor: "#2A303C",
        color: "white",
    },
});

const StyledLabel = styled(Select.Label, {
    padding: "0 25px",
    fontSize: 12,
    lineHeight: "25px",
    // color: mauve.mauve11,
});

const StyledItemIndicator = styled(Select.ItemIndicator, {
    position: "absolute",
    left: 0,
    width: 25,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
});

const scrollButtonStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 25,
    backgroundColor: "white",
    // color: violet.violet11,
    cursor: "default",
};

const StyledScrollUpButton = styled(Select.ScrollUpButton, scrollButtonStyles);

const StyledScrollDownButton = styled(
    Select.ScrollDownButton,
    scrollButtonStyles
);

export default () => {
    const { searchState, dispatch } = useContext(SearchContext);

    const changeCategory = (value) => {
        console.log(value);
        dispatch({ type: "changeCategory", payload: { category: value } });
    };
    return (
        <Select.Root
            value={searchState.category}
            onValueChange={changeCategory}
        >
            <StyledTrigger
                aria-label="user"
                className=" capitalize btn bg-[#2A303C] btn-sm h-10 rounded-sm items-center justify-content-center"
            >
                <Select.Value aria-label="category">
                    {searchState.category}
                </Select.Value>

                <Select.Icon>
                    <ChevronDownIcon />
                </Select.Icon>
            </StyledTrigger>
            <StyledContent>
                <StyledScrollUpButton>
                    <ChevronUpIcon />
                </StyledScrollUpButton>

                <StyledViewport>
                    <Select.Group>
                        <StyledLabel>category</StyledLabel>

                        <StyledItem value="users">
                            <Select.ItemText>users</Select.ItemText>

                            <StyledItemIndicator>
                                <CheckIcon />
                            </StyledItemIndicator>
                        </StyledItem>
                        <StyledItem value="repositories">
                            <Select.ItemText>repositories</Select.ItemText>

                            <StyledItemIndicator>
                                <CheckIcon />
                            </StyledItemIndicator>
                        </StyledItem>
                    </Select.Group>
                    <Select.Separator />
                </StyledViewport>

                <StyledScrollDownButton />
            </StyledContent>
        </Select.Root>
    );
};
