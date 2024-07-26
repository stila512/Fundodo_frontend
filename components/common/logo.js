import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import logo from '@/public/logo.png';
import scss from '@/styles/style.module.scss';

/**
 * 翻肚肚的 Logo 元件，可以單純圖片，也可以是連結
 * @param {number} width 圖片寬度
 * @param {string} href 連結 (optional)
 */
export default function Logo({ width = 210, href = undefined }) {
  if (href) {
    return (
      <Link
        className={scss.imgWrap}
        style={{ display: 'block', maxWidth: width }}
        href={href}
      >
        <Image src={logo} alt="FUNDODO logo" />
      </Link>
    );
  } else {
    return (
      <div className={scss.imgWrap} style={{ maxWidth: width }}>
        <Image src={logo} alt="FUNDODO logo" />
      </div>
    );
  }
}
Logo.PropTypes = {
  width: PropTypes.number,
  href: PropTypes.string,
};
