import { useState } from 'react'
import BuyLayout from '@/components/layout/buy';
import BuyProgress from '@/components/buy/buyProgress';
import s from './confirm.module.scss'
import FddBtn from '@/components/buttons/fddBtn';
import axios from 'axios';

export default function FillingPage() {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isCVS, setIsCVS] = useState(false);

  const handleBeginingBtn = bool => {
    setIsBeginning(false);
    setIsCVS(bool);
  }

  return (
    <>
      {/* <FddBtn color='primary' outline={isCVS} size='lg' callback={()=>setIsCVS(false)}>宅配到府</FddBtn>
      <FddBtn color='primary' outline={!isCVS} size='lg' callback={()=>setIsCVS(true)}>超商取貨</FddBtn> */}
      <BuyProgress stage={2} />
      <main className='container'>
        <div className={['row jc-center py-5', s.topPanel, isBeginning ? s.beginningMode : ''].join(' ')}>
          <h3 className="col-12">請選擇配送方式：</h3>
          <div className="col-5 d-flex flex-row jc-end">
            <FddBtn color='primary' outline={isCVS} size='sm' callback={() => handleBeginingBtn(false)}>
              <>
                <h4>宅配到府</h4>
                <p className='mt-3 tx-default tx-shade3'>填寫寄送資料</p>
              </>
            </FddBtn>
          </div>
          <div className="col-5">
            <FddBtn color='primary' outline={!isCVS} size='sm' callback={() => handleBeginingBtn(true)}>
              <h4>超商取貨</h4>
              <p className='mt-3 tx-default tx-shade3'>選擇超商店家</p>
            </FddBtn>
          </div>
        </div>
        {isBeginning || (<div className="row">
          {isCVS || (<>
            <div className="col-12 col-lg-4 bg-shade2">
              <div>
                <label htmlFor="way_receiver">運送方式</label>
                <input type='radio' name='way_receiver' value={'delivery'} />宅配
                <input type='radio' name='way_receiver' value={'cv_store'} />超商取貨
              </div>
            </div>
            <div className="col-12 col-lg-8">
              <form action="">
                <div>
                  <label htmlFor="name_receiver">收件人姓名 *</label>
                  <input type='text' name='name_receiver' />
                </div>
                <div>
                  <label htmlFor="email">EMAIL *</label>
                  <input type='email' name='email' />
                </div>
                <div>
                  <label htmlFor="phone_num">收件人行動電話 *</label>
                  <input type='text' name='phone_num' />
                </div>
                <div className="row">
                  <div className="col-12">
                    <label htmlFor="address">收件地址 *</label>
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
                <div>
                  <label htmlFor="ps">備註</label>
                  <textarea />
                </div>
              </form>
            </div>
          </>)}
          {isCVS && (<div className="col-12">
            <h2 className='d-inline'>超商選擇：</h2>
            <FddBtn color='primary' size="sm" href={"http://localhost:3005/api/ecpay2"}>7-11</FddBtn>
          </div>)}
        </div>)}
      </main>

    </>
  )
}
