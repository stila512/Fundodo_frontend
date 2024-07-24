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
 *
 * @param {string} color 按鈕色系
 * @param {icon} bool 圓形款式
 * @param {outline} bool 外框款式
 * @param {function} callback 按鈕 onClick 事件
 */
export default function FddBtn({
  children = '人家是按鈕',
  color = '',
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

  const typeName =
    'btn' + colorList[color] + (icon ? 'Icon' : '') + (outline ? '2' : '');
  const cName = btnStyle[typeName];

  if (callback !== undefined) {
    return (
      <button className={cName} onClick={() => callback()}>
        {children}
      </button>
    );
  } else if (href !== '') {
    return (
      <Link className={cName} href={href}>
        {children}
      </Link>
    );
  } else {
    throw new Error('此元件的參數 callback 與 href 必須擇一輸入');
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
