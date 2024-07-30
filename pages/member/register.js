import DefaultLayout from '@/components/layout/default';
import scss from './login.module.scss';
import Image from 'next/image';
import lfpic from '@/public/login.svg';

export default function RegisterPage() {
  return (
    <main className={scss.RegisterContainer}>
      <div className={scss.lfpic}>
        <Image className="imgWrap" src={lfpic} alt="Image" />
      </div>
      <div className={scss.rightText}>
        <div>
          <div className={scss.area1}>
            <p className={scss.h5}>建立帳號</p>
            <p>
              已經有帳號了嗎?<span>登入</span>
            </p>
          </div>
          <div className={scss.area2}>
            <p>使用者名稱</p>
            <input type="text" />
            <p>電子郵件地址</p>
            <input type="text" />
            <div>
              <p>密碼</p>
              <input type="text" />
              <p>使用8個或以上的字元, 包含字母數字和符號</p>
            </div>
            <div>
              <p>再次確認密碼</p>
              <input type="text" />
              <p>使用8個或以上的字元, 包含字母數字和符號</p>
            </div>
          </div>
          <p>創建帳號即表示您同意我們的使用條款 和 隱私政策。</p>
          <div className={scss.area3}>
            <button>建立帳號</button>
            <p>
              已經有帳號了嗎?<span>登入</span>
            </p>
          </div>
        </div>
        <button>x</button>
      </div>
    </main>
  );
}
RegisterPage.layout = DefaultLayout;
