// import { Suspense } from 'react';
import NavHeader from './navHeader';
import Footer from './footer';
// import Loading from '@/components/common/loading.js';
// import dynamic from 'next/dynamic';

/**
 * Fundodo 頁面基本架構 | 預設版本
 * @description 請以此元件包住頁面內容
 */
export default function DefaultLayout({ children }) {
  // const Loader = dynamic(() => import('@/components/common/loading'));
  // const Trending = dynamic(() => import('./Trending'), {
  //   ssr: false, loading: () => <Loader />,
  // })
  return (
    <>
      <NavHeader />
      {/* <Suspense fallback={<Loading />}> */}
      <div style={{ marginTop: '80px' }}>{children}</div>
      {/* </Suspense> */}
      <Footer />
    </>
  );
}
