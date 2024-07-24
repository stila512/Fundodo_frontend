import NavHeader from '@/components/common/navHeader';
import scss from './test.module.scss';

export default function TestPage() {
  return (
    <>
      <NavHeader></NavHeader>
      <main className={scss.container}>
        <div className={scss.btnBox}>
          <button className={scss.bSecondary2}>立即購物</button>
          <button className={scss.bSecondary}>完善會員資料</button>
          <span></span>
        </div>
        {/* <div className={scss.rv 6}> */}
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
  );
}
