import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import s from './modal.module.scss';
import FddBtn from "@/components/buttons/fddBtn";

/**
 * 
 * @param {number} mode modal 模式（必填）
 * 1 | 通知用（僅關閉選項）; 2 | 確認用（確定與取消兩種選擇）
 * @param {number} style 款式挑選（預設為 1）
 */
export default function Modal({
  mode = null, style = 1,
  active = false,
  onClose = () => {},
  onConfirm,
  confirmText = '確定',
  cancelText = '取消',
  children = (<><h1>請用 h1 輸入標題</h1><p>請用 p 輸入內文</p></>),
}) {
  if (!mode) throw new Error('Modal 的模式為必填，請由 1 與 2 擇一填入');

  //todo 安裝 active
  return (
    <div className={['pos-a w-100 h-100', s.notice].join(' ')}>
      <div className={[s.window, s.style11].join(' ')}>
        {style === 1 && <>
          <div className={s.closeBtnBox}>
            <FddBtn color="tint4" size='sm' icon callback={onClose}><RxCross2 /></FddBtn>
          </div>
          <div className={s.membrane}>
            <div className={s.icon}><IoCheckmarkCircleOutline /></div>
            <div className={s.textBox}>{children}</div>

          </div>
        </>}
      </div>
    </div>
  )
}
