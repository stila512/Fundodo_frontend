import scss from './bread.module.scss';
import { IoIosArrowForward } from "react-icons/io";
 
export default function Breadcrumb() {
  return (
    <>
      <div
        className={[
          'container',
          'dFlex',
          scss.justifyContentBetween
        ].join(' ')}
      >
        <nav aria-label="breadcrumb">
          <ol className={[scss.ul, 'dFlex',scss.alignItemCenter].join(' ')}>
            <li>
              <a className='txPrimary' href="/">Home</a>
            </li>
            <IoIosArrowForward />
            <li>
              <a className={scss.shade3} href="#">狗狗飼料</a>
            </li>
          </ol>
        </nav>
      </div>
    </>
  );
}
