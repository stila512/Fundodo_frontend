import React, { useState } from 'react'
import DefaultLayout from '@/components/layout/default'
import SideText from '@/components/member/SideText';
import s from './coupon.module.scss';

export default function CouponPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className='bg-tint5'>
      <div className='container'>
        <div className="row">
          <div className="col-12"><span>Home &gt; 會員中心 &gt; 我的優惠券</span></div>
          <div className="col-12">
            <div className="row">
              <div className="col-10">
                <main className='bg-white'>
                  <div className='hstack'>
                    <input type="text" placeholder='請輸入優惠碼' />
                    <div className='bg-primary px-5 py-2'>領取優惠</div>
                  </div>
                  <div className={s.tabBox}>
                    <button
                      className={['', activeIndex === 0 ? s.active : ''].join(' ')}
                      onClick={() => setActiveIndex(0)}
                    >
                      可使用的優惠券
                    </button>
                    <button
                      className={['', activeIndex === 1 ? s.active : ''].join(' ')}
                      onClick={() => setActiveIndex(1)}
                    >
                      已使用的優惠券
                    </button>
                    <button
                      className={['', activeIndex === 2 ? s.active : ''].join(' ')}
                      onClick={() => setActiveIndex(2)}
                    >
                      已失效的優惠券
                    </button>
                  </div>
                  <section>
                    <div className={s.countPanel}>
                      <h3 className='tx-shade3' style={{ fontSize: '1.25rem' }}>0 張優惠券</h3>
                    </div>
                    <div className={[s.section, activeIndex === 0 ? '' : 'd-none'].join(' ')}>
                    </div>
                  </section>
                </main>
              </div>
              <div className="col-2">
                <SideText activeIndex={5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

CouponPage.layout = DefaultLayout;