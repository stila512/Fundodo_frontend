import React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import scss from '@/pages/article/list/pageBtn.module.scss';

export default function PageBtn({ page, totalPages, onPageChange }) {
  const getPaginationItems = () => {
    const items = [];
    const maxPagesToShow = 7;
    const sidePages = 2;

    items.push(1);
    if (page > sidePages + 2) {
      items.push('...');
    }

    let start = Math.max(2, page - sidePages);
    let end = Math.min(totalPages - 1, page + sidePages);

    if (end - start + 3 > maxPagesToShow) {
      if (page - start > end - page) {
        start = Math.max(2, end - maxPagesToShow + 3);
      } else {
        end = Math.min(totalPages - 1, start + maxPagesToShow - 3);
      }
    }

    for (let i = start; i <= end; i++) {
      items.push(i);
    }

    if (end < totalPages - 1) {
      items.push('...');
    }

    if (totalPages > 1) {
      items.push(totalPages);
    }

    return items;
  };

  const handlePageChange = (newPage) => {
    onPageChange(newPage);
    // 滾動到頁面頂部
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <div className={scss.pagination}>
      <button
        onClick={() => handlePageChange(page - 1)}
        className={`${scss.myButton} ${page === 1 ? scss.disabled : ''}`}
        disabled={page === 1}
      >
        <IoIosArrowBack size={24} />
      </button>
      {getPaginationItems().map((item, index) => (
        item === '...' ? (
          <span key={index} className={scss.ellipsis}>...</span>
        ) : (
          <button
            key={index}
            onClick={() => handlePageChange(item)}
            className={`${scss.myButton} ${page === item ? scss.activePage : ''}`}
          >
            {item}
          </button>
        )
      ))}
      <button
        onClick={() => handlePageChange(page + 1)}
        className={`${scss.myButton} ${page === totalPages ? scss.disabled : ''}`}
        disabled={page === totalPages}
      >
        <IoIosArrowForward size={24} />
      </button>
    </div>
  );
}