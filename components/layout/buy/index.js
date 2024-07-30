import NavHeader from './navHeader';
import Footer from './footer';

/**
 * Fundodo 頁面基本架構 | 購物車版本
 * @description 請以此元件包住頁面內容
 */
export default function BuyLayout({ children }) {
  return (
    <>
      <NavHeader />
      <div style={{ marginTop: '70px' }}>{children}</div>
      <Footer />
    </>
  );
}
