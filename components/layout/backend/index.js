import React from 'react'
import Header from './header'
import SideBar from './sideBar'
import scss from './index.module.scss'

export default function BackendLayout({ children }) {
  return (
    <div className={scss.container}>
    <div className={scss.sideBarWrapper}>
      <SideBar />
    </div>
    <div className={scss.mainContent}>
      <Header />
      <main className={scss.main}>
        {children}
      </main>
    </div>
  </div>
  )
}