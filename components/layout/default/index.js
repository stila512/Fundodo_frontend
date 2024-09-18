import { Suspense } from 'react';
import NavHeader from './navHeader';
import Footer from './footer';
import Loading from '@/components/common/loading.js';
import GoTop from '@/components/common/goTop';
import MobileBtmNav from '../MobileBtmNav';

/**
 * Fundodo 頁面基本架構 | 預設版本
 * @description 請以此元件包住頁面內容
 */
export default function DefaultLayout({ children }) {
  // todo: implement dynamic marginTop of header by useRef
  return (
    <>
      {/* <Suspense fallback={<Loading />}> */}
      <NavHeader />
      <div style={{ marginTop: '80px' }}>{children}</div>
      <GoTop />
      <Footer />
      <MobileBtmNav />
      {/* </Suspense> */}
    </>
  );
}
