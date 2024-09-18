import React from 'react'
import scss from './sort.module.scss';
import { IoIosArrowDown } from 'react-icons/io';


export default function Sort({sortBy, setSortBy}) {
  
  return (
    <>
      <div className={scss.sort}>
       
        <select value={sortBy} onChange={e=>setSortBy(e.target.value)} >
          <option value="newest">最新上架 </option>
          <option value="mostViewed">最多觀看人數</option>
          <option value="priceLowToHigh">價格由低到高</option>
          <option value="priceHighToLow">價格由高到低</option>
        </select>
        <div className={scss.arrow}>
          <IoIosArrowDown />
        </div>
      </div>
    </>
  );
}
