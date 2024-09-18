import React, { useState, useEffect, useCallback } from 'react';
import scss from './MobileFilterOptions.module.scss';
import Filter from './filter';
import PriceFilter from './priceFilter';
import { FaFilterCircleXmark } from "react-icons/fa6";

export default function MobileFilterOptions({ onFilterChange }) {
  const [filterOptions, setFilterOptions] = useState({
    categories: {},
    categoryBrands: {},
    allCategories: [],
    priceRange: { min: 0, max: 10000 },
    ages: []
  });
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [resetTrigger, setResetTrigger] = useState(0);

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    try {
      const response = await fetch("http://localhost:3005/api/prod/filter-options");
      const data = await response.json();
      if (data.status === "success") {
        setFilterOptions(data.filterOptions);
      }
    } catch (error) {
      console.error('Error fetching filter options:', error);
    }
  };

  const handleCategoryChange = useCallback((category) => {
    console.log('Category changed:', category);
    setSelectedCategory(category);
    onFilterChange({ category, subcategory: '', brand: '', age: '' });
  }, [onFilterChange]);

  const handleSubcategoryChange = useCallback((subcategory) => {
    console.log('Subcategory changed:', subcategory);
    onFilterChange({ subcategory });
  }, [onFilterChange]);

  const handleBrandChange = useCallback((brand) => {
    console.log('Brand changed:', brand);
    onFilterChange({ brand });
  }, [onFilterChange]);

  const handleAgeChange = useCallback((age) => {
    console.log('Age changed:', age);
    setSelectedAge(age);
    onFilterChange({ age });
  }, [onFilterChange]);

  const handlePriceChange = useCallback((minPrice, maxPrice) => {
    console.log('Price range changed:', minPrice, maxPrice);
    onFilterChange({ minPrice, maxPrice });
  }, [onFilterChange]);

  const clearFilters = useCallback(() => {
    console.log('Filters cleared');
    setSelectedCategory('');
    setResetTrigger(prev => prev + 1);
    onFilterChange({
      category: '',
      subcategory: '',
      brand: '',
      age: '',
      minPrice: filterOptions.priceRange.min,
      maxPrice: filterOptions.priceRange.max
    });
  }, [onFilterChange, filterOptions.priceRange]);

  const showAgeFilter = ['飼料', '罐頭', '保健'].includes(selectedCategory);

  return (
    <div className={scss.mobileFilterOptions}>
      <div className={scss.filterHeader}>
        <h3>篩選</h3>
        <FaFilterCircleXmark size={24} color={"#B9A399"} onClick={clearFilters} style={{ cursor: 'pointer' }} />
      </div>
      <div className={scss.filterSection}>
        <h4>商品分類</h4>
        <div className='row gap-2'>
          <Filter
            categories={filterOptions.allCategories}
            onChange={handleCategoryChange}
            resetTrigger={resetTrigger}
          />
        </div>
      </div>
      {selectedCategory && (
        <div className={scss.filterSection}>
          <h4>子分類</h4>
          <div className='row gap-2'>
            <Filter
              categories={filterOptions.categories[selectedCategory] || []}
              onChange={handleSubcategoryChange}
              resetTrigger={resetTrigger}
            />
          </div>
        </div>
      )}
      {selectedCategory && (
        <div className={scss.filterSection}>
          <h4>品牌</h4>
          <div className='row gap-2'>
            <Filter
              categories={filterOptions.categoryBrands[selectedCategory] || []}
              onChange={handleBrandChange}
            />
          </div>
        </div>
      )}
      {showAgeFilter && (
        <div className={scss.filterSection}>
          <h4>年齡</h4>
          <div className='row gap-2'>
            <Filter
              categories={filterOptions.ages}
              onChange={handleAgeChange}
              resetTrigger={resetTrigger}
            />
          </div>
        </div>
      )}
      <div className={scss.filterSection}>
        <h4>價錢篩選</h4>
        <PriceFilter
          min={filterOptions.priceRange.min}
          max={filterOptions.priceRange.max}
          onChange={handlePriceChange}
          resetTrigger={resetTrigger}
        />
      </div>
    </div>
  );
}