import Head from 'next/head';
import DefaultLayout from '@/components/layout/default';
import FddBtn from '@/components/buttons/fddBtn.js';
import { useState } from 'react'
import scss from './test.module.scss';
import { DiApple } from 'react-icons/di';
import { PiNumberSquareSevenBold } from "react-icons/pi";
import { IconContext } from 'react-icons';
import { useShip711StoreOpener } from '@/hooks/use-ship711';
import { apiBaseUrl } from '@/configs/index.js';
// import Loading from '@/components/common/loading';

export default function TestPage() {
  const { store711, openWindow, closeWindow } = useShip711StoreOpener(
    `${apiBaseUrl}/pay/ship711`
  );

  return (
    <>
      <Head>
        <title>測試用頁面</title>
      </Head>
      {/* <Loading /> */}
      <div className="container">
        <div className="row jc-center">
          <div className="col-12 col-lg-6">
            <div className={scss.msgRegisterSuccess}>
              <h2>會員註冊成功</h2>
              <p>歡迎加入Fundod翻肚肚</p>
              <p>您現在已登入</p>
              <div className={scss.btnBox}>
                <FddBtn color="secondary" outline href="#">
                  立即購物
                </FddBtn>
                <FddBtn color="secondary" href="#">
                  完善會員資料
                </FddBtn>

                <FddBtn
                  color="primary"
                  outline
                  icon
                  title="選擇 7-11 分店"
                  callback={() => openWindow()}
                >
                  <IconContext.Provider value={{ size: '2.5rem' }}>
                    <PiNumberSquareSevenBold />
                  </IconContext.Provider>
                </FddBtn>
                <FddBtn color="info" size="lg" href="#">
                  完善會員資料
                </FddBtn>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="hstack jc-evenly">
              <div>
                門市名稱: <input type="text" value={store711.storename} disabled />
              </div>
              <div>
                門市地址: <input type="text" value={store711.storeaddress} disabled />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

TestPage.layout = DefaultLayout;
