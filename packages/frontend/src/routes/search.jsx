import { useContext, useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import SearchForm from "../components/Search/Form";
import SearchContext from "../context/SearchContext";
import User from "../components/User/User";
import Repository from "../components/Repository/Repository";
import Pagination from "../components/Pagination";
import RepoSkeleton from "../components/Repository/RepoSkeleton";

const constructQuery = (filters) => {
  const { organization, username, ...rest } = filters;
  const modifiedFilters = { ...rest, org: organization, user: username };
  return Object.entries(modifiedFilters).reduce((acc, [key, value]) => {
    if (!value) {
      return acc;
    }
    return acc + encodeURIComponent(` ${key}:${value}`);
  }, "");
};

function Search() {
  return (
    <div className="p-4 sm:p-10 text-white h-screen overflow-scroll">
      <SearchForm />
    </div>
  );
}

export default Search;
