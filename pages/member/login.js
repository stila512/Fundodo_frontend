import DefaultLayout from '@/components/layout/default';
import scss from './login.module.scss';
import Image from 'next/image';
import lfpic from '@/public/login.svg';

export default function LoginPage() {
  return (
    <main className={scss.LoginContainer}>
      <div className={scss.lfpic}>
        <Image className="imgWrap" src={lfpic} alt="Image" />
      </div>
      <div className={scss.rightText}>
          <div className={scss.area1}>
            <p className={scss.h5}>歡迎回來</p>
          </div>
          <div className={scss.area2}>
            <label>電子郵件地址</label>
            <input type="text" />
            <div>
              <label>密碼</label>
              <input type="text" />
              <p>使用8個或以上的字元, 包含字母數字和符號</p>
            </div>
          </div>
          <div className={scss.area3}>
            <p>忘記密碼?</p>
            </div>
          <div className={scss.area4}>
            <button className={scss.createBtn}>登入</button>
          </div>
        <button className={scss.xBtn}>x</button>
      </div>
    </main>
  );
}
