import { createContext, useReducer } from "react";

const SearchContext = createContext();
const ACTIONS = {
    CHANGE_CATEGORY: "changeCategory",
    UPDATE_FILTER: "updateFilter",
    UPDATE_SEARCH_TERM: "updateSearchTerm",
};
const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.UPDATE_SEARCH_TERM:
            return { ...state, searchTerm: action.payload.searchTerm };
        case ACTIONS.CHANGE_CATEGORY:
            return { ...state, category: action.payload.category };
        case ACTIONS.UPDATE_FILTER:
            const updatedFilters = { ...state.filters, ...action.payload };
            return { ...state, filters: updatedFilters };
        default:
            return state;
    }
};

export function SearchProvider({ children }) {
    const [searchState, dispatch] = useReducer(reducer, {
        searchTerm: "",
        category: "users",
        filters: { username: "", organization: "", language: "" },
    });
    return (
        <SearchContext.Provider value={{ searchState, dispatch }}>
            {children}
        </SearchContext.Provider>
    );
}

export default SearchContext;
