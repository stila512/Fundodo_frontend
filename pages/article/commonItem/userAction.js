import React, { useState, useEffect } from 'react'
import scss from '@/pages/article/commonItem/userAction.module.scss';
import Link from 'next/link';
import { IoIosSearch } from "react-icons/io";

export default function UserAction({ onOrderByChange, currentOrderBy }) {
    const [search, setSearch] = useState('')

    const handleOrderByChange = (e) => {
        const newOrderBy = e.target.value
        onOrderByChange(newOrderBy)
    }
    return (
        <>
            <div className={[scss.userAction].join()}>
                <div>
                    <h4>home/討論區</h4>
                </div>
                <div>
                    <a className={[scss.rwdCreate].join()} href='/article/createArticle'>發表新文章</a>
                </div>
                <div className={[scss.dflex].join()}>
                    <select
                        className={[scss.listSelect].join()}
                        value={currentOrderBy}
                        onChange={handleOrderByChange}
                    >
                        <option value="1">最新文章 </option>
                        <option value="2">留言最多</option>
                    </select>
                    <div className={scss.search}>
                        <input
                            type="text"
                            placeholder='使用關鍵字搜尋'
                            className={[scss.searchBar].join()}
                            value={search}
                            onChange={e => setSearch(e.target.value)} />
                        <Link className={scss.searchBtn} href={`/article?search=${search}`}><IoIosSearch /></Link>
                    </div>

                </div>

            </div>
        </>
    )
}
