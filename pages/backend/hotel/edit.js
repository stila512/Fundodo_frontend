import React from 'react'
import Head from 'next/head'
import BackendLayout from '@/components/layout/backend'
import styles from './add.module.scss';

export default function edit() {
  return (
    <>
    <BackendLayout>
      <Head>
        <title>新增寵物旅館</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className={styles.container}>
      <h1>編輯資訊</h1>
      <form action="">
      <div className="imgGroup">
      <p className={styles.title}>旅館圖片</p>
      <div className={styles.addImg}>
      </div>
      </div>
      <div className={styles.formGroup}>
      <p className={styles.title}>旅館名稱</p>
      <input type="text" />
      </div>

      <div className={styles.formGroup}>
      <p className={styles.title}>寄宿房型定價(1晚)</p>
      <label htmlFor="title">小型犬(10公斤以下)</label>
      <input type="text" />
      <label htmlFor="title">中型犬(10公斤~25公斤)</label>
      <input type="text" />
      <label htmlFor="title">大型犬(25公斤以上)</label>
      <input type="text" />
      </div>

      <div className={styles.formGroup}>
      <p className={styles.title}>提供服務</p>
      <input type="radio" />
      <label htmlFor="">室內活動區</label>
      <input type="radio" />
      <label htmlFor="">提供飼料鮮食</label>
      <input type="radio" />
      <label htmlFor="">24小時家長網路遠端監控</label>
      <input type="radio" />
      <label htmlFor="">寵物洗澡服務</label>
      </div>

      <div className={styles.formGroup}>
      <p className={styles.title}>所在地區</p>
      <select value="台北市">台北市</select>
      </div>
      <div className={styles.formGroup}>
      <p className={styles.title}>旅館完整地址</p>
      <input type="text" />
      </div>
      <div className={styles.formGroup}>
      <p className={styles.title}>旅館簡介</p>
      <textarea value=""></textarea>
      </div>

      <div className={styles.btnGroup}>
              <button type="button" className= {styles.cancel}>取消</button>
              <button type="submit" className= {styles.update}>更新</button>
            </div>
      </form>
      </div>

    </BackendLayout>
  </>
  )
}
