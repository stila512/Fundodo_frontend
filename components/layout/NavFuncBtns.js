import { IoMdPerson } from 'react-icons/io';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoCart } from 'react-icons/io5';
import scss from './navHeader.module.scss';

export default function NavFuncBtns({ showCart = true }) {
  return (
    <ul className={scss.ulFunc}>
      <li>
        <button>
          <AiOutlineSearch />
        </button>
      </li>
      <li>
        <a href="#">
          <IoMdPerson />
        </a>
      </li>
      {showCart ? (
        <li>
          <a href="#">
            <IoCart />
          </a>
        </li>
      ) : (
        <></>
      )}
    </ul>
  );
}
