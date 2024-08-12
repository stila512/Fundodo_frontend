import Head from 'next/head';
import React from 'react'
import BuyLayout from '@/components/layout/buy';
import BuyProgress from '@/components/buy/buyProgress';

export default function ConfirmPage() {
  return (
    <>
      <Head>
        <title>確認付款 | Fundodo</title>
      </Head>
      <BuyProgress stage={2} />
      <main className='container'>
        <div className="row flex-lg-row-r">
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
        </div>
      </main>
    </>
  )
}
ConfirmPage.layout = BuyLayout;
