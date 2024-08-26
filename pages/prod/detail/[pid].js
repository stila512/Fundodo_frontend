import scss from './pid.module.scss';
import Head from 'next/head';
import DefaultLayout from '@/components/layout/default';
import Breadcrumb from '../list/breadcrumb';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { NumberPanel } from '@/components/buttons/NumberPanel';
import Recommend from './recommend';
import FavoriteIcon from '../list/favoriteIcon';
import ProductImages from './productImages';
import Table from './table';
import Link from 'next/link';

export default function Pid() {
  const { user, loading } = useContext(AuthContext);

  const router = useRouter();

  const [product, setProduct] = useState({
    id: 0,
    name: "",
    brand: "",
    cate_1: "",
    cate_2: "",
    is_near_expired: 0,
    is_refurbished: 0,
    description: "",
    pidArr: [],
    picNameArr: [],
    sortArr: [],
    specArr: [],
    priceArr: [],
    stockArr: []
  });

  const [selectedSort, setSelectedSort] = useState(null);
  const [selectedSpec, setSelectedSpec] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [maxQuantity, setMaxQuantity] = useState(0);

  const getProduct = async (id) => {
    const URL = `http://localhost:3005/api/prod/${id}`;
    try {
      const res = await fetch(URL);
      const data = await res.json();
      const productData = data.product;
      setProduct(productData);
      initializeSelectionAndPrice(productData);
    } catch (error) {
      console.error('獲取產品數據失敗:', error);
    }
  };

  const initializeSelectionAndPrice = (productData) => {
    if (productData.sortArr.length === 0 && productData.specArr.length === 0) {
      setSelectedPrice(productData.priceArr[0]);
      setMaxQuantity(parseInt(productData.stockArr[0]));
    } else if (productData.sortArr.length > 0 && productData.specArr.length === 0) {
      setSelectedSort(productData.sortArr[0]);
      setSelectedPrice(productData.priceArr[0]);
      setMaxQuantity(parseInt(productData.stockArr[0]));
    } else if (productData.sortArr.length === 0 && productData.specArr.length > 0) {
      setSelectedSpec(productData.specArr[0]);
      setSelectedPrice(productData.priceArr[0]);
      setMaxQuantity(parseInt(productData.stockArr[0]));
    } else if (productData.sortArr.length === 1 && productData.specArr.length === 1) {
      setSelectedSort(productData.sortArr[0]);
      setSelectedSpec(productData.specArr[0]);
      setSelectedPrice(productData.priceArr[0]);
      setMaxQuantity(parseInt(productData.stockArr[0]));
    }
  };

  useEffect(() => {
    if (router.isReady && router.query.pid) {
      getProduct(router.query.pid);
    }
  }, [router.isReady, router.query.pid]);

  const handleSortSelection = (sort) => {
    setSelectedSort(sort);
    setSelectedSpec(null);
    updatePrice(sort, null);
  };

  const handleSpecSelection = (spec) => {
    setSelectedSpec(spec);
    updatePrice(selectedSort, spec);
  };

  const updatePrice = (sort, spec) => {
    let index = -1;
    if (product.sortArr.length > 0 && product.specArr.length > 0) {
      index = product.sortArr.findIndex((s, i) => s === sort && product.specArr[i] === spec);
    } else if (product.sortArr.length > 0) {
      index = product.sortArr.indexOf(sort);
    } else if (product.specArr.length > 0) {
      index = product.specArr.indexOf(spec);
    }

    if (index !== -1) {
      setSelectedPrice(product.priceArr[index]);
      setMaxQuantity(parseInt(product.stockArr[index]));
      setQuantity(1); // Reset quantity when selection changes
    } else {
      setSelectedPrice(null);
      setMaxQuantity(0);
      setQuantity(0);
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= maxQuantity) {
      setQuantity(newQuantity);
    }
  };

  const isOutOfStock = (sort) => {
    const indices = product.sortArr.reduce((acc, curr, index) => {
      if (curr === sort) acc.push(index);
      return acc;
    }, []);
    return indices.every(index => product.stockArr[index] === "0");
  };

  const getSpecsForSort = (sort) => {
    return [...new Set(product.specArr.filter((_, index) => product.sortArr[index] === sort))];
  };

  const renderPrice = () => {
    if (selectedPrice !== null) {
      return `NT$ ${selectedPrice}`;
    } else if (product.priceArr.length === 1) {
      return `NT$ ${product.priceArr[0]}`;
    } else {
      return '請選擇選項';
    }
  };

  const handleAddToCart = async () => {
    if (loading) {
      // 如果 AuthContext 還在加載中，等待
      return;
    }

    if (!selectedSort || !selectedSpec || !quantity) {
      alert('請選擇商品選項和數量');
      return;
    }

    const selectedIndex = product.sortArr.findIndex((sort, index) =>
      sort === selectedSort && product.specArr[index] === selectedSpec
    );

    if (selectedIndex === -1) {
      alert('無法找到選定的商品選項');
      return;
    }

    const productData = {
      user_id: 13,  // 假設用戶ID為13，實際應用中應該從用戶會話或狀態中獲取
      buy_sort: "PD",
      buy_id: product.pidArr[selectedIndex],
      quantity: quantity
    };

    try {
      const response = await fetch('http://localhost:3005/api/prod/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(productData)
      });

      const result = await response.json();

      if (result.status === "success") {
        alert('已成功加入購物車');
        // 可以在這裡添加更新購物車顯示的邏輯
      } else {
        alert('加入購物車失敗: ' + result.message);
      }
    } catch (error) {
      console.error('加入購物車失敗:', error);
      alert('加入購物車失敗，請稍後再試');
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
        <div className='mt-3 d-flex'>
          <Breadcrumb />
          <Link className={['text-nowrap', scss.backBtn].join(' ')} href='http://localhost:3000/prod'>回到上一頁</Link>
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
                <NumberPanel
                  className={scss.NumberPanel}
                  quantity={quantity}
                  callback={handleQuantityChange}
                  min={1}
                  max={maxQuantity}
                  doesDisbleMinus={quantity <= 1}
                  doesDisblePlus={quantity >= maxQuantity}
                />
                <div className={scss.fixed}>
                  <button
                    className={scss.btnSubmit}
                    type='button'
                    disabled={!selectedPrice || maxQuantity === 0}
                    onClick={handleAddToCart}
                  >
                    {loading ? '載入中...' : '加入購物車'}
                  </button>
                  <FavoriteIcon className={scss.mbFavIcon} size={28} />
                </div>
              </div>
            </div>
          </div>
          <Table product={product} />
          <Recommend currentProductId={product.id} currentProductCategory={product.cate_1} />
        </div>
      </main>
    </>
  );
}

Pid.layout = DefaultLayout;