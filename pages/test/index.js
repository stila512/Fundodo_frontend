import Head from 'next/head';
import DefaultLayout from '@/components/layout/default';
import FddBtn from '@/components/buttons/fddBtn.js';
import scss from './test.module.scss';
import { DiApple } from 'react-icons/di';
import { IconContext } from 'react-icons';

const themeColors = [
  "primary",
  "secondary",
  "info",
  "warning",
  "error",
  "white",
  "light",
  "dark",
  "black",
  "tint1",
  "tint2",
  "tint3",
  "tint4",
  "tint5",
  "shade1",
  "shade2",
  "shade3",
  "shade4",
  "shade5",
  "heading",
  "body",
  "muted",
];

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
          <div className="col-12 mt-5">
            <h2 className='tx-center mb-5'>色票展示區</h2>
            <div className="row row-cols-3 row-cols-lg-4">
              {themeColors.map((color, i) => (
                <div key={i} className='col'>
                  <h2 className={'py-3 tx-center bg-' + color} style={{textShadow: "2px 2px white, 2px 1px white, 1px 2px white, -1px -1px white"}}>
                  {color}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

TestPage.layout = DefaultLayout;
