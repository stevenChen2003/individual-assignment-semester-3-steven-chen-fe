import React from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
 const MAX_VISIBLE_PAGES = 5;
 const startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
 const endPage = Math.min(startPage + MAX_VISIBLE_PAGES - 1, totalPages);

 const items = [];

 if (startPage > 1) {
   items.push(<Pagination.Prev key="prev" onClick={() => onPageChange(currentPage)} />);
 }

 for (let i = startPage; i <= endPage; i++) {
   items.push(
     <Pagination.Item key={i} active={i === currentPage + 1} onClick={() => onPageChange(i)}>
       {i}
     </Pagination.Item>
   );
 }

 if (endPage < totalPages) {
   items.push(<Pagination.Next key="next" onClick={() => onPageChange(currentPage + 2)} />);
 }

 return <Pagination>{items}</Pagination>;
};

export default PaginationComponent;