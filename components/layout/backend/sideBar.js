import React from 'react'
import scss from './sideBar.module.scss';
import Logo from '@/public/logo-backend.png';
import Image from 'next/image';
import { IoMdPerson } from 'react-icons/io';
import { IoCart } from 'react-icons/io5';
import { FaBone } from "react-icons/fa6";
import { GiDogHouse } from "react-icons/gi";
import { GiJumpingDog } from "react-icons/gi";
import { PiArticleNyTimesBold } from "react-icons/pi";
import { RiCoupon2Fill } from "react-icons/ri";


export default function SideBar() {


  return (
    <>
      <aside className={scss.sideBar}>
        <div className={scss.logo}>
          <Image src={Logo} width={260} href="/"></Image>
        </div>
        <nav>
          <div className={scss.navMenu}>
          <button className=""><IoMdPerson className={scss.icon}/> 會員管理</button>
            <button className=""><IoCart className={scss.icon}/>訂單管理</button>
            <button className=""><FaBone className={scss.icon}/>商品管理</button>
            <button className=""><GiDogHouse className={scss.icon}/>旅館管理</button>
            <button className=""><GiJumpingDog className={scss.icon}/>課程管理</button>
            <button className=""><PiArticleNyTimesBold className={scss.icon}/>文章管理</button>
            <button className=""><RiCoupon2Fill />優惠券管理</button>
          </div>
        </nav>
      </aside>
      
    </>
  );
};
