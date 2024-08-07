import React from 'react'
import scss from "./courseGrid.module.scss"

export default function CourseGrid() {
    return (
        <>
            <div className='container'>
                <div className={scss.cards}>
                    <div className={scss.card}></div>
                    <div className={scss.card}></div>
                </div>
            </div>
        </>
    )
}
