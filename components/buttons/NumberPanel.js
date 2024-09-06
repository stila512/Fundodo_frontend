import { LuPlus, LuMinus } from "react-icons/lu";
import colors from '@/styles/color/_variables-export.module.scss';
import s from './number-panel.module.scss';

/**
 * 翻肚肚樣式的數量控制面板
 * 本面板將以給定的 set函數對於數量作 +1 與 -1 的操作
 * @param {number} quantity 數量的初始值
 * @param {function} callback 委託的函數，本元件只會給予函數 +1 或 -1 的參數，其餘 set 函數或是副作用的操作，請自行設計
 * @param {number} min 允許的最小值
 * @param {function} onOverMin 當數量在最小值，按下減少時觸發的事件
 * @param {number} max 允許的最大值
 * @param {function} onOverMax 當數量在最大值，按下減少時觸發的事件
 * @param {bool} doesDisbleMinus 切換 minus button 之 disabled 狀態
 * @param {bool} doesDisblePlus 切換 plus button 之 disabled 狀態
 * @param {string} className 自訂邊框與按鈕符號顏色 (optional)
 * @param {string} className 自訂樣式 (optional)
 * @description 搭配的 state 變數請自行宣告；若有數量歸零的特殊處遇，請使用 min 與 onOverMin 的機制。
 */
export const NumberPanel = ({
  quantity = 1,
  callback = () => { },
  min = 1,
  onOverMin = () => { },
  max = 20,
  onOverMax = () => { },
  doesDisbleMinus = false,
  doesDisblePlus = false,
  color = 'body',
  className = {}
}) => {
  const handleMinus = () => (quantity === min)
    ? onOverMin() : callback(-1);
  const handlePlus = () => (quantity === max)
    ? onOverMax() : callback(1);

  return (
    <div
      className={['hstack', 'mx-auto', s.panel, `${className}`].join(' ')}
      style={{
        border: `1px solid ${colors[color]}`,
        color: colors[color]
      }}
    >
      <button disabled={doesDisbleMinus} onClick={() => handleMinus()}>
        <LuMinus />
      </button>
      <div
        className='tx-center flex-grow-1'
        style={{ color: colors.heading }}
      >
        {quantity}
      </div>
      <button className='fx-center' disabled={doesDisblePlus} onClick={() => handlePlus()}>
        <LuPlus />
      </button>
    </div>
  );
}
