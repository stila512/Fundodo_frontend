import Image from 'next/image';
import Link from 'next/link';
import propTypes from 'prop-types';
import logo from '@/public/logo.png';
// import scss from '@/styles/style.module.scss';

/**
 * 翻肚肚的 Logo 元件，可以單純圖片，也可以是連結
 * @param {number} width 圖片預設寬度 (px)
 * @param {number} height 圖片預設高度 (px)
 * @param {string} href 連結 (optional)
 * @param {string} wrapClass wrap 的自訂 class 樣式 (optional)
 * @default width 210 (px)
 */
export default function Logo({
  width = 0,
  height = 0,
  href = undefined,
  wrapClass = ''
}) {
  if (href) {
    return (
      <Link
        className={["d-block", wrapClass].join(' ')}
        href={href}
      >
        <Image src={logo} width={width} height={height} alt="Fundodo logo" />
      </Link>
    );
  } else {
    return (
      <div className={wrapClass}>
        <Image src={logo} width={width} height={height} alt="Fundodo logo" />
      </div>
    );
  }
}
Logo.propTypes = {
  width: propTypes.number,
  href: propTypes.string,
};
