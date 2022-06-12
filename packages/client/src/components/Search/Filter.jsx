import React, { useContext } from "react";
import { styled } from "@stitches/react";
import Label from "./Label";
import SearchContext from "../../context/SearchContext";
const Fieldset = styled("fieldset", {
    all: "unset",
    display: "flex",
    gap: 20,
    alignItems: "center",
});

const Filter = ({ name }) => {
    const { searchState, dispatch } = useContext(SearchContext);
    const handleChange = (e) => {
        const action = { type: "updateFilter", payload: {} };
        action.payload[name] = e.target.value;
        dispatch(action);
    };
    return (
        <Fieldset>
            <Label htmlFor={name}>{name}</Label>

            <input
                type="text"
                placeholder=""
                id={name}
                value={searchState.filters[name]}
                onChange={handleChange}
                className="input input-bordered rounded-sm input-sm w-full max-w-xs"
            />
        </Fieldset>
    );
};

export default Filter;
