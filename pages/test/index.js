import NavHeader from '@/components/common/navHeader';
import FddBtn from '@/components/buttons/fddBtn.js';
import scss from './test.module.scss';

export default function TestPage() {
  return (
    <>
      <NavHeader></NavHeader>
      <main className={scss.container}>
        <div className={scss.row}>
          <div className={scss.col6}>
            <div className={scss.msgRegisterSuccess}>
              <h2>會員註冊成功</h2>
              <p>歡迎加入Fundod翻肚肚</p>
              <p>您現在已登入</p>
              <div className={scss.btnBox}>
                <FddBtn color="secondary" outline href="#">
                  立即購物
                </FddBtn>
                <FddBtn color="secondary" href="#">
                  完善會員資料
                </FddBtn>
              </div>
              <div className={scss.btnBox}></div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
