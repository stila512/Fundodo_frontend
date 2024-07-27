import React from 'react';
import scss from '@/pages/article/userAction.module.scss';

export default function UserAction() {
  return (
    <>
      <div className={[scss.titleAction].join()}>
        <div className={[scss.userAction].join()}>
          <div>
            <h4>home/討論區</h4>
          </div>
          <div className={[scss.dflex].join()}>
            <select className={[scss.listSelect].join()}>
              <option value="">最新文章 </option>
              <option value="">熱門文章</option>
              <option value="">按讚最多</option>
            </select>
            <input type="text" className={[scss.searchBar].join()} />
          </div>
        </div>
        <div className={[scss.btnList].join()}>
          <div className={[scss.sortList].join()}>
            <button className={[scss.sortBtn].join()}>全部分類</button>
            <button className={[scss.sortBtn].join()}>毛孩百科</button>
            <button className={[scss.sortBtn].join()}>寵食大評比</button>
            <button className={[scss.sortBtn].join()}>寵物保健</button>
            <button className={[scss.sortBtn].join()}>品牌好物推薦</button>
          </div>
        </div>
      </div>
    </>
  );
}
