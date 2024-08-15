import { useState, useEffect } from 'react';
import scss from './aside.module.scss';
import Filter from './filter';
import PriceFilter from './priceFilter';

export default function Aside() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // 主分類
  const mainCategories = ['飼料', '罐頭', '零食', '玩具', '外出', '保健'];

  // 子分類映射
  const subCategoryMap = {
    '飼料': ['一般乾糧', '無穀乾糧', '一般凍乾', '無穀凍乾', '功能配方', '處方飼料'],
    '罐頭': ['主食罐', '副食罐', '肉泥罐'],
    '零食': ['肉乾', '餅乾', '潔牙骨'],
    '玩具': ['磨牙玩具', '智力玩具', '互動玩具'],
    '外出': ['外出包', '牽繩', '胸背'],
    '保健': ['腸胃保健', '關節保健', '皮毛保健']
  };

  // 品牌映射
  const brandMap = {
    '飼料': ['ZiwiPeak 巔峰', '汪喵星球', '法國皇家', '飼糧倉'],
    '罐頭': ['ZiwiPeak 巔峰', '汪喵星球', 'Farmina', '柏萊富'],
    '零食': ['汪喵星球', '庫夫', '柏萊富', '飼糧倉'],
    '玩具': ['KONG', 'Nylabone', 'Petmate'],
    '外出': ['Petsfit', 'Petkit', 'IBIYAYA'],
    '保健': ['VetriScience', 'Zesty Paws', 'NaturVet']
  };

  // 處理主分類選擇
  const handleMainCategoryChange = (category) => {
    setSelectedCategory(category);
    setSubCategories(subCategoryMap[category] || []);
    setBrands(brandMap[category] || []);
  };

  // 判斷是否顯示適用年齡篩選器
  const showAgeFilter = ['飼料', '罐頭', '保健'].includes(selectedCategory);

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
              categories={mainCategories} 
              onChange={handleMainCategoryChange}
            />
          </div>
        </div>

        {subCategories.length > 0 && (
          <div className={scss.ractangle}>
            <div className={scss.margin}>
              <div className={scss.header}>
                <h2 className={scss.font}>{selectedCategory}分類</h2>
              </div>
              <Filter categories={subCategories} />
            </div>
          </div>
        )}

        {showAgeFilter && (
          <div className={scss.ractangle}>
            <div className={scss.margin}>
              <div className={scss.header}>
                <h2 className={scss.font}>適用年齡</h2>
              </div>
              <div className={['row', scss.gap].join(" ")}>
                <Filter 
                  categories={['全齡', '幼犬', '成犬', '高齡犬']} 
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
            <PriceFilter />
          </div>
        </div>

        {brands.length > 0 && (
          <div className={scss.ractangle}>
            <div className={scss.margin}>
              <div className={scss.header}>
                <h2 className={scss.font}>品牌</h2>
              </div>
              <Filter categories={brands} multiple={true} />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}