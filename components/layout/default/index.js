import { useState, useEffect, useContext } from 'react';
import { AuthProvider, AuthContext } from '@/context/AuthContext';
import NavHeader from './navHeader';
import Footer from './footer';

/**
 * Fundodo 頁面基本架構 | 預設版本
 * @description 請以此元件包住頁面內容
 */
export default function DefaultLayout({ children }) {
  const { logout } = useContext(AuthContext);
  return (
    <>
      <NavHeader />
      <div style={{ marginTop: '70px' }}>{children}</div>
      <Footer />
    </>
  );
}
