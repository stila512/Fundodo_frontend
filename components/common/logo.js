import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import logo from '@/public/logo.png';
// import scss from '@/styles/style.module.scss';

/**
 * 翻肚肚的 Logo 元件，可以單純圖片，也可以是連結
 * @param {number} width 圖片寬度 (px)
 * @param {string} href 連結 (optional)
 * @default width 210 (px)
 */
export default function Logo({ width = 210, href = undefined }) {
  if (href) {
    return (
      <Link
        className="dBlock" style={{maxWidth: width, width: 'fit-content'}}
        href={href}
      >
        <Image src={logo} width={width} alt="FUNDODO logo" />
      </Link>
    );
  } else {
    return (
      <div style={{maxWidth: width, width: 'fit-content'}}>
        <Image src={logo} width={width} alt="FUNDODO logo" />
      </div>
    );
  }
}
Logo.PropTypes = {
  width: PropTypes.number,
  href: PropTypes.string,
};
