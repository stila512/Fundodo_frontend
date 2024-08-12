import React from 'react'
import scss from './sort.module.scss';
import { IoIosArrowDown } from 'react-icons/io';


export default function Sort() {
  return (
    <>
      <div className={scss.sort}>
        <div>排序依據: </div>
        <select>
          <option value="">最新上架 </option>
          <option value="">價格由低到高</option>
          <option value="">價格由高到低</option>
        </select>
        <div className={scss.arrow}>
          <IoIosArrowDown />
        </div>
      </div>
    </>
  );
}
