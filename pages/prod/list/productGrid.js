import { useState, useEffect } from 'react'
import scss from './productGrid.module.scss'
import Image from 'next/image'
import FavoriteIcon from './favoriteIcon'
import Link from 'next/link'

export default function ProductGrid({ products, className, page, totalPages, onPageChange }) {
  const perPage = 12

  // 定義一個函數來獲取價格數組中的最大值和最小值
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

  return (
    <div className={['row', 'g-3', className].join(' ')}>
      {products.length > 0 ? (
        products.map((v, i) => (
          <div key={i} className={['col-xxl-3 col-xl-4 col-6', scss.cardGrid].join(' ')}>
            <div className={scss.card}>
              <div className='d-flex jc-end'>
                <FavoriteIcon style={{ color: '#B9A399' }} className={scss.cardFavIcon} />
              </div>
              <div className={scss.prodImgBox}>
                <div className={[scss.prodImg, 'img-wrap-w100', 'img-wrap-h100'].join(' ')}>
                  <Image src={`/pic-prod/${v.picNameArr[0]}`} width={0} height={0} layout="responsive" />
                </div>
              </div>
              <div className={scss.textarea2}>
                <div className={scss.textarea}>
                  <span className={scss.prodName}>{v.name}</span>
                </div>
                <div className={scss.textarea}>
                  <span className={scss.prodPrice}>
                    {getPriceDisplay(v.priceArr)}
                  </span>
                </div>
              </div>
              <Link className={scss.btn} type='button' href={`/prod/detail/${v.id}`}><span>我要購買</span></Link>
            </div>
          </div>
        ))
      ) : (
        <div className="col-12 text-center">
          <p>沒有找到符合條件的商品</p>
        </div>
      )}
      {totalPages > 1 && (
        <div className='text-center mt-4'>
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className={scss.myButton}
          >
            上一頁
          </button>
          {[...Array(totalPages)].map((v, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i + 1)}
              disabled={page === i + 1}
              className={[page === i + 1 ? scss.activePage : '', scss.myButton].join(' ')}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className={scss.myButton}
          >
            下一頁
          </button>
        </div>
      )}
      
    </div>
    
  )
}