import Image from 'next/image'
import scss from '@/styles/pages/test.module.scss'

export default function TestPage() {
  return (
    <>
      <header className="test">
        <div className="container">
          <div className={`${scss.logo} ${scss.imgWrap} ${scss.tPrimary}`}>
            <Image
              src="../assets/logo_temp.png"
              alt="FUNDODO logo"
              width={210}
              height={300}
            />
          </div>
          <nav>
            <ul>
              <li>
                <a href="#">首頁</a>
              </li>
              <li>
                <a href="#">商品列表</a>
              </li>
              <li>
                <a href="#">線上課程</a>
              </li>
              <li>
                <a href="#">寵物旅館</a>
              </li>
              <li>
                <a href="#">討論區</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className={scss.container}>
        <div className={scss.btnBox}>
          <button className={scss.bSecondary2}>立即購物</button>
          <button className={scss.bSecondary}>完善會員資料</button>
        </div>
        {/* <div className={scss.row}>
            <div className={scss.col - 6}> */}
        {/* <div className="msg-register-success">
                <h2>會員註冊成功</h2>
                <p>歡迎加入Fundod翻肚肚</p>
                <p>您現在已登入</p>
                <div className="btn-box">
                  <button className="btn-secondary-2">立即購物</button>
                  <button className="btn-secondary">完善會員資料</button>
                </div>
              </div> */}
        {/* </div>
          </div> */}
      </main>
    </>
  )
}
