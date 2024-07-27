import FddBtn from '@/components/buttons/fddBtn';
import s from '@/styles/style.module.scss';
export default function Custom404() {
  //todo 要再做一個公開版本的 404 頁面
  const publicTemplate = (
    <div className={s.container}>
      <h1 style={{ marginBlock: '1rem', textAlign: 'center' }}>
        <span className={s.txError}>404</span> - 找不到這個頁面
      </h1>
      <p style={{ textAlign: 'center', lineHeight: 2 }}>
        請嘗試檢查或修正您的網址，或是向技術人員諮詢。
        <br />
        如果您是透過其他頁面連結到此，請向本網站通報此連結。
      </p>
    </div>
  );
  return (
    <div className={s.container}>
      <h1 style={{ marginBlock: '1rem', textAlign: 'center' }}>
        <span className={s.txError}>404</span> - 找不到這個頁面
      </h1>
      <div
        className={s.bgError}
        style={{ padding: '1rem', borderRadius: '1rem' }}
      >
        <p
          className={s.bgLight}
          style={{
            padding: '.5rem',
            textAlign: 'center',
            lineHeight: 2,
            fontSize: '1.618rem',
          }}
        >
          NEXT 的頁面路由，都是以 pages 這個資料夾為起點。
          <br />
          如果你的頁面在&ensp;
          <code>@/pages/test/index.js</code>，
          <br />
          那你需要輸入的網址是 <code>http://localhost:3000/test/index</code>
          ，<br />
          其中 index 可以省略不寫。
        </p>
      </div>
      <div style={{ marginTop: '2rem' }} className={s.grCenter}>
        <FddBtn href="/" color="primary">
          返回首頁
        </FddBtn>
      </div>
    </div>
  );
}
