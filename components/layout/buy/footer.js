import Logo from '@/components/common/logo';
import s from '../footer.module.scss';

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
          <Logo wrapClass={['img-wrap-w100', s.logoWrap].join(' ')} />
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
