import React, { useState, useEffect } from 'react'
import scss from '@/pages/article/commonItem/userAction.module.scss';
import Link from 'next/link';
import { IoIosSearch } from "react-icons/io";

export default function UserAction() {
    const [search, setSearch] = useState('')
    return (
        <>
            <div className={[scss.userAction].join()}>
                <div>
                    <h4>home/討論區</h4>
                </div>
                <div className={[scss.dflex].join()}>
                    <select className={[scss.listSelect].join()}>
                        {/* <option value="0" className={scss.rwdOption}>排序 </option> */}
                        <option value="1">最新文章 </option>
                        <option value="2">熱門文章</option>
                        <option value="3">按讚最多</option>
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
