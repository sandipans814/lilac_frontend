import { useState, useEffect } from "react";

const Paginator = ({currPage, totalPages, ...props}) =>{
    return <>
        <nav aria-label="Page navigation">
            <ul className="pagination">
                <li className={`page-item ${currPage === 0 ? "disabled": ""}`}>
                    <a className="page-link" onClick={props.previousHandler}><span aria-hidden="true">&laquo;</span></a>
                </li>
                <li className="page-item active">
                    <a className="page-link">{currPage}</a>
                </li>
                <li className={`page-item ${currPage === totalPages - 1 ? "disabled": ""}`}>
                    <a className="page-link" onClick={props.nextHandler}><span aria-hidden="true">&raquo;</span></a>
                </li>
            </ul>
        </nav>
    </>
}

export default Paginator;