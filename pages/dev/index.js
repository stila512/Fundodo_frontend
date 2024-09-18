import Head from 'next/head';
import Link from 'next/link';
// import style from '@/styles/style.module.scss';
import FddBtn from '@/components/buttons/fddBtn';
import hs from './devHome.module.scss';
import { IconContext } from 'react-icons';
import { FaArrowRightLong } from 'react-icons/fa6';
import { IoAddCircle, IoArrowUndoSharp } from 'react-icons/io5';

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
                  <Link href="/home">首頁</Link>
                </div>
                <div className="col-6 col-lg-4">
                  <Link href="/prod">商品</Link>
                </div>
                <div className="col-6 col-lg-4">
                  <Link href="/member">會員</Link>
                </div>
                <div className="col-6 col-lg-4">
                  <Link href="/hotel/list">旅館</Link>
                </div>
                <div className="col-6 col-lg-4">
                  <Link href="/article">文章</Link>
                </div>
                <div className="col-6 col-lg-4">
                  <Link href="/course">課程</Link>
                </div>
                <div className="col-6 col-lg-4">
                  <Link href="/buy/cart">購物車</Link>
                </div>
                <div className="col-6 col-lg-4">
                  <Link href="/test">測試用</Link>
                </div>
                <div className="col-6 col-lg-4">
                  <Link href="/dev/gallery-fddbtn">按鈕圖鑑</Link>
                </div>
                <div className="col-6 col-lg-4">
                  <Link href="/dev/gallery-modal">Modal</Link>
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
                <p className="tx-center mt-3">
                  Bootstrap 的語法
                  <FaArrowRightLong />
                  Fundodo 專案的語法
                </p>
                <div className={hs.dlBox}>
                  <dl className={hs.instructionList}>
                    <dt className="tx-center">背景、文字顏色</dt>
                    <dd>
                      <span className='bg-primary tx-shade4 px-3 py-1'>.bg-primary & .tx-shade4</span>
                    </dd>
                    <dd>
                      <span className='bg-info tx-white px-3 py-1'>.bg-info & .tx-white</span>
                    </dd>
                    <dd>
                      <FddBtn color='shade2' outline href='/test/gallery'>所有顏色選項</FddBtn>
                    </dd>
                  </dl>
                  <dl className={hs.instructionList}>
                    <dt className="tx-center">grid system</dt>
                    <dd className="tx-center">語法與 Bootstrap 相同</dd>
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
                      <code>.fx-center</code>
                    </dd>
                    <dd>
                      <span>以 grid 置中</span>
                      <FaArrowRightLong />
                      <code>.gr-center</code>
                    </dd>
                  </dl>
                  <dl className={hs.instructionList}>
                    <dt className="tx-center">flex 相關</dt>
                    <dd>
                      <span>.justify-content-center</span>
                      <FaArrowRightLong />
                      <code>.jc-center</code>
                    </dd>
                    <dd>
                      <span>.justify-content-around</span>
                      <FaArrowRightLong />
                      <code>.jc-around</code>
                    </dd>
                    <dd>
                      <span>.justify-content-between</span>
                      <FaArrowRightLong />
                      <code>.jc-between</code>
                    </dd>
                    <dd>
                      <span>.justify-content-evenly</span>
                      <FaArrowRightLong />
                      <code>.jc-evenly</code>
                    </dd>
                  </dl>
                </div>
              </article>
              <article className="col-12 col-lg-6">
                <h2 className="tx-center">按鈕元件</h2>
                <p className="tx-center">
                  實際的樣式
                  <FaArrowRightLong />
                  Fundodo 專案的語法
                </p>
                <dl className={hs.instructionList}>
                  <dt>一般按鈕</dt>
                  <dd>按鈕的「樣式」與「大小」不會互相干涉，各自所屬不同的 prop</dd>
                  <dd className='vstack gap-3'>
                    <p className='hstack gap-3'>
                      <FddBtn color='primary' callback={() => { }}>預設樣式</FddBtn>
                      <FddBtn color='primary' outline callback={() => { }}>外框樣式</FddBtn>
                    </p>
                    <p>
                      <FaArrowRightLong />
                      <code
                        className="bg-shade4 tx-secondary"
                        style={{ padding: '.5rem' }}
                      >
                        &lt;FddBtn color=&quot;primary&quot;
                        callback=&#123;()
                        =&gt;&#123;&#125;&#125;&gt;&lt;/FddBtn&gt;
                      </code>
                    </p>
                    <p>
                      <FaArrowRightLong />
                      <code
                        className="bg-shade4 tx-secondary"
                        style={{ padding: '.5rem' }}
                      >
                        &lt;FddBtn color=&quot;primary&quot; outline
                        callback=&#123;()
                        =&gt;&#123;&#125;&#125;&gt;&lt;/FddBtn&gt;
                      </code>
                    </p>
                  </dd>
                  <dd className='vstack gap-3'>
                    <p className='hstack gap-3'>
                      <FddBtn color="tint1" size="lg" outline callback={() => { }}>
                        large
                      </FddBtn>
                      <FddBtn color="info" outline callback={() => { }}>
                        預設大小
                      </FddBtn>
                      <FddBtn color="shade3" size="sm" outline callback={() => { }}>
                        small
                      </FddBtn>
                    </p>
                    <p>
                      <FaArrowRightLong />
                      <code
                        className="bg-shade4 tx-secondary"
                        style={{ padding: '.5rem' }}
                      >
                        &lt;FddBtn color=&quot;tint1&quot; size=&quot;lg&quot; outline
                        callback=&#123;()
                        =&gt;&#123;&#125;&#125;&gt;&lt;/FddBtn&gt;
                      </code>
                    </p>
                    <p>
                      <FaArrowRightLong />
                      <code
                        className="bg-shade4 tx-secondary"
                        style={{ padding: '.5rem' }}
                      >
                        &lt;FddBtn color=&quot;info&quot; outline
                        callback=&#123;()
                        =&gt;&#123;&#125;&#125;&gt;&lt;/FddBtn&gt;
                      </code>
                    </p>
                    <p>
                      <FaArrowRightLong />
                      <code
                        className="bg-shade4 tx-secondary"
                        style={{ padding: '.5rem' }}
                      >
                        &lt;FddBtn color=&quot;shade3&quot; size=&quot;sm&quot; outline
                        callback=&#123;()
                        =&gt;&#123;&#125;&#125;&gt;&lt;/FddBtn&gt;
                      </code>
                    </p>
                  </dd>
                  <dt>圓形按鈕</dt>
                  <dd>
                    <p className='hstack gap-3 jc-center'>
                      <FddBtn color="warning" icon callback={() => { }}>
                        <IoAddCircle />
                      </FddBtn>
                      <FddBtn color="warning" icon outline callback={() => { }}>
                        <IoAddCircle />
                      </FddBtn>
                    </p>
                    <p>
                      <FaArrowRightLong />
                      <code
                        className="bg-shade4 tx-secondary"
                        style={{ padding: '.5rem' }}
                      >
                        &lt;FddBtn color=&quot;warning&quot; icon
                        callback=&#123;()
                        =&gt;&#123;&#125;&#125;&gt;&lt;/FddBtn&gt;
                      </code>
                    </p>
                    <p>
                      <FaArrowRightLong />
                      <code
                        className="bg-shade4 tx-secondary"
                        style={{ padding: '.5rem' }}
                      >
                        &lt;FddBtn color=&quot;warning&quot; icon outline
                        callback=&#123;()
                        =&gt;&#123;&#125;&#125;&gt;&lt;/FddBtn&gt;
                      </code>
                    </p>
                  </dd>
                  <dd className='vstack gap-3'>
                    <p className='hstack gap-3'>
                      <FddBtn color="tint1" icon size="lg" outline callback={() => { }}>
                        <IoArrowUndoSharp />
                      </FddBtn>
                      <FddBtn color="info" icon outline callback={() => { }}>
                        <IoArrowUndoSharp />
                      </FddBtn>
                      <FddBtn color="shade3" icon size="sm" outline callback={() => { }}>
                        <IoArrowUndoSharp />
                      </FddBtn>
                    </p>
                    <p>
                      <FaArrowRightLong />
                      <code
                        className="bg-shade4 tx-secondary"
                      >
                        &lt;FddBtn color=&quot;tint1&quot; icon size=&quot;lg&quot; outline
                        callback=&#123;()
                        =&gt;&#123;&#125;&#125;&gt;&lt;/FddBtn&gt;
                      </code>
                    </p>
                    <p>
                      <FaArrowRightLong />
                      <code
                        className="bg-shade4 tx-secondary"
                      >
                        &lt;FddBtn color=&quot;info&quot; icon outline
                        callback=&#123;()
                        =&gt;&#123;&#125;&#125;&gt;&lt;/FddBtn&gt;
                      </code>
                    </p>
                    <p>
                      <FaArrowRightLong />
                      <code
                        className="bg-shade4 tx-secondary"
                      >
                        &lt;FddBtn color=&quot;shade3&quot; icon size=&quot;sm&quot; outline
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
