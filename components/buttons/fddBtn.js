import btnStyle from './button.module.scss';
import PropTypes from 'prop-types';
import Link from 'next/link';

const colorList = {
  primary: 'Primary',
  secondary: 'Secondary',
  info: 'Info',
  warning: 'Warning',
  error: 'Error',
  light: 'Light',
  dark: 'Dark',
};

/**
 * 翻肚肚主題色系的樣式按鈕
 * @param {string} children 按鈕文字
 * @param {string} color 按鈕色系
 * @param {string} size 按鈕大小 (optional)
 * @param {bool} icon 圓形款式 (optional)
 * @param {bool} outline 外框款式 (optional)
 * @param {string} href 連結路徑 (optional)
 * @param {function} callback 按鈕 onClick 事件 (optional)
 * @description 按鈕內容文字如同一般 button 元件，擺在 HTML tag 內即可
 */
export default function FddBtn({
  children = '人家是按鈕',
  color = 'primary',
  size = '',
  icon = false,
  outline = false,
  callback = undefined,
  href = '',
}) {
  if (!Object.prototype.hasOwnProperty.call(colorList, color)) {
    throw new Error(
      '顏色的選擇只有 primary, secondary, info, warning, error, light, dark，請擇一使用'
    );
  }
  switch (size) {
    case '':
      break;
    case 'sm':
      size = 'btnSm';
      break;
    case 'lg':
      size = 'btnLg';
      break;
    default:
      throw new Error('FddBtn 的 size 只有三種選項：不填、sm、lg');
  }

  const typeName =
    'btn' + colorList[color] + (icon ? 'Icon' : '') + (outline ? '2' : '');

  const classStr = btnStyle[typeName] + (size ? ' ' + btnStyle[size] : '');

  if (callback !== undefined) {
    return (
      <button className={classStr} onClick={() => callback()}>
        {children}
      </button>
    );
  } else if (href !== '') {
    return (
      <Link className={classStr} href={href}>
        {children}
      </Link>
    );
  } else {
    throw new Error('FddBtn 元件的參數 callback 與 href 必須擇一輸入');
  }
}

FddBtn.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.bool,
  outline: PropTypes.bool,
  onClick: PropTypes.func,
  href: PropTypes.string,
};
