import React, {useState} from 'react'
import Image from 'next/image';
import scss from './summary.module.scss';


export default function Summary({ summary, description, images }) {
    const [showAllImages, setShowAllImages] = useState(false);

    return (
        <>
            <div className='container'>
                <section className={scss.content}>
                    <div className={scss.summary}>
                        <h3>{summary}</h3>
                        <div className={scss.title}>
                            <h3>課程總覽</h3>
                        </div>
                        <p>{description}</p>
                    </div>
                    <div className={`${scss.imagesContainer} ${showAllImages ? scss.showAll : scss.hideOverflow}`}>
                    {images.map(image => (
                        <div className={scss.crsImg} >
                        <Image src={`http://localhost:3005/upload/crs_images/${image}`} width={0} height={0} />
                        </div>
                        
                    ))}
                    {!showAllImages && <div className={scss.gradient}></div>}
                    </div>
                    <div className={['d-flex jc-center' ,scss.buttonContainer].join(" ")}>
                        <button className={scss.btn}  onClick={() => setShowAllImages(!showAllImages)}>
                        {showAllImages ? '收起介紹' : '更多介紹'}
                        </button>
                    </div>
                </section>

            </div>

        </>

    )
}
