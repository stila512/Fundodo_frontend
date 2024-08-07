import Head from 'next/head';
import DefaultLayout from '@/components/layout/default';
import FddBtn from '@/components/buttons/fddBtn.js';
import { FaCheck } from "react-icons/fa6";

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
  const f = () => {
    console.log('object');
  };
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
              <div className="row jc-center">
                <div className="col-auto tx-center">
                  <FddBtn color="primary" callback={() => { }}>按鈕</FddBtn>
                  <p className='mt-3'>膠囊型，背景色（預設）</p>
                </div>
                <div className="col-auto tx-center">
                  <FddBtn color="primary" outline callback={() => { }}>按鈕</FddBtn>
                  <p className='mt-3'>膠囊型，邊框色</p>
                </div>
                <div className="col-auto tx-center">
                  <FddBtn color="primary" icon callback={() => { }}><FaCheck /></FddBtn>
                  <p className='mt-3'>圓形，背景色</p>
                </div>
                <div className="col-auto tx-center">
                  <FddBtn color="primary" icon outline callback={() => { }}><FaCheck /></FddBtn>
                  <p className='mt-3'>圓形，邊框色</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mt-5">
            <h1>按鈕全色系</h1>
            <p>(todo)這裡要再加按鈕模式切換功能</p>
          </div>
          <div className="col-12 showcase">
            <h2 className='tx-center'>按鈕展示區 - 白背景</h2>
            <div className="row row-cols-3 row-cols-lg-4 g-3">
              {themeColors.map((color, i) => (
                <div key={i} className='col tx-center'>
                  <FddBtn color={color} callback={() => { }}>{color}</FddBtn>
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 showcase bg-secondary">
            <h2 className='tx-center'>按鈕展示區 - 淺背景</h2>
            <div className="row row-cols-3 row-cols-lg-4 g-3">
              {themeColors.map((color, i) => (
                <div key={i} className='col tx-center'>
                  <FddBtn color={color} callback={() => { }}>{color}</FddBtn>
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 showcase bg-dark">
            <h2 className='tx-center tx-tint4'>按鈕展示區 - 深背景</h2>
            <div className="row row-cols-3 row-cols-lg-4 g-3">
              {themeColors.map((color, i) => (
                <div key={i} className='col tx-center'>
                  <FddBtn color={color} callback={() => { }}>{color}</FddBtn>
                </div>
              ))}
            </div>
          </div>
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
