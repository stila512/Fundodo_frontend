import React from 'react'
import scss from './tags.module.scss';


export default function Tags({tags}) {
  return (
    <>
      <div className='container'>
        <div className={scss.tags}>
          {tags.map(tag => (
            <button className={scss.btn}>{tag}</button>
              ))}
        </div>
      </div>


    </>
  )
}
