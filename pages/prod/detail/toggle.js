import React from 'react'
import scss from './toggle.module.scss'
export default function Toggle() {
  return (
    <>
      <div className={scss.selectBar}>
        <button className={scss.selectBtn}>商品描述</button>
        <button className={scss.selectBtn}>商品評價</button>
      </div>
    </>
  )
}
