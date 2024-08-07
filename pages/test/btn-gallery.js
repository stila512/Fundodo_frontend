import Head from 'next/head';
import DefaultLayout from '@/components/layout/default';
import FddBtn from '@/components/buttons/fddBtn.js';

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
        <title>按鈕圖鑑</title>
      </Head>
      <div className="container">
        <div className="row jc-center">
          <div className="col-12 mt-5">
            <h2 className='tx-center'>色票展示區</h2>
            <div className="row row-cols-3 row-cols-lg-4">
              {themeColors.map((color, i) => (
                <div key={i} className='col'>
                  <h2 className={'py-3 tx-center bg-' + color}>{color}</h2>
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 mt-5">
            <h2 className='tx-center'>按鈕展示區 - 白背景</h2>
            <div className="row row-cols-3 row-cols-lg-4 g-3">
              {themeColors.map((color, i) => (
                <div key={i} className='col tx-center'>
                  <FddBtn color={color} callback={()=>{}}>{color}</FddBtn>
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 mt-5 bg-secondary">
            <h2 className='tx-center py-3'>按鈕展示區 - 淺背景</h2>
            <div className="row row-cols-3 row-cols-lg-4 g-3">
              {themeColors.map((color, i) => (
                <div key={i} className='col tx-center'>
                  <FddBtn color={color} callback={()=>{}}>{color}</FddBtn>
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 mt-5 bg-dark">
            <h2 className='tx-center py-3 tx-tint4'>按鈕展示區 - 深背景</h2>
            <div className="row row-cols-3 row-cols-lg-4 g-3">
              {themeColors.map((color, i) => (
                <div key={i} className='col tx-center'>
                  <FddBtn color={color} callback={()=>{}}>{color}</FddBtn>
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
