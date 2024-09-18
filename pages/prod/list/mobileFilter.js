import { useState } from 'react';
import scss from './mobileFilter.module.scss';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import MobileFilterOptions from './MobileFilterOptions';
import MobileSortOptions from './MobileSortOptions';

export default function MobileFilter({ filters, onFilterChange, onSortChange }) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
    setSortOpen(false);
  };

  const toggleSort = () => {
    setSortOpen(!sortOpen);
    setFilterOpen(false);
  };

  const handleFilterChange = (filterOptions) => {
    onFilterChange(filterOptions);
  };

  const handleSortChange = (sortOption) => {
    onSortChange(sortOption);
    setSortOpen(false);
  };

  return (
    <div className={[scss.mobileFilterContainer, 'd-md-none'].join(' ')}>
      <div className={scss.mobileFilterBar}>
        <div onClick={toggleFilter}>
          篩選
          {filterOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
        <div onClick={toggleSort}>
          排序
          {sortOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
      {filterOpen && (
        <div className={scss.filterOptionsContainer}>
          <MobileFilterOptions
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}
      {sortOpen && (
        <div className={scss.sortOptionsContainer}>
          <MobileSortOptions onSortChange={handleSortChange} />
        </div>
      )}
    </div>
  );
}