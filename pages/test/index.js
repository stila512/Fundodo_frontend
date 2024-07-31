import Head from 'next/head';
import DefaultLayout from '@/components/layout/default';
import FddBtn from '@/components/buttons/fddBtn.js';
import scss from './test.module.scss';
import { DiApple } from 'react-icons/di';
import { IconContext } from 'react-icons';

export default function TestPage() {
  const f = () => {
    console.log('object');
  };
  return (
    <>
      <Head>
        <title>測試用頁面</title>
      </Head>
      <div className="container">
        <div className="row">
          <div className="col12 col_lg6">
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

                <FddBtn color="primary" outline icon callback={f}>
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
          <div className="col12 col_lg6">
            <div className={scss.msgRegisterSuccess}>
              <div className="bgPrimary">1</div>
              <div className="bgPrimary mt3 dFlex" style={{ width: '50%' }}>2</div>
              <div className="bgPrimary mt3 dInline" style={{ width: '50%' }}>3</div>
              <div className="dNone d_lgFlex jcBetween">
                <div className={[scss.ball, 'txError fxCenter'].join(' ')}>1</div>
                <div className={[scss.ball, 'txError fxCenter'].join(' ')}>2</div>
                <div className={[scss.ball, 'txError fxCenter'].join(' ')}>3</div>
                <div className={[scss.ball, 'txError fxCenter'].join(' ')}>4</div>
                <div className={[scss.ball, 'txError fxCenter'].join(' ')}>5</div>
              </div>
              <div className="bgInfo roundedBPill mx5" style={{lineHeight: 2}}>5</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

TestPage.layout = DefaultLayout;
