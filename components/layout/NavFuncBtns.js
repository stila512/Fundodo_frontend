import { IoMdPerson } from 'react-icons/io';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoCart } from 'react-icons/io5';
import scss from './navHeader.module.scss';

export default function NavFuncBtns({ showCart = true }) {
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
    </ul>
  );
}
