import React from "react";
import ReactPagniate from "react-paginate";
import "react-loading-skeleton/dist/skeleton.css";

function Pagination({ onPageChange, pageCount, currentPage }) {
    return (
        <ReactPagniate
            pageRangeDisplayed={3}
            pageCount={pageCount}
            breakLabel="..."
            nextLabel="»"
            previousLabel="«"
            renderOnZeroPageCount={null}
            onPageChange={onPageChange}
            forcePage={currentPage - 1}
            marginPagesDisplayed={2}
            containerClassName="btn-group"
            pageClassName="pagination-btn"
            pageLinkClassName="w-10 aspect-square m-0 grid items-center"
            activeClassName="bg-blue-600"
            previousClassName="pagination-btn inline-flex rounded-l-lg"
            nextClassName="pagination-btn inline-flex rounded-r-lg"
            breakClassName="pagination-btn inline-flex"
            breakLinkClassName="w-10 aspect-square m-0 grid items-center"
            nextLinkClassName="w-10 aspect-square m-0 grid items-center"
            previousLinkClassName="w-10 aspect-square m-0 grid items-center"
        />
    );
}

export default Pagination;
