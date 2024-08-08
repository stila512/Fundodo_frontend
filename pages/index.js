import Head from 'next/head';
import Link from 'next/link';
// import style from '@/styles/style.module.scss';
import FddBtn from '@/components/buttons/fddBtn';
import hs from './devHome.module.scss';
import { IconContext } from 'react-icons';
import { FaArrowRightLong } from 'react-icons/fa6';
import { IoAddCircle } from 'react-icons/io5';

export default function Home() {
  return (
    <>
      <Head>
        <title>首頁 | 開發用</title>
      </Head>
      <main className="bg-light">
        <IconContext.Provider
          value={{ style: { marginInline: '1rem', verticalAlign: 'middle' } }}
        >
          <section>
            <h1 className="tx-center">這是開發用的首頁</h1>
            <h2 className="tx-center">通往各開發中頁面的捷徑</h2>
            <div className="container">
              <div className={`${hs.linkPanel} row g-3`}>
                <div className="col-6 col-lg-4">
                  <Link href="/homepage">首頁</Link>
                </div>
                <div className="col-6 col-lg-4">
                  <Link href="/prod">商品</Link>
                </div>
                <div className="col-6 col-lg-4">
                  <Link href="/member">會員</Link>
                </div>
                <div className="col-6 col-lg-4">
                  <Link href="/hotel">旅館</Link>
                </div>
                <div className="col-6 col-lg-4">
                  <Link href="/article">文章</Link>
                </div>
                <div className="col-6 col-lg-4">
                  <Link href="/course">課程</Link>
                </div>
                <div className="col-6 col-lg-4">
                  <Link href="/buy/cart/cartPage">購物車</Link>
                </div>
                <div className="col-6 col-lg-4">
                  <Link href="/test/">測試用</Link>
                </div>
              </div>
            </div>
          </section>
          <section className="container">
            <h1 className="tx-center" style={{ margin: '5rem 0 3rem' }}>
              開發指南
            </h1>
            <div className="row">
              <article className="col-12 col-lg-6">
                <h2 className="tx-center">可以使用的樣式</h2>
                <p className="tx-center">
                  Bootstrap 的語法
                  <FaArrowRightLong />
                  Fundodo 專案的語法
                </p>
                <div className={hs.dlBox}>
                  <dl className={hs.instructionList}>
                    <dt className="tx-center">背景、文字顏色</dt>
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
                    <dt className="tx-center">grid system</dt>
                    <dd>
                      <span>.col-6</span>
                      <FaArrowRightLong />
                      <code>.col-6</code>
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
                  <dl className={hs.instructionList}>
                    <dt className="tx-center">置中</dt>
                    <dd>
                      <span>.text-center</span>
                      <FaArrowRightLong />
                      <code>.tx-center</code>
                    </dd>
                    <dd>
                      <span>以 flex 置中</span>
                      <FaArrowRightLong />
                      <code>.fxCenter</code>
                    </dd>
                    <dd>
                      <span>以 grid 置中</span>
                      <FaArrowRightLong />
                      <code>.grCenter</code>
                    </dd>
                  </dl>
                  <dl className={hs.instructionList}>
                    <dt className="tx-center">flex 相關</dt>
                    <dd>
                      <span>.d-flex</span>
                      <FaArrowRightLong />
                      <code>.dFlex</code>
                    </dd>
                    <dd>
                      <span>.justify-content-center</span>
                      <FaArrowRightLong />
                      <code>.jcCenter</code>
                    </dd>
                    <dd>
                      <span>.justify-content-around</span>
                      <FaArrowRightLong />
                      <code>.jcAround</code>
                    </dd>
                    <dd>
                      <span>.justify-content-between</span>
                      <FaArrowRightLong />
                      <code>.jcBetween</code>
                    </dd>
                    <dd>
                      <span>.justify-content-evenly</span>
                      <FaArrowRightLong />
                      <code>.jcEvenly</code>
                    </dd>
                  </dl>
                </div>
              </article>
              <article className="col-12 col-lg-6">
                <h2 className="tx-center">按鈕元件</h2>
                <p className="tx-center">
                  Bootstrap 的語法
                  <FaArrowRightLong />
                  實際的樣式
                  <FaArrowRightLong />
                  Fundodo 專案的語法
                </p>
                <dl className={hs.instructionList}>
                  <dt>一般按鈕</dt>
                  <dd>
                    <p>
                      <span>.btn-primary</span>
                      <FaArrowRightLong />
                      <FddBtn href="#">人家是按鈕</FddBtn>
                    </p>
                    <p>
                      <FaArrowRightLong />
                      <code
                        className="bg-shade4 tx-secondary"
                        style={{ padding: '.5rem' }}
                      >
                        &lt;FddBtn
                        href=&quot;#&quot;&gt;人家是按鈕&lt;/FddBtn&gt;
                      </code>
                    </p>
                  </dd>
                  <dd>
                    <p>
                      <span>.btn-secondary</span>
                      <FaArrowRightLong />

                      <FddBtn color="info" outline callback={() => {}}>
                        人家是按鈕
                      </FddBtn>
                    </p>
                    <p>
                      <span>使用 $tint3</span>
                      <FaArrowRightLong />

                      <FddBtn color="tint3" outline callback={() => {}}>
                        人家是按鈕
                      </FddBtn>
                    </p>
                    <p>
                      <FaArrowRightLong />

                      <code
                        className="bg-shade4 tx-secondary"
                        style={{ padding: '.5rem' }}
                      >
                        &lt;FddBtn color=&quot;secondary&quot; outline
                        callback=&#123;()
                        =&gt;&#123;&#125;&#125;&gt;&lt;/FddBtn&gt;
                      </code>
                    </p>
                  </dd>
                  <dt>圓形按鈕</dt>
                  <dd>
                    <p>
                      <span>.btn-secondary</span>
                      <FaArrowRightLong />

                      <FddBtn color="error" icon callback={() => {}}>
                        <IoAddCircle />
                      </FddBtn>
                    </p>
                    <p>
                      <FaArrowRightLong />
                      <code
                        className="bg-shade4 tx-secondary"
                        style={{ padding: '.5rem' }}
                      >
                        &lt;FddBtn color=&quot;secondary&quot; icon
                        callback=&#123;()
                        =&gt;&#123;&#125;&#125;&gt;&lt;/FddBtn&gt;
                      </code>
                    </p>
                  </dd>
                </dl>
              </article>
              <article className="col-12 col-lg-6">
                <h2>
                  <a
                    href="https://react-icons.github.io/react-icons/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    React icons
                  </a>
                </h2>
                <dl>
                  <dt>小圖示的圖庫</dt>
                  <dd>其大小會繼承該層的 font-size</dd>
                  <dd>其顏色會繼承該層的 color</dd>
                  <dd>若要手動改變，需要透過此 API 設計的 context</dd>
                </dl>
              </article>
              <article className="col-12 col-lg-6">
                <h2 className={hs.h2}>常用連結</h2>
                <ul>
                  <li>
                    <span>小圖示庫：</span>
                    <a
                      href="https://react-icons.github.io/react-icons/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      React-icons
                    </a>
                  </li>
                  <li>
                    <span>專案 Figma：</span>
                    <a
                      href="https://www.figma.com/design/Q0KSE3JdYNKX3m1V2Hvnjf/fundodo-%E5%85%B1%E7%94%A8?node-id=93-69&t=E9X3RBeM4LSV4bUr-0"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      React-icons
                    </a>
                  </li>
                </ul>
              </article>
            </div>
          </section>
        </IconContext.Provider>
      </main>
    </>
  );
}
