import { useState } from 'react'
import s from './confirm.module.scss'
import FddBtn from '@/components/buttons/fddBtn';
import axios from 'axios';
import { FaAngleLeft } from "react-icons/fa6";

export default function FillingPage({
  setBuyPhase = () => { },
  setBuyInfoPkg = () => { }
}) {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isCVS, setIsCVS] = useState(false);

  const handleBeginingBtn = bool => {
    if (isBeginning) setIsBeginning(false);
    setIsCVS(bool);
  }

  const handleGoBack = () => {
    // todo: need cover more details
    setBuyPhase(1);
  }

  const handleNextPhase = () => {
    setBuyInfoPkg();
    setBuyPhase(3);
  }

  //todo 需要與 user 區域串接，儲存訂單資料組

  return (
    <main className='container'>
      <div className={['row jc-center py-5', s.topPanel, isBeginning ? s.beginningMode : ''].join(' ')}>
        <h3 className="col-12">請選擇配送方式：</h3>
        <div className="col-5 d-flex flex-row jc-end">
          <FddBtn color='primary' outline={isCVS} size='sm' className={s.modeBtn} callback={() => handleBeginingBtn(false)}>
            <>
              <h4>宅配到府</h4>
              <p className='mt-3 tx-default tx-shade3'>填寫寄送資料</p>
            </>
          </FddBtn>
        </div>
        <div className="col-5">
          <FddBtn color='primary' outline={!isCVS} size='sm' className={s.modeBtn} callback={() => handleBeginingBtn(true)}>
            <h4>超商取貨</h4>
            <p className='mt-3 tx-default tx-shade3'>選擇超商店家</p>
          </FddBtn>
        </div>
      </div>
      {isBeginning ||
        <div className="row">
          {/*======== 宅配模式  ==================================== */}
          {isCVS ||
            (<>
              <div className="col-12 col-lg-8">
                <form action="" className={s.form}>
                  {/*//*===================== 收件人姓名 ======================= */}
                  <div className="row">
                    <div className="col-12">
                      <label htmlFor="name_receiver" className='tx-default'>收件人姓名 *</label>
                    </div>
                    <div className="col-12">
                      <input type='text' name='name_receiver' />
                    </div>
                  </div>
                  {/*//*===================== EMAIL ======================= */}
                  <div className="row">
                    <div className="col-12">
                      <label htmlFor="email" className='tx-default'>EMAIL *</label>
                    </div>
                    <div className="col-12">
                      <input type='email' name='email' />
                    </div>
                  </div>
                  {/*//*===================== 收件人行動電話 ======================= */}
                  <div className="row">
                    <div className="col-12">
                      <label htmlFor="phone_num" className='tx-default'>收件人行動電話 *</label>
                    </div>
                    <div className="col-12">
                      <input type='text' name='phone_num' />
                    </div>
                  </div>
                  {/*//*===================== 收件地址 ======================= */}
                  <div className="row">
                    <div className="col-12">
                      <label htmlFor="address" className='tx-default'>收件地址 *</label>
                    </div>
                    <div className="col-6">
                      <select name="city">施工中</select>
                    </div>
                    <div className="col-6">
                      <select name="district">施工中</select>
                    </div>
                    <div className="col-12">
                      <input type="text" name='address' />
                    </div>
                  </div>
                  {/*//*===================== 儲存訂購資料 ======================= */}
                  <div>
                    <input type="checkbox" name="saveForNext" />
                    <label htmlFor="saveForNext">儲存訂購資料</label>
                  </div>
                  {/*//*===================== 備註 ======================= */}
                  <div>
                    <label htmlFor="ps" className='tx-default'>備註</label>
                  </div>
                  <div>
                    <textarea />
                  </div>
                </form>
              </div>
              <div className="col-12 col-lg-8">
                <div className="hstack jc-between">
                  <FddBtn color='white' pill={false} callback={() => handleGoBack()}>
                    <FaAngleLeft />回到購物車
                  </FddBtn>
                  <FddBtn color='primary' pill={false} size="lg" callback={() => { }}>確認送出</FddBtn>
                </div>
              </div>
            </>)
          }
          {/*======== 超商模式  ==================================== */}
          {
            isCVS &&
            <div className="col-12">
              <h2 className='d-inline'>超商選擇：</h2>
              <FddBtn color='primary' size="sm" href="http://localhost:3005/api/cart/ecpay2">7-11</FddBtn>
            </div>
          }
        </div >}
    </main >
  )
}
