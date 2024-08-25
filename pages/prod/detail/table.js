import React from 'react'
import scss from './table.module.scss'

export default function Table({ product }) {

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
            <td className={['text-nowrap', scss.tableTd1].join(' ')}>適用年齡</td>
            <td className={scss.tableTd2}>  {product.ageArr ? product.ageArr.join(', ') : ""}
            </td>
          </tr>
          <tr>
            <td className={['text-nowrap', scss.tableTd1].join(' ')}>商品類別</td>
            <td className={scss.tableTd2}>{
              [new Set(product.sortArr)].length === 1
                ? [new Set(product.sortArr)]
                : [new Set(product.sortArr)].length > 1
                  ? [new Set(product.sortArr)].join(', ')
                  : ""}</td>
          </tr>
          <tr>
            <td className={['text-nowrap', scss.tableTd1].join(' ')}>商品規格</td>
            <td className={scss.tableTd2}>{
              [...new Set(product.specArr)].length === 1
                ? [...new Set(product.specArr)]
                : [...new Set(product.specArr)].length > 1
                  ? [...new Set(product.specArr)].join('/ ')
                  : ""
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
