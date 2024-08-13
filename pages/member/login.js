import DefaultLayout from '@/components/layout/default';
import scss from './login.module.scss';
import Image from 'next/image';
import lfpic from '@/public/login.svg';
import pswd_icon from '@/public/memberPic/password-icon.svg';

export default function LoginPage() {
  return (
    <main className={scss.Loginmain}>
      <div className={scss.LoginContainer}>
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
              <div className={scss.passwordarea}><div><label>密碼</label></div> <div className={scss.passwordicon}><Image className="imgWrap" src={pswd_icon} alt="Image"
                onClick={() => setShowPassword(!showPassword)}
              />隱藏</div></div>
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
      </div>
    </main>
  );
}
