import React from 'react';
import scss from './MobileSortOptions.module.scss';

export default function MobileSortOptions({ onSortChange }) {
  const sortOptions = [
    { value: 'default', label: '預設排序' },
    { value: 'newest', label: '最新上架' },
    { value: 'price_asc', label: '價格由低到高' },
    { value: 'price_desc', label: '價格由高到低' },
  ];

  return (
    <div className={scss.mobileSortOptions}>
      {sortOptions.map(option => (
        <button 
          key={option.value}
          onClick={() => onSortChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}