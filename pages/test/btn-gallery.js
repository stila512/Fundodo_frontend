import Head from 'next/head';
import DefaultLayout from '@/components/layout/default';
import FddBtn from '@/components/buttons/fddBtn.js';
import { FaCheck, FaChevronUp } from "react-icons/fa6";
import { useState } from 'react';

const themeColors = [
  "primary",
  "secondary",
  "info",
  "warning",
  "error",
  "white",
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
  const [btnType, setBtnType] = useState(0);
  const isOutline = !!(Math.floor(btnType / 10));
  const isIcon = !!(btnType % 10);

  const bgMode = ["bg-white", "bg-secondary", "bg-shade4"];
  const bgModetitle = ["白", "淺", "深"];

  return (
    <>
      <Head>
        <title>按鈕圖鑑</title>
      </Head>
      <div className="container">
        <div className="row jc-center">
          <div className="col-12 mt-5">
            <h1 className='tx-center'>色票展示區</h1>
            <div className="row row-cols-3 row-cols-lg-4">
              {themeColors.map((color, i) => (
                <div key={i} className='col'>
                  <h2 className={'py-3 tx-center bg-' + color}>{color}</h2>
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 mt-5">
            <h1>按鈕全種類</h1>
            <div className="showcase">
              <div className="row jc-center g-5">
                <div className="col-auto tx-center">
                  <FddBtn color="primary" callback={() => { }}>按鈕</FddBtn>
                  <p className='mt-3'>膠囊型，背景色（預設）</p>
                  <p className='mt-1'>語法：不用外加</p>
                </div>
                <div className="col-auto tx-center">
                  <FddBtn color="primary" outline callback={() => { }}>按鈕</FddBtn>
                  <p className='mt-3'>膠囊型，邊框色</p>
                  <p className='mt-1'>語法：加 outline</p>
                </div>
                <div className="col-auto tx-center">
                  <FddBtn color="primary" icon callback={() => { }}><FaCheck /></FddBtn>
                  <p className='mt-3'>圓形，背景色</p>
                  <p className='mt-1'>語法：加 icon</p>
                </div>
                <div className="col-auto tx-center">
                  <FddBtn color="primary" icon outline callback={() => { }}><FaCheck /></FddBtn>
                  <p className='mt-3'>圓形，邊框色</p>
                  <p className='mt-1'>語法：加 outline、icon</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mt-5">
            <h1>按鈕全色系</h1>
            <p className="tx-center mb-3">請以下列四按鈕，切換翻肚肚按鈕的四種模式。</p>
            <div className="row jc-center">
              <div className="col-auto tx-center">
                <FddBtn color={btnType === 0 ? "info" : "muted"} callback={() => setBtnType(0)}>按鈕</FddBtn>
              </div>
              <div className="col-auto tx-center">
                <FddBtn color={btnType === 10 ? "info" : "muted"} outline callback={() => setBtnType(10)}>按鈕</FddBtn>
              </div>
              <div className="col-auto tx-center">
                <FddBtn color={btnType === 1 ? "info" : "muted"} icon callback={() => setBtnType(1)}><FaCheck /></FddBtn>
              </div>
              <div className="col-auto tx-center">
                <FddBtn color={btnType === 11 ? "info" : "muted"} icon outline callback={() => setBtnType(11)}><FaCheck /></FddBtn>
              </div>
            </div>
          </div>
          {bgMode.map((color, i_mode) => (
            <div className={["col-12 showcase", color].join(' ')}>
              <h2 className={['tx-center', i_mode === 2 ? 'tx-tint4' : ''].join(' ')}>按鈕展示區 - {bgModetitle[i_mode]}背景</h2>
              <div className="row row-cols-3 row-cols-lg-4 g-3">
                {themeColors.map((color, i) => (
                  <div key={i} className='col tx-center'>
                    <FddBtn
                      color={color}
                      outline={isOutline}
                      icon={isIcon} callback={() => { }}
                    >
                      {isIcon ? <FaChevronUp /> : color}
                    </FddBtn>
                    {isIcon ? <span className='ps-3'>{color}</span> : <></>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
      h1 {
        margin-bottom: 2.5rem;
        text-align: center; 
      }
      .showcase {
          margin-block: 1rem;
          padding-block: 3rem;

          h2 {
            margin-bottom: 2rem;
          }
        }
        `}</style>
    </>
  );
}

TestPage.layout = DefaultLayout;
