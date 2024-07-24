import Head from 'next/head';
import style from '@/styles/style.module.scss';
import hs from './home.module.scss';
import { IconContext } from 'react-icons';
import { FaArrowRightLong } from 'react-icons/fa6';

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section>
          <h1 className={hs.h1}>這是開發用的首頁</h1>
          <h2 className={hs.h2}>通往各開發中頁面的捷徑</h2>
          <div className={style.container}>
            <div className={[hs.linkPanel, style.row, style.g3].join(' ')}>
              <div className={[style.col6, style.col_lg4].join(' ')}>
                <a href="">首頁</a>
              </div>
              <div className={[style.col6, style.col_lg4].join(' ')}>
                <a href="">商品</a>
              </div>
              <div className={[style.col6, style.col_lg4].join(' ')}>
                <a href="">會員</a>
              </div>
              <div className={[style.col6, style.col_lg4].join(' ')}>
                <a href="">旅館</a>
              </div>
              <div className={[style.col6, style.col_lg4].join(' ')}>
                <a href="">文章</a>
              </div>
              <div className={[style.col6, style.col_lg4].join(' ')}>
                <a href="">課程</a>
              </div>
            </div>
          </div>
        </section>
        <section className={style.container}>
          <h1 className={hs.h1}>開發指南</h1>
          <h2 className={hs.h2}>可以使用的樣式</h2>
          <p style={{ textAlign: 'center' }}>
            <IconContext.Provider
              value={{ style: { verticalAlign: 'middle' } }}
            >
              Bootstrap 的語法
              <FaArrowRightLong />
              Fundodo 專案的語法
            </IconContext.Provider>
          </p>
          <div className={hs.dlBox}>
            <IconContext.Provider
              value={{ style: { verticalAlign: 'middle' } }}
            >
              <dl className={hs.instructionList}>
                <dt>背景、文字顏色</dt>
                <dd>
                  <span>.bg-primary</span>
                  <FaArrowRightLong />
                  <code>.bgPrimary</code>
                </dd>
                <dd>
                  <span>.bg-secondary</span>
                  <FaArrowRightLong />
                  <code>.bgSecondary</code>
                </dd>
                <dd>
                  <span>.text-primary</span>
                  <FaArrowRightLong />
                  <code>.txPrimary</code>
                </dd>
                <dd>
                  <span>.text-danger</span>
                  <FaArrowRightLong />
                  <code>.txError</code>
                </dd>
              </dl>
              <dl className={hs.instructionList}>
                <dt>grid system</dt>
                <dd>
                  <span>.col-6</span>
                  <FaArrowRightLong />
                  <code>.col6</code>
                </dd>
                <dd>
                  <span>.col-md-6</span>
                  <FaArrowRightLong />
                  <code>.col_md6</code>
                </dd>
                <dd>
                  <span>.row-cols-4</span>
                  <FaArrowRightLong />
                  <code>.rowCols4</code>
                </dd>
              </dl>
            </IconContext.Provider>
          </div>
        </section>
      </main>
    </>
  );
}
