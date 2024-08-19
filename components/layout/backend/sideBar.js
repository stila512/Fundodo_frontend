import React from 'react'
import scss from './sideBar.module.scss';
import logo from "@/public/backendLogo.svg"
import Image from 'next/image';

export default function SideBar() {


  return (
    <>
      <aside className={scss.sidebar}>
        <div className={scss.logo}>
          <h1>fundodo</h1>
          <Image src={logo} />
        </div>
        <nav>
          <div className={scss.navMenu}>
            <button className="" >會員管理</button>
            <button className="">訂單管理</button>
            <button className="">商品管理</button>
            <button className="">旅館管理</button>
            <button className="">課程管理</button>
            <button className="">文章管理</button>
            <button className="">優惠券管理</button>
          </div>
        </nav>
      </aside>
    </>
  );
};
