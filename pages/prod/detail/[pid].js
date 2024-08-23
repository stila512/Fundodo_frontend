import scss from './pid.module.scss';
import Head from 'next/head';
import DefaultLayout from '@/components/layout/default';
import Breadcrumb from '../list/breadcrumb';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { NumberPanel } from '@/components/buttons/NumberPanel';
import Recommend from './recommend';
import FavoriteIcon from '../list/favoriteIcon';
import ProductImages from './productImages';
import Toggle from './toggle';

export default function Pid() {
  const router = useRouter();

  // 初始化產品狀態
  const [product, setProduct] = useState({
    id: 0,
    name: "",
    brand: "",
    cate_1: "",
    cate_2: "",
    is_near_expired: 0,
    is_refurbished: 0,
    description: "",
    picNameArr: [],
    sortArr: [],
    specArr: [],
    priceArr: [],
    stockArr: []
  });

  // 用戶選擇的類別、規格和價格狀態
  const [selectedSort, setSelectedSort] = useState(null);
  const [selectedSpec, setSelectedSpec] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);

  // 獲取產品數據的異步函數
  const getProduct = async (id) => {
    const URL = `http://localhost:3005/api/prod/${id}`;
    try {
      const res = await fetch(URL);
      const data = await res.json();
      const productData = data.product;
      setProduct(productData);

      // 初始化選擇和價格
      initializeSelectionAndPrice(productData);
    } catch (error) {
      console.error('獲取產品數據失敗:', error);
    }
  };

  // 初始化選擇和價格
  const initializeSelectionAndPrice = (productData) => {
    if (productData.sortArr.length === 0 && productData.specArr.length === 0) {
      // 沒有類別和規格，直接設置價格
      setSelectedPrice(productData.priceArr[0]);
    } else if (productData.sortArr.length > 0 && productData.specArr.length === 0) {
      // 只有類別，沒有規格
      setSelectedSort(productData.sortArr[0]);
      setSelectedPrice(productData.priceArr[0]);
    } else if (productData.sortArr.length === 0 && productData.specArr.length > 0) {
      // 只有規格，沒有類別
      setSelectedSpec(productData.specArr[0]);
      setSelectedPrice(productData.priceArr[0]);
    } else if (productData.sortArr.length === 1 && productData.specArr.length === 1) {
      // 只有一種類別和一種規格
      setSelectedSort(productData.sortArr[0]);
      setSelectedSpec(productData.specArr[0]);
      setSelectedPrice(productData.priceArr[0]);
    }
    // 其他情況（多種類別或規格）不自動選擇，等待用戶操作
  };

  // 當路由準備好且有 pid 參數時，獲取產品數據
  useEffect(() => {
    if (router.isReady && router.query.pid) {
      getProduct(router.query.pid);
    }
  }, [router.isReady, router.query.pid]);

  // 處理類別選擇
  const handleSortSelection = (sort) => {
    setSelectedSort(sort);
    setSelectedSpec(null);
    updatePrice(sort, null);
  };

  // 處理規格選擇
  const handleSpecSelection = (spec) => {
    setSelectedSpec(spec);
    updatePrice(selectedSort, spec);
  };

  // 更新價格
  const updatePrice = (sort, spec) => {
    let index = -1;
    if (product.sortArr.length > 0 && product.specArr.length > 0) {
      // 有類別和規格
      index = product.sortArr.findIndex((s, i) => s === sort && product.specArr[i] === spec);
    } else if (product.sortArr.length > 0) {
      // 只有類別
      index = product.sortArr.indexOf(sort);
    } else if (product.specArr.length > 0) {
      // 只有規格
      index = product.specArr.indexOf(spec);
    }
    
    if (index !== -1) {
      setSelectedPrice(product.priceArr[index]);
    } else {
      setSelectedPrice(null);
    }
  };

  // 檢查某個類別是否缺貨
  const isOutOfStock = (sort) => {
    const indices = product.sortArr.reduce((acc, curr, index) => {
      if (curr === sort) acc.push(index);
      return acc;
    }, []);
    return indices.every(index => product.stockArr[index] === "0");
  };

  // 獲取特定類別的可用規格
  const getSpecsForSort = (sort) => {
    return [...new Set(product.specArr.filter((_, index) => product.sortArr[index] === sort))];
  };

  // 渲染價格
  const renderPrice = () => {
    if (selectedPrice !== null) {
      return `NT$ ${selectedPrice}`;
    } else if (product.priceArr.length === 1) {
      return `NT$ ${product.priceArr[0]}`;
    } else {
      return '請選擇選項';
    }
  };

  return (
    <>
      <Head>
        <title>{product.name}</title>
        <meta name="description" content={product.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='container'>
        <h1 className={[scss.shade3, 'd-none', 'd-lg-block'].join(' ')}>{product.name}</h1>
        <div className='mt-3'>
          <Breadcrumb />
        </div>
        <div>
          <div className={[scss.detailGroup, 'row'].join(' ')}>
            <div className={['col-lg-6', 'col-12'].join(' ')}>
              <ProductImages picNameArr={product.picNameArr} />
            </div>
            <div className='col-lg-6 col-12'>
              <div className={scss.headerGrid}>
                <h3 className={scss.header}>{product.name}</h3>
                <FavoriteIcon className={scss.handleFavIcon} size={24} style={{ color: '#B9A399' }} />
              </div>
              <hr className='bg-primary' />
              {product.sortArr.length > 0 && (
                <div className={scss.btnGroup}>
                  <p className={['text-nowrap', scss.p].join(' ')}>類別</p>
                  <div className='d-flex gap-3 flex-wrap'>
                    {[...new Set(product.sortArr)].map((sort, index) => (
                      <label
                        key={index}
                        className={`${scss.radio} ${selectedSort === sort ? scss.selected : ''} ${isOutOfStock(sort) ? scss.btnDisable : ''}`}
                      >
                        <input
                          type="radio"
                          className={scss.hidden}
                          checked={selectedSort === sort}
                          onChange={() => handleSortSelection(sort)}
                          disabled={isOutOfStock(sort)}
                        />
                        <span>{sort}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              {(product.specArr.length > 0 && (!product.sortArr.length || selectedSort)) && (
                <div className={scss.btnGroup}>
                  <p className={['text-nowrap', scss.p].join(' ')}>規格</p>
                  <div className='d-flex gap-3 flex-wrap'>
                    {(product.sortArr.length ? getSpecsForSort(selectedSort) : product.specArr).map((spec, index) => (
                      <label
                        key={index}
                        className={`${scss.radio} ${selectedSpec === spec ? scss.selected : ''}`}
                      >
                        <input
                          type="radio"
                          className={scss.hidden}
                          checked={selectedSpec === spec}
                          onChange={() => handleSpecSelection(spec)}
                        />
                        <span>{spec}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
              <hr className={[scss.mt, 'bg-primary'].join(' ')} />
              <div className={scss.priceGroup}>
                <span className={scss.price}>{renderPrice()}</span>
              </div>
              <div className={['gap-3', 'd-flex', scss.mt].join(' ')}>
                <span className={[scss.cs3, 'd-none', 'd-lg-block'].join(' ')}>數量</span>
                <NumberPanel className={scss.NumberPanel} quantity={0} />
                <div className={scss.fixed}>
                  <button className={scss.btnSubmit} type='submit' disabled={!selectedPrice && product.priceArr.length !== 1}>加入購物車</button>
                  <FavoriteIcon className={scss.mbFavIcon} size={28} />
                </div>
              </div>
            </div>
          </div>
          <Toggle />
          <Recommend currentProductId={product.id} currentProductCategory={product.cate_1}/>
        </div>
      </main>
    </>
  );
}

Pid.layout = DefaultLayout;