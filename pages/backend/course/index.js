import React from 'react'
import Head from 'next/head'
import BackendLayout from '@/components/layout/backend'
import scss from './index.module.scss';

export default function CourseList() {
  return (
    <>
      <Head>
        <title>Fundodo - 課程管理</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <BackendLayout>
      <div className={scss.coursePage}>
          <h1>課程列表</h1>
          <div className={scss.topBar}>
            <button className={scss.addBtn}>新增課程</button>
            <div className={scss.searchBar}>
              <input type="text" className={scss.searchInput} placeholder="搜尋..." />
              <button className={scss.searchBtn}>🔍</button>
            </div>
          </div>
          <table className={scss.courseTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>課程名稱</th>
                <th>價格</th>
                <th>建立日期</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>玩出好感情！與狗兒的互動遊戲課</td>
                <td>NT$1200</td>
                <td>2023-10-18</td>
                <td className={scss.actionBtns}>
                  <button className={scss.actionBtn}>👁</button>
                  <button className={scss.actionBtn}>✏️</button>
                  <button className={scss.actionBtn}>🗑️</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>狗狗教養實作- 線上體驗課</td>
                <td>NT$350</td>
                <td>2023-10-18</td>
                <td className={scss.actionBtns}>
                  <button className={scss.actionBtn}>👁</button>
                  <button className={scss.actionBtn}>✏️</button>
                  <button className={scss.actionBtn}>🗑️</button>
                </td>
              </tr>
              {/* 可以繼續添加更多課程行 */}
            </tbody>
          </table>
      </div>
      </BackendLayout>
    </>
  )
}
