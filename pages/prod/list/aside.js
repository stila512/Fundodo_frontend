import React, { useState, useEffect, useCallback } from 'react';
import scss from './aside.module.scss';
import Filter from './filter';
import PriceFilter from './priceFilter';

export default function Aside({ onFilterChange, className }) {
  const [filterOptions, setFilterOptions] = useState({
    categories: {},
    categoryBrands: {},
    allCategories: [],
    priceRange: { min: 0, max: 10000 }
  });
  const [selectedCategory, setSelectedCategory] = useState('');

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
    setSelectedCategory(category);
    onFilterChange({ category, subcategory: '', brand: '' });
  }, [onFilterChange]);

  const handleSubcategoryChange = useCallback((subcategory) => {
    onFilterChange({ subcategory });
  }, [onFilterChange]);

  const handleBrandChange = useCallback((brand) => {
    onFilterChange({ brand });
  }, [onFilterChange]);

  const handlePriceChange = useCallback((minPrice, maxPrice) => {
    onFilterChange({ minPrice, maxPrice });
  }, [onFilterChange]);

  return (
    <aside className={['col-3', scss.rwd, className].join(' ')}>
      <h2 className={[scss.mb, scss.font].join(' ')}>篩選</h2>
      <div className={scss.filters}>
        <div className={scss.ractangle}>
          <div className={scss.margin}>
            <div className={scss.header}>
              <h2 className={scss.font}>商品分類</h2>
            </div>
            <div className='d-flex flex-col gap-2 mt-3'>
              <Filter
                categories={filterOptions.allCategories}
                onChange={handleCategoryChange}
              />
            </div>
          </div>
        </div>
        {selectedCategory && (
          <div className={scss.ractangle}>
            <div className={scss.margin}>
              <div className={scss.header}>
                <h2 className={scss.font}>子分類</h2>
              </div>
              <div className='row gap-2 mt-3'>
                <Filter
                  categories={filterOptions.categories[selectedCategory] || []}
                  onChange={handleSubcategoryChange}
                />
              </div>
            </div>
          </div>
        )}
        {selectedCategory && (
          <div className={scss.ractangle}>
            <div className={scss.margin}>
              <div className={scss.header}>
                <h2 className={scss.font}>品牌</h2>
              </div>
              <div className='row gap-2 mt-3'>
                <Filter
                  categories={filterOptions.categoryBrands[selectedCategory] || []}
                  onChange={handleBrandChange}
                />
              </div>
            </div>
          </div>
        )}
        <div className={scss.ractangle}>
          <div className={scss.margin}>
            <div className={scss.header}>
              <h2 className={scss.font}>價錢篩選</h2>
            </div>
            <PriceFilter
              min={filterOptions.priceRange.min}
              max={filterOptions.priceRange.max}
              onChange={handlePriceChange}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}