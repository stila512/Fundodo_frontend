import scss from '@/pages/prod/bread.module.scss';
import style from '@/styles/style.module.scss';
import { IoIosArrowForward } from "react-icons/io";
export default function Breadcrumb() {
  return (
    <>
      <div
        className={[
          style.container,
          style.dFlex,
          scss.justifyContentBetween
        ].join(' ')}
      >
        <nav aria-label="breadcrumb">
          <ol className={[scss.ul, style.dFlex,scss.alignItemCenter].join(' ')}>
            <li>
              <a className={style.primary} href="/">Home</a>
            </li>
            <IoIosArrowForward />
            <li>
              <a className={scss.dark} href="#">狗狗飼料</a>
            </li>
          </ol>
        </nav>
      </div>
    </>
  );
}
