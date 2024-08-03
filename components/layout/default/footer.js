import Logo from '@/components/common/logo';
import s from '../footer.module.scss';
import { FaChevronRight } from 'react-icons/fa';
// import Image from 'next/image';

const UlIcon = () => (
  <span className={s.ulIcon}>
    <FaChevronRight />
  </span>
);

/**
 * 頁尾 | Fundodo 頁面基本架構
 */
export default function Footer() {
  return (
    <footer className={s.foo}>
      {/* footer h: 454 */}
      <div className={[s.fooBody, 'container-lg'].join(' ')}>
        {/* h: 302 */}
        <div className="row w-100">
          <div className="col-12 col-lg-4">
            <section className={s.fooL}>
              <Logo width={213}></Logo>
              <p className={['d-none d-lg-block', s.copyright].join(' ')}>
                Copyright © 2024 Fundodo
                <br />
                All Rights Reserved
              </p>
            </section>
          </div>
          <div className="col-12 col-lg-8">
            <section className={s.fooR}>
              <div className="d-flex flex-row">
                <h3 className="">關於翻肚肚</h3>
                <ul>
                  <li>
                    <a href="#"><UlIcon />關於我們</a>
                  </li>
                  <li>
                    <a href="#">
                      <UlIcon></UlIcon>
                      會員專區
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <UlIcon></UlIcon>
                      隱私政策
                    </a>
                  </li>
                </ul>
              </div>
              <div className="d-flex flex-row">
                <h3>客戶服務</h3>
                <ul>
                  <li>
                    <a href="#">
                      <UlIcon></UlIcon>
                      常見問題
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <UlIcon></UlIcon>
                      聯絡我們
                    </a>
                  </li>
                </ul>
              </div>
              <div className="d-flex flex-row">
                <h3>聯絡方式</h3>
                <ul>
                  <li>
                    <a href="#">
                      <UlIcon></UlIcon>
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <UlIcon></UlIcon>
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </section>
          </div>
          <div className="col-12 d-block d-lg-none">
            <p className={['tx-center', s.copyright].join(' ')}>
              Copyright © 2024 Fundodo
              <br />
              All Rights Reserved
            </p>
          </div>

        </div>


      </div>
    </footer>
  );
}
