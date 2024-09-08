import React from 'react'
import scss from './table.module.scss'

export default function Table({ product }) {
  const sortArr = [...new Set(product.sortArr)];
  const specArr = [...new Set(product.specArr)]
  const showSort = sortArr.join('、');
  const showSpec = specArr.join('、')
  return (
    <>
      <table className={scss.mb} style={{ borderCollapse: 'collapse', width: '100%' }}>
        <tbody>
          <tr>
            <td className={['text-nowrap', scss.tableTd1].join(' ')}>品牌名稱</td>
            <td className={scss.tableTd2}>{product.brand}</td>
          </tr>
          <tr>
            <td className={['text-nowrap', scss.tableTd1].join(' ')}>商品名稱</td>
            <td className={scss.tableTd2}>{product.name}</td>
          </tr>
          <tr>
            <td className={['text-nowrap', scss.tableTd1].join(' ')}>商品分類</td>
            <td className={scss.tableTd2}>{product.cate_1}</td>
          </tr>
          <tr>
            <td className={['text-nowrap', scss.tableTd1].join(' ')}>商品子分類</td>
            <td className={scss.tableTd2}>{product.cate_2}</td>
          </tr>
          <tr>
            <td className={['text-nowrap', scss.tableTd1].join(' ')}>適用年齡</td>
            <td className={scss.tableTd2}>  {product.ageArr ? product.ageArr.join(', ') : ""}
            </td>
          </tr>
          <tr>
            <td className={['text-nowrap', scss.tableTd1].join(' ')}>商品類別</td>
            <td className={scss.tableTd2}>
            {showSort}
            </td>
          </tr>
          <tr>
            <td className={['text-nowrap', scss.tableTd1].join(' ')}>商品規格</td>
            <td className={scss.tableTd2}>{
              showSpec
            }</td>
          </tr>
          <tr>
            <td className={['text-nowrap', scss.tableTd1].join(' ')}>商品描述</td>
            <td className={scss.tableTd2}>{product.description.split('●').map((item, index) => (
              item.trim() && (
                <span key={index}>
                  {index > 0 && '●'}{item.trim()}<br />
                </span>
              )
            ))}</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
