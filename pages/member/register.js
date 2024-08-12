import DefaultLayout from '@/components/layout/default';
import scss from './login.module.scss';
import Image from 'next/image';
import lfpic from '@/public/login.svg';

export default function RegisterPage() {
  return (
    <main className={scss.Registermain}>
      <div className={scss.RegisterContainer}>
        <div className={scss.lfpic}>
          <Image className="imgWrap" src={lfpic} alt="Image" />
        </div>
        <div className={scss.rightText}>
          <div>
            <div className={scss.area1}>
              <p className={scss.h5}>建立帳號</p>
              <p>
                已經有帳號了嗎?<span className={scss.loginSpan}>登入</span>
              </p>
            </div>
            <div className={scss.area2}>
              <label>使用者名稱</label>
              <input type="text" />
              <label>電子郵件地址</label>
              <input type="text" />
              <div>
                <label>密碼</label>
                <input type="text" />
                <p>使用8個或以上的字元, 包含字母數字和符號</p>
              </div>
              <div>
                <label>再次確認密碼</label>
                <input type="text" />
                <p>使用8個或以上的字元, 包含字母數字和符號</p>
              </div>
            </div>
            <div className={scss.area3}>
              <p>創建帳號即表示您同意我們的<span className={scss.a3Span}>使用條款</span> 和<span className={scss.a3Span}>隱私政策</span>。</p>
            </div>
            <div className={scss.area4}>
              <button className={scss.createBtn}>建立帳號</button>
              <p>
                已經有帳號了嗎?<span className={scss.loginSpan}>登入</span>
              </p>
            </div>
          </div>
          <button className={scss.xBtn}>x</button>
        </div>
      </div>

    </main>
  );
}
