import React from 'react'
import scss from './sideBar.module.scss';
import Link from 'next/link';
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
            <Link href={`/backend/hotel`}>
              <button className=""><GiDogHouse className={scss.icon} />旅館管理</button>
            </Link>
            <Link href={`/backend/course`}>
              <button className=""><GiJumpingDog className={scss.icon} />課程管理</button>
            </Link>
            <Link href={`/backend/reviews`}>
              <button className=""><GiDogHouse className={scss.icon} />評價管理</button>
            </Link>
          </div>
        </nav>
      </aside>

    </>
  );
};
