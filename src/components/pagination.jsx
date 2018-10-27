import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
const Pagination = (props) => {
    const {pageSize, itemsCount, currentPage, onPageChange} = props;
    const pagesNumber = Math.ceil(itemsCount / pageSize);
    const pages = _.range(1, pagesNumber + 1)

  
    if(pagesNumber === 1) return null;
    return (
        <nav>
        <ul className="pagination">
        {pages.map(page => 
            <li  key = {page} 
            className= {page === currentPage ? "page-item active" : "page-item"}>
            <a onClick = {()=>onPageChange(page)}
            className="page-link">{page}</a></li>
            )}
        </ul>
    </nav>

    )
}
Pagination.propTypes = {
    pageSize : PropTypes.number.isRequired,
    itemsCount : PropTypes.number.isRequired,
    currentPage : PropTypes.number.isRequired,
    onPageChange : PropTypes.func.isRequired
}
export default Pagination;