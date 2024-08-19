import { useState, useEffect } from 'react'
import scss from './productGrid.module.scss'
import Image from 'next/image'
import FavoriteIcon from './favoriteIcon'
import Link from 'next/link'

export default function ProductGrid({ filteredProducts = [], className }) {
  // 使用 useState 創建一個名為 page 的狀態，初始值為 1。setPage 是用來更新 page 的函數
  const [page, setPage] = useState(1)
  
  // 定義每頁顯示的產品數量
  const perPage = 12
  
  // 計算當前頁面的最後一個產品的索引
  const thisPage = page * perPage
  
  // 計算當前頁面的第一個產品的索引
  const firstProduct = thisPage - perPage
  
  // 從 filteredProducts 中切片出當前頁面要顯示的產品
  const currentProducts = filteredProducts.slice(firstProduct, thisPage)

  // 定義一個函數來改變頁碼
  const changePage = (pageNum) => setPage(pageNum)

  // 定義一個函數來獲取價格數組中的最大值和最小值
  const getMaxMinPrice = (priceArr) => {
    // 將價格數組中的每個元素轉換為浮點數，並過濾掉小於或等於 0 的價格
    const prices = priceArr.map(price => parseFloat(price)).filter(price => price > 0);
    // 如果沒有有效價格，返回最大值和最小值都是 0
    if (prices.length === 0) return { maxPrice: 0, minPrice: 0 };
    // 使用 Math.max 和 Math.min 函數找出最大值和最小值
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    // 返回包含最大值和最小值的物件
    return { maxPrice, minPrice };
  }

  // 定義一個函數來格式化價格
  const formatPrice = (price) => {
    // 使用 Intl.NumberFormat 將價格格式化為台灣地區的數字格式
    return new Intl.NumberFormat('zh-TW').format(Math.floor(price));
  }

  // 定義一個函數來獲取價格顯示的文字
  const getPriceDisplay = (priceArr) => {
    // 獲取價格數組中的最大值和最小值
    const { maxPrice, minPrice } = getMaxMinPrice(priceArr);
    // 創建一個包含所有大於 0 的唯一價格的數組
    const uniquePrices = [...new Set(priceArr.filter(price => parseFloat(price) > 0))];
    
    // 根據唯一價格的數量來決定如何顯示價格
    if (uniquePrices.length === 0) {
      return '價格未提供';
    } else if (uniquePrices.length === 1) {
      return `NT$ ${formatPrice(uniquePrices[0])}`;
    } else {
      return `NT$ ${formatPrice(minPrice)} - NT$ ${formatPrice(maxPrice)}`;
    }
  }

  // 使用 useEffect 來監聽 filteredProducts 的變化
  useEffect(() => {
    // 當 filteredProducts 變化時，重置頁碼到第一頁
    setPage(1)
  }, [filteredProducts])

  // 返回 JSX，也就是我們要渲染的內容
  return (
    // 創建一個大的容器 div，包含所有的產品卡片
    <div className={['row', 'col-lg-9', 'g-3', className].join(' ')}>
      {/* 如果有產品要顯示，就渲染產品卡片 */}
      {currentProducts.length > 0 ? (
        // 使用 map 函數遍歷當前頁面的所有產品
        currentProducts.map((v, i) => (
          // 為每個產品創建一個 div 容器
          <div key={i} className={['col-xxl-3 col-xl-4 col-6', scss.cardGrid].join(' ')}>
            {/* 產品卡片的主體 */}
            <div className={scss.card}>
              {/* 收藏圖標 */}
              <FavoriteIcon style={{color:'#B9A399'}} className={scss.cardFavIcon}/>
              {/* 產品圖片容器 */}
              <div className={scss.prodImgBox}>
                <div className={[scss.prodImg, 'img-wrap-w100', 'img-wrap-h100'].join(' ')}>
                  {/* 使用 Next.js 的 Image 元件顯示產品圖片 */}
                  <Image src={`/pic-prod/${v.picNameArr[0]}`} width={0} height={0} layout="responsive" />
                </div>
              </div>
              {/* 產品文字信息容器 */}
              <div className={scss.textarea2}>
                {/* 產品名稱 */}
                <div className={scss.textarea}>
                  <span className={scss.prodName}>{v.name}</span>
                </div>
                {/* 產品價格 */}
                <div className={scss.textarea}>
                  <span className={scss.prodPrice}>
                    {/* 使用我們之前定義的函數來顯示價格 */}
                    {getPriceDisplay(v.priceArr)}
                  </span>
                </div>
              </div>
              {/* 購買按鈕，使用 Next.js 的 Link 元件來實現頁面跳轉 */}
              <Link className={scss.btn} type='button' href={`/prod/detail/${v.id}`}><span>我要購買</span></Link>
            </div>
          </div>
        ))
      ) : (
        // 如果沒有產品要顯示，就顯示一條提示信息
        <div className="col-12 text-center">
          <p>沒有找到符合條件的商品</p>
        </div>
      )}
      {/* 如果產品總數超過每頁顯示的數量，就顯示分頁按鈕 */}
      {filteredProducts.length > perPage && (
        <div className='text-center'>
          <button
            onClick={() => changePage(page - 1)}
            disabled={page === 1}
          >
            上一頁
          </button>
          <span>{page}</span>
          <button
            onClick={() => changePage(page + 1)}
            disabled={thisPage >= filteredProducts.length}
          >
            下一頁
          </button>
        </div>
      )}
    </div>
  )
}