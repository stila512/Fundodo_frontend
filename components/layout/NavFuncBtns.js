import { useState, useEffect, useContext } from 'react';
import { AuthProvider, AuthContext } from '@/context/AuthContext';
import { IoMdPerson } from 'react-icons/io';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoCart } from 'react-icons/io5';
import scss from './navHeader.module.scss';
import { IoIosLogOut } from "react-icons/io";
import { FaHeart } from 'react-icons/fa'; 
export default function NavFuncBtns({ showCart = true }) {
  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout(); // 呼叫登出函數
  };

  return (
    <ul className={scss.ulFunc}>
      {/* 站內搜尋 */}
      <li>
        <button>
          <AiOutlineSearch />
        </button>
      </li>
      {/* 會員 */}
      <li>
        <a href="/member/login">
          <IoMdPerson />
        </a>
      </li>
      {/* 我的最愛 */}
      <li>
        <a href="/prod/list/favoriteProd">
        <FaHeart size={24} />
        </a>
      </li>
      {/* 購物車 */}
      {showCart ? (
        <li>
          <a href="/buy/cart">
            <IoCart />
          </a>
        </li>

      ) : (
        <></>
      )}
      {/* 會員 */}
      <li>
        <button onClick={handleLogout}>
          <IoIosLogOut />
        </button>
      </li>
    </ul>
  );
}
