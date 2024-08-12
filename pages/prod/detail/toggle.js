import React from 'react'
import scss from './toggle.module.scss'
// import style from 'styles'
import { useState, useEffect } from 'react';

export default function Toggle() {
  return (
    <>
      <div className={[scss.toggleGrid].join(' ')}>
        <label className={[scss.toggle, scss.selected].join(' ')}>
          <input type="checkbox" className={scss.hiddenBtn} />
          <span></span>
          商品描述
        </label>
        <label className={scss.toggle}>
          <input type="checkbox" className={scss.hiddenBtn} />
          <span></span>
          評價
        </label>
        <label className={scss.toggle}>
          <input type="checkbox" className={scss.hiddenBtn} />
          <span></span>
          商品規格
        </label>
      </div>
      <div className={[scss.toggleText, 'row'].join(' ')}>
        <div className='col-7'>
          成分：雞肉，雞湯，雞肝，蛋製品，磷酸氫鈣，火雞肉，豌豆，紅蘿蔔，南瓜，番茄，羽衣甘藍，甘藍，
          研磨亞麻籽，鮪魚油，瓜爾膠，花椰菜，氯化鉀，蔓越莓，藍莓，鹽，荷蘭芹，牛磺酸，礦物質（鋅蛋白鹽，
          鎂蛋白鹽，銅蛋白鹽，錳蛋白鹽，鐵蛋白鹽），氯化膽鹼，維生素群（L-抗壞血酸-2-多聚磷酸鹽，維生素E，
          維生素B1，維生素B2，維生素B6，維生素D，維生素B9，維生素B12）
        </div>
      </div>
    </>
  )
}
