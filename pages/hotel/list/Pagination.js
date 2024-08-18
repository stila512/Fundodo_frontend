import React from 'react';
import styles from './Pagination.module.scss';

const Pagination = ({ hotelsPerPage, totalHotels, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalHotels / hotelsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.pagination}>
      <ul >
        {pageNumbers.map(number => (
          <li key={number} className={currentPage === number ? styles.active : ''}>
            <a onClick={() => paginate(number)} href="#!">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
