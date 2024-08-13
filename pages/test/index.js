import Head from 'next/head';
import DefaultLayout from '@/components/layout/default';
import FddBtn from '@/components/buttons/fddBtn.js';
import scss from './test.module.scss';
import { DiApple } from 'react-icons/di';
import { IconContext } from 'react-icons';

export default function TestPage() {
  
  return (
    <>
      <Head>
        <title>測試用頁面</title>
      </Head>
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

                <FddBtn color="primary" outline icon callback={()=>{}}>
                  <IconContext.Provider value={{ size: '2.5rem' }}>
                    <DiApple />
                  </IconContext.Provider>
                </FddBtn>
                <FddBtn color="info" size="lg" href="#">
                  完善會員資料
                </FddBtn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

TestPage.layout = DefaultLayout;
