//== Parameters ================================================================
import { breakpoints } from '@/configs';
//== Functions =================================================================
import { useState, useEffect } from 'react';
import useScreenWidth from '@/hooks/useScreenWidth';
//== Components ================================================================
import Logo from '@/components/common/logo';
//== Styles =================================================================
import s from '../footer.module.scss';
import { FaChevronRight } from 'react-icons/fa';
import { GoPlus } from "react-icons/go";

const UlIcon = ({ active = true }) => active && (
  <span className={s.ulIcon}>
    <FaChevronRight />
  </span>
);
const PlusIcon = ({ active = true }) => active && (
  <span className={s.plusIcon}>
    <GoPlus />
  </span>
);

/**
 * 頁尾 | Fundodo 頁面基本架構
 */
export default function Footer() {
  const screenWidth = useScreenWidth();
  const [w__screen, setW__screen] = useState(1920);
  // 0 | off ; 1, 2, 3 | on
  const [activeIndex, setActiveIndex] = useState(0);
  const isMd = (w__screen >= breakpoints.md);

  useEffect(() => {
    setW__screen(screenWidth);

    if (screenWidth >= breakpoints.md) setActiveIndex(0);
  }, [screenWidth]);

  const handleList = index => {
    (activeIndex === index) ? setActiveIndex(0) : setActiveIndex(index);
  };

  return (
    <footer className={s.foo}>
      {/* footer h: 454 */}
      <div className={[s.fooBody, 'container-lg'].join(' ')}>
        {/* h: 302 */}
        <div className="row w-100">
          <div className="col-12 col-lg-4">
            <section className={s.fooL}>
              <Logo wrapClass={['img-wrap-w100', s.logoWrap].join(' ')} />
              <p className={['d-none d-lg-block', s.copyright].join(' ')}>
                Copyright © 2024 Fundodo
                <br />
                All Rights Reserved
              </p>
            </section>
          </div>
          <div className="col-12 col-lg-8">
            <section className={s.fooR}>
              <div className="d-flex flex-row jc-between ai-center"
                onClick={() => handleList(1)}
              >
                <h3>
                  <span>關於翻肚肚</span><PlusIcon active={!isMd} />
                </h3>
                {(isMd || activeIndex === 1) && (
                  <ul>
                    <li>
                      <a href="#"><UlIcon active={isMd} />關於我們</a>
                    </li>
                    <li>
                      <a href="/member/peopleInfoData">
                        <UlIcon active={isMd} />
                        會員專區
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <UlIcon active={isMd} />
                        隱私政策
                      </a>
                    </li>
                  </ul>
                )}
              </div>
              <div className="d-flex flex-row jc-between ai-center"
                onClick={() => handleList(2)}
              >
                <h3>
                  <span>客戶服務</span><PlusIcon active={!isMd} />
                </h3>
                {(isMd || activeIndex === 2) && (
                  <ul>
                    <li>
                      <a href="#">
                        <UlIcon active={isMd} />
                        常見問題
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <UlIcon active={isMd} />
                        聯絡我們
                      </a>
                    </li>
                  </ul>
                )}
              </div>
              <div className="d-flex flex-row jc-between ai-center"
                onClick={() => handleList(3)}
              >
                <h3>
                  <span>聯絡方式</span><PlusIcon active={!isMd} />
                </h3>
                {(isMd || activeIndex === 3) && (
                  <ul>
                    <li>
                      <a href="#">
                        <UlIcon active={isMd} />
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <UlIcon active={isMd} />
                        Instagram
                      </a>
                    </li>
                  </ul>
                )}
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
