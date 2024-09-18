import { FaRegCheckCircle } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { MdErrorOutline } from "react-icons/md";
import s from './modal.module.scss';
import FddBtn from "@/components/buttons/fddBtn";
import { Children } from "react";
// import { RemoveScrollBar } from 'react-remove-scroll-bar';
// 待研究是否採用 react-remove-scroll-bar
// 此套件可以讓捲軸消失（by overflow hidden），但是沒辦法協助填補捲軸的空位
/**
 * 翻肚肚的彈出視窗元件  Fundodo modal
 * @param {number} mode modal 模式（必填）
 * 1 | 通知用（僅關閉選項）; 2 | 確認用（確定與取消兩種選擇）
 * @param {number} style 款式挑選；預設為 1
 * @param {function} onClose 關掉的事件（必填）
 * @param {function} onConfirm 確認的事件
 * @param {function} onCancel 取消的事件
 * @param {string} confirmText 確認按鈕的文字
 * @param {string} cancelText 取消按鈕的文字
 * @param {JSX.Element} children 請用 h4 輸入標題，用 p 輸入內文
 * @description 此元件的主要架構為兩個：打暗的背景＆彈出視窗
 */
export default function Modal({
  mode = null, style = 1,
  active = false,
  onClose = () => { },
  onConfirm = () => onClose(),
  onCancel = () => onClose(),
  confirmText = '確定',
  cancelText = '取消',
  children = (<><h4>請用 h4 輸入標題</h4><p>請用 p 輸入內文</p></>),
}) {
  //=============== 前置檢查
  if (!mode) throw new Error('Modal 的模式為必填，請由 1 與 2 擇一填入');
  let childElem = Children.toArray(children);
  const ok_2_use = childElem[0].type === 'h4' && childElem[1].type === 'p';
  const contentText = ok_2_use ? children : (<>
    <h4>{childElem[0].props.children}</h4>
    <p>{childElem[1].props.children}</p>
  </>)

  const code = 10 * mode + style;
  //todo delete next line
  // active = true;

  const handleBgClick = () => {
    if (mode === 2) return; //此模式不得逃避選擇

    onClose();
  }

  return active && (<>
    {/* <RemoveScrollBar /> */}
    <div
      className={['pos-a w-100 h-100', s.notice].join(' ')}
      onClick={() => handleBgClick()}
    >
      <div className={s.window} onClick={e => e.stopPropagation()}>
        {mode === 1 &&
          <div className={s.closeBtnBox}>
            <FddBtn color="tint4" size='mini' icon callback={onClose}><RxCross2 /></FddBtn>
          </div>}
        {code === 11 &&
          <>
            <div className={s.style_11}>
              <div className={s.icon}><FaRegCheckCircle /></div>
              <div className={s.textBox}>{contentText}</div>
            </div>
          </>}
        {code === 12 &&
          <>
            <div className={s.style_11}>
              <div className={s.icon}><MdErrorOutline /></div>
              <div className={s.textBox}>{contentText}</div>
            </div>
          </>}
        {code === 21 &&
          <>
            <div className={s.style_21}>
              <div className={s.textBox}>{contentText}</div>
              <div className={s.btnBox}>
                <button
                  className={s.cancelBtn}
                  onClick={onCancel}
                >
                  {cancelText}
                </button>
                <button
                  className={s.confirmBtn}
                  onClick={onConfirm}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </>}
      </div>
    </div>
  </>
  )
}
