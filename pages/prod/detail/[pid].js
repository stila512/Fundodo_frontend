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
import Modal from '@/components/common/modal';
import ReviewSection from './reviewSection';

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
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '', mode: 1, style: 1 });  const [activeTab, setActiveTab] = useState('description');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

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

  const getMaxMinPrice = (priceArr) => {
    const prices = priceArr.map(price => parseFloat(price)).filter(price => price > 0);
    if (prices.length === 0) return { maxPrice: 0, minPrice: 0 };
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    return { maxPrice, minPrice };
  }

  // 定義一個函數來格式化價格
  const formatPrice = (price) => {
    return new Intl.NumberFormat('zh-TW').format(Math.floor(price));
  }

  // 定義一個函數來獲取價格顯示的文字
  const getPriceDisplay = (priceArr) => {
    const { maxPrice, minPrice } = getMaxMinPrice(priceArr);
    const uniquePrices = [...new Set(priceArr.filter(price => parseFloat(price) > 0))];

    if (uniquePrices.length === 0) {
      return '價格未提供';
    } else if (uniquePrices.length === 1) {
      return `NT$ ${formatPrice(uniquePrices[0])}`;
    } else {
      return `NT$ ${formatPrice(minPrice)} - NT$ ${formatPrice(maxPrice)}`;
    }
  }
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
      return `NT$ ${selectedPrice.toLocaleString()}`;
    } else if (product.priceArr.length === 1) {
      return `NT$ ${product.priceArr[0].toLocaleString()}`;
    } else {
      return '請選擇選項';
    }
  };

  // 加入購物車
  const handleAddToCart = async () => {
    if (loading) {
      return;
    }

    if (!user) {
      displayModal('未登入', '請先登入', 2, 1);
      return;
    }

    const userId = user.id || user.user_id || user.userId;
    if (!userId) {
      console.error('無法獲取用戶ID');
      alert('發生錯誤，請重新登入後再試');
      return;
    }

    let selectedIndex = -1;

    // 檢查商品配置並選擇正確的索引
    if (product.sortArr.length > 0 && product.specArr.length > 0) {
      if (!selectedSort || !selectedSpec) {
        alert('請選擇商品類別和規格');
        return;
      }
      selectedIndex = product.sortArr.findIndex((sort, index) =>
        sort === selectedSort && product.specArr[index] === selectedSpec
      );
    } else if (product.sortArr.length > 0) {
      if (!selectedSort) {
        alert('請選擇商品類別');
        return;
      }
      selectedIndex = product.sortArr.indexOf(selectedSort);
    } else if (product.specArr.length > 0) {
      if (!selectedSpec) {
        alert('請選擇商品規格');
        return;
      }
      selectedIndex = product.specArr.indexOf(selectedSpec);
    } else {
      // 如果商品既沒有 sort 也沒有 spec
      selectedIndex = 0;
    }

    if (selectedIndex === -1) {
      alert('無法找到選定的商品選項');
      return;
    }

    if (quantity < 1) {
      alert('請選擇商品數量');
      return;
    }

    const productData = new FormData();
    productData.append('user_id', userId);
    productData.append('buy_sort', 'PD');
    productData.append('buy_id', product.pidArr[selectedIndex]);
    productData.append('quantity', quantity);

    try {
      const response = await fetch('http://localhost:3005/api/cart', {
        method: 'POST',
        body: productData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const result = await response.json();

      if (result.status === "success") {
        if (result.result) {
          displayModal('成功', '加入購物車成功，請至購物車查看選購的商品。', 1, 1);
        } else {
          displayModal('失敗', '此商品已經在您的購物車囉~', 1, 2);
        }
      } else {
        displayModal('錯誤', '加入購物車時發生錯誤，請稍後再試。', 1, 2);
      }
    } catch (error) {
      console.error('加入購物車失敗:', error);
      displayModal('錯誤', '加入購物車時發生錯誤，請稍後再試。', 1, 2);
    }
  };

  const displayModal = (title, message, mode = 1, style = 1) => {
    setModalContent({ title, message, mode, style });
    setShowModal(true);
  };
  const handleModalConfirm = () => {
		setShowModal(false);
		if (!user) {
			setValue(router.pathname);
			router.push('/member/login');
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
        <h1 className={[scss.shade3, 'd-none', 'd-lg-block'].join(' ')}>狗狗的{product.cate_1}用品</h1>
        <div className={['hstack jc-between mb-3', scss.mt].join(' ')}>
          <div>
            <Breadcrumb />
          </div>
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
                <FavoriteIcon className={scss.handleFavIcon} size={24} style={{ color: '#B9A399' }} productId={product.id} productData={{
                  id: product.id,
                  name: product.name,
                  price: getPriceDisplay(product.priceArr),
                  image: product.picNameArr[0]

                }} />
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
              <hr className={'bg-primary mt-3'} />
              <div className={scss.priceGroup}>
                <span className={scss.price}>{renderPrice()}</span>
              </div>
              <div className='gap-3 hstack mt-3'>
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

                </div>
              </div>
            </div>
          </div>
          <div className={scss.selectBar}>
            <button
              className={`${scss.selectBtn} ${activeTab === 'description' ? scss.active : ''}`}
              onClick={() => handleTabChange('description')}
            >
              商品描述
            </button>
            <button
              className={`${scss.selectBtn} ${activeTab === 'reviews' ? scss.active : ''}`}
              onClick={() => handleTabChange('reviews')}
            >
              商品評價
            </button>
          </div>
          <div className='mt-5'>
            {activeTab === 'description' ? (
              <Table product={product} />
            ) : (
              <ReviewSection productId={product.id} />
            )}
          </div>
          <Recommend currentProductId={product.id} currentProductCategory={product.cate_1} />
        </div>
      </main>
      <Modal
        mode={modalContent.mode}
        style={modalContent.style}
        active={showModal}
        onConfirm={handleModalConfirm}
        onClose={() => {
          setShowModal(false);
          location.reload();
        }}
        confirmText="確定"
        cancelText="取消"

      >
        <h4>{modalContent.title}</h4>
        <p>{modalContent.message}</p>
      </Modal>

    </>
  );
}

Pid.layout = DefaultLayout;