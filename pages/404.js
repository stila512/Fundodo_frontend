import FddBtn from '@/components/buttons/fddBtn';
import Head from 'next/head';
export default function Custom404() {
  //todo 要再做一個公開版本的 404 頁面
  // const publicTemplate = (
  //   <div className="container">
  //     <h1  className="txCenter" style={{ marginBlock: '1rem'}}>
  //       <span className={s.txError}>404</span> - 找不到這個頁面
  //     </h1>
  //     <p className="txCenter" style={{ lineHeight: 2 }}>
  //       請嘗試檢查或修正您的網址，或是向技術人員諮詢。
  //       <br />
  //       如果您是透過其他頁面連結到此，請向本網站通報此連結。
  //     </p>
  //   </div>
  // );
  return (
    <>
      <Head>
        <title>找無此頁</title>
      </Head>
      <div className="container">
        <h1 className="tx-center my-3">
          <span className="tx-error">404</span> - 找不到這個頁面
        </h1>
        <div
          className="bg-error p-3"
          style={{ borderRadius: '1rem' }}
        >
          <div
            className="bg-tint4"
            style={{
              padding: '.5rem 3rem',
              lineHeight: 2,
              fontSize: '1.618rem',
            }}
          >
            <h6 className="tx-center">
              NEXT 的頁面路由，都是以 pages 這個資料夾為起點。對於網址有下設定：
            </h6>
            <ul>
              <li>
                1. 如果你的頁面檔路徑為{' '}
                <code>&quot;@/pages/test/index.js&quot;</code>，<br />
                那你需要輸入的網址是{' '}
                <code>&quot;http://localhost:3000/test&quot;</code>，其中
                index.js 必須省略。
              </li>
              <li style={{ marginTop: '2rem' }}>
                2. 如果你的頁面檔路徑為{' '}
                <code>&quot;@/pages/test/another.js&quot;</code>，<br />
                那你需要輸入的網址是{' '}
                <code>&quot;http://localhost:3000/test/another&quot;</code>
                ，其中 .js 必須省略。
              </li>
            </ul>
          </div>
        </div>
        <div style={{ marginTop: '2rem' }} className="gr-center">
          <FddBtn href="/" color="primary">
            返回首頁
          </FddBtn>
        </div>
      </div>
    </>
  );
}
