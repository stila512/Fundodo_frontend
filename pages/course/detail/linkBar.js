import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import scss from './linkBar.module.scss';

export default function LinkBar() {

    return (
        <>
            <div className='container'>
                <div className={scss.links}>
                    <Link href="#summary">課程總覽</Link>
                    <Link href="#content">課程內容</Link>
                    <Link href="#faq">常見問題</Link>
                </div>
            </div>


        </>
    )
}
