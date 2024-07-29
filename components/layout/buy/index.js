import NavHeader from './navHeader';
import Footer from './footer';

/**
 * Fundodo 頁面基本架構 | 購物車版本
 * @description 請以此元件包住頁面內容
 * @warning 此元件已自帶 &lt;main&gt;，請勿重複使用
 */
export default function BuyLayout({ children }) {
  return (
    <>
      <NavHeader />
      <main style={{ marginTop: '70px' }}>{children}</main>
      <Footer />
    </>
  );
}
