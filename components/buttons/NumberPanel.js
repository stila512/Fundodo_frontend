import { LuPlus, LuMinus } from "react-icons/lu";
import s from './number-panel.module.scss';

/**
 * 翻肚肚樣式的數量控制面板
 * 本面板將以給定的 set函數對於數量作 +1 與 -1 的操作
 * @param {number} quantity 數量的初始值
 * @param {function} setFunc 數量所搭配的 useState set函數。
 * @param {number} index 若 useState 設定為數值陣列，本面板控制的數在該陣列中的編號；若 useState 設定為（單獨）數值，則此參數不用設定
 * @param {number} min 允許的最小值
 * @param {function} onOverMin 當數量在最小值，按下減少時觸發的事件
 * @param {number} max 允許的最大值
 * @param {function} onOverMax 當數量在最大值，按下減少時觸發的事件
 * @param {bool} doesDisbleMinus 切換 minus button 之 disabled 狀態
 * @param {bool} doesDisblePlus 切換 plus button 之 disabled 狀態
 * @description 搭配的 state 變數請自行宣告；若有數量歸零的特殊處遇，請使用 min 與 onOverMin 的機制。
 */
export const NumberPanel = ({
  quantity = 1,
  setFunc = () => { },
  index = -1,
  min = 1,
  onOverMin = () => { },
  max = 20,
  onOverMax = () => { },
  doesDisbleMinus = false,
  doesDisblePlus = false,
}) => {
  const changeBy = delta => {
    if (index === -1) setFunc(n => n + delta);
    else setFunc(arr => arr.map((d, j) => (j === index) ? (d + delta) : d));
  }
  const handleMinus = () => (quantity === min)
    ? onOverMin() : changeBy(-1);
  const handlePlus = () => (quantity === max)
    ? onOverMax() : changeBy(1);

  return (
    <div className={['hstack mx-auto', s.panel].join(' ')} >
      <button disabled={doesDisbleMinus} onClick={() => handleMinus()}>
        <LuMinus />
      </button>
      <div className='tx-center'>{quantity}</div>
      <button disabled={doesDisblePlus} onClick={() => handlePlus()}>
        <LuPlus />
      </button>
    </div>
  );
}
