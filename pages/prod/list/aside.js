import { useState, useEffect, useCallback } from 'react';
import scss from './aside.module.scss';
import Filter from './filter';
import PriceFilter from './priceFilter';
import { FaFilterCircleXmark } from "react-icons/fa6";

export default function Aside({ onFilterChange, className, filters }) {
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
    setSelectedCategory(category);
    onFilterChange({ category, subcategory: '', brand: '', age: '' });
  }, [onFilterChange]);

  const handleSubcategoryChange = useCallback((subcategory) => {
    onFilterChange({ subcategory });
  }, [onFilterChange]);

  const handleBrandChange = useCallback((brand) => {
    onFilterChange({ brand });
  }, [onFilterChange]);

  const handleAgeChange = useCallback((age) => {
    setSelectedAge(age);
    onFilterChange({ age });
  }, [onFilterChange]);

  const handlePriceChange = useCallback((minPrice, maxPrice) => {
    onFilterChange({ minPrice, maxPrice });
  }, [onFilterChange]);

   // 新增清除篩選的函數
   const clearFilters = useCallback(() => {
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

  const showAgeFilter = ['飼料', '罐頭', '保健'].includes(filters.category);

  return (
    <aside className={[scss.rwd, className].join(' ')}>
      <div className={['hstack', scss.mb, 'jc-between'].join(' ')}>
        <h2 className={scss.font}>篩選</h2>
        <FaFilterCircleXmark size={30} color={"#B9A399"} onClick={clearFilters} style={{cursor:'pointer'}}/>
      </div>
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
                resetTrigger={resetTrigger}
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
                  resetTrigger={resetTrigger}
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
        {showAgeFilter && (
          <div className={scss.ractangle}>
            <div className={scss.margin}>
              <div className={scss.header}>
                <h2 className={scss.font}>年齡</h2>
              </div>
              <div className='row gap-2 mt-3'>
                <Filter
                  categories={filterOptions.ages}
                  onChange={handleAgeChange}
                  resetTrigger={resetTrigger}
                  selected={selectedAge}
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
              resetTrigger={resetTrigger}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}