import Link from 'next/link'
import React from 'react'
import scss from './linkBar.module.scss';

export default function LinkBar() {
    return (
        <>
            <div className='container'>
                <div className={scss.links}>
                    <Link href="/">課程總覽</Link>
                    <Link href="/">課程內容</Link>
                    <Link href="/">常見問題</Link>
                    <Link href="/">問與答</Link>
                </div>
            </div>


        </>
    )
}
