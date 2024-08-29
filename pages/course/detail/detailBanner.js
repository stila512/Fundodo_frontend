import React from 'react'
import Image from 'next/image';
import { AiOutlineUser } from "react-icons/ai";
import scss from './detailBanner.module.scss';

export default function DetailBanner({ title, img_path, tags, viewed_count }) {



  return (
    <>
      <div className={[scss.banner, "d-flex gap-md-5"].join(" ") }>
        <div className="col-12 col-md-6">
        {img_path && (
            <Image 
              src={`http://localhost:3005/upload/crs_images/${img_path}`} 
              className={scss.crsPic} 
              width={400} 
              height={300} 
              alt='課程圖片' 
            />
          )}
        </div>
        <div className={[scss.info, "col-12", "col-md-5"].join(' ')}>
          <h2>{title}</h2>
          <div className={scss.text}>
            <div className={scss.tags}>
              {tags.map(tag => (
                <div className={scss.tag}><p>{tag}</p></div>
              ))}

            </div>
            <div className='d-flex gap-1 ai-center'>
              <AiOutlineUser />
              <p>{viewed_count} 人來學習</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}