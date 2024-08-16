import { useState, useEffect } from 'react';
import scss from './aside.module.scss';
import Filter from './filter';
import PriceFilter from './priceFilter';

export default function Aside() {
  // 設定按鈕區域
  const [filterOptions, setFilterOptions] = useState({
    categories: {},
    categoryBrands: {},
    allCategories: [],
    priceRange: { min: 0, max: 10000 }
  });

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  //儲存篩選條件
  const [filters, setFilters] = useState({
    category: '',
    subcategory: '',
    brand: '',
    priceRange: { min: 0, max: Infinity }
  });

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const fetchFilterOptions = async () => {
    try {
      const URL = "http://localhost:3005/api/prod/filter-options"
      const res = await fetch(URL);
      const data = await res.json();
      if (data.status === "success") {
        setFilterOptions(data.filterOptions);
      }
      console.log(data.filterOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMainCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategories([]);
    setSelectedBrands([]);
  };

  return (
    <aside className={['col-3', scss.rwd].join(' ')}>
      <h2 className={[scss.mb, scss.font].join(' ')}>篩選</h2>
      <div className={scss.filters}>
        <div className={scss.ractangle}>
          <div className={scss.margin}>
            <div className={scss.header}>
              <h2 className={scss.font}>商品分類</h2>
            </div>
            <Filter
              categories={filterOptions.allCategories}
              onChange={handleMainCategoryChange}
            />
          </div>
        </div>

        {selectedCategory && filterOptions.categories[selectedCategory] && (
          <div className={scss.ractangle}>
            <div className={scss.margin}>
              <div className={scss.header}>
                <h2 className={scss.font}>{selectedCategory}分類</h2>
              </div>
              <Filter 
                categories={filterOptions.categories[selectedCategory]}
                onChange={setSelectedSubCategories}
                multiple={true}
              />
            </div>
          </div>
        )}

        {selectedCategory && (
          <div className={scss.ractangle}>
            <div className={scss.margin}>
              <div className={scss.header}>
                <h2 className={scss.font}>品牌</h2>
              </div>
              <div className='row gap-2'>
              <Filter 
                categories={filterOptions.categoryBrands[selectedCategory] || []}
                onChange={setSelectedBrands}
                multiple={true}
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
            />
          </div>
        </div>
      </div>
    </aside>
  );
}