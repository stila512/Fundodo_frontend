import Logo from '@/components/common/logo';
import s from '../footer.module.scss';
import { FaChevronRight } from 'react-icons/fa';
// import Image from 'next/image';

const UlIcon = () => (
  <div className={s.ulIcon}>
    <FaChevronRight />
  </div>
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
        <section className="mx-auto">
          <Logo width={300}></Logo>
          <p className='mt-5 tx-center'>
            Copyright © 2024 Fundodo
            <br />
            All Rights Reserved
          </p>
        </section>
      </div>
    </footer>
  );
}
