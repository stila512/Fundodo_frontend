import React from 'react'
import Image from 'next/image';
import scss from './summary.module.scss';


export default function Summary({ summary, description, images }) {
    return (
        <>
            <div className='container'>
                <section className={scss.content}>
                    <div className={scss.summary}>
                        <h3>{summary}</h3>
                        <div className={scss.title}>
                            <h3>課程大綱</h3>
                        </div>
                        <p>{description}</p>
                    </div>
                    {images.map(image => (
                        <div className={scss.crsImg} >
                        <Image src={`/coursePic/${image}`} width={0} height={0} />
                        </div>
                        
                    ))}

                    <div className='d-flex jc-center'>
                        <button className={scss.btn} >更多介紹</button>
                    </div>
                </section>

            </div>

        </>

    )
}
