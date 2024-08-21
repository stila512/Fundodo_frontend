import { useState } from 'react';
import DefaultLayout from '@/components/layout/default';
import scss from './login.module.scss';
import Image from 'next/image';
import lfpic from '@/public/login.svg';
import pswd_icon from '@/public/memberPic/password-icon.svg';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

export default function RegisterPage() {
  // 狀態使用物件類型，物件中的屬性名稱對應到欄位的名稱(name屬性)
  const [user, setUser] = useState({
    nickname: '',
    password: '',
    email: '',
  })

  // 記錄欄位錯誤訊息用
  const [errors, setErrors] = useState({
    nickname: '',
    password: '',
    email: '',
  })

  // 顯示密碼使用
  const [showPassword, setShowPassword] = useState(false)

  // 多欄位共用事件處理函式
  const handleFieldChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  // 表單送出事件處理函式
  const handleSubmit = async (e) => {
    // 先阻擋form表單元件的預設送出行為
    e.preventDefault()

    // 表單檢查--- START ---
    // 建立一個新的錯誤訊息物件
    const newErrors = { nickname: '', password: '', email: '' , repassword: '' }

    // 開始檢查
    // if (user.username === '') {
    // if(user.username) 檢查如果有填寫
    // if(!user.username) 檢查如果沒填的話…
    if (!user.nickname) {
      newErrors.nickname = '使用者名稱為必填'
    }

    if (!user.email) {
      newErrors.email = '電子郵箱為必填'
    }
    if (!user.password) {
      newErrors.password = '密碼為必填'
    }
    if (!user.repassword) {
      newErrors.repassword = '重複密碼為必填'
    }
    if (user.password !== user.repassword) {
      newErrors.password = '密碼與重複密碼不一致';
      newErrors.repassword = '密碼與重複密碼不一致'
    }

    if (user.password.length < 8 || user.password.length > 16) {
      newErrors.password ||= '密碼最少8個字元至多16字元'
    }

    // 檢查完成後設定到錯誤狀態
    setErrors(newErrors)

    // newErrors物件中如果有屬性值不是空白字串時，代表有錯誤發生
    const hasErrors = Object.values(newErrors).some((v) => v)

    // 如果有錯誤發生，停止接下來的送到伺服器程式碼
    if (hasErrors) {
      const errorMessages = Object.values(newErrors).filter(v => v).join('\n');
      alert(`請修正以下錯誤:\n${errorMessages}`);
      return;
    }
    // 表單檢查--- END ---

    const formData = new FormData();
    formData.append('nickname', user.nickname);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('uuid', uuidv4());

    // 提交表單到伺服器
    try {
      const url = 'http://localhost:3005/api/member/register';
      const res = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      const resData = await res.json();
      
      if (res.ok) {
        alert('註冊成功');
      } else {
        // 從後端獲取錯誤信息並顯示
        const errorMessages = resData.message || '註冊失敗';
        alert(`註冊失敗:\n${errorMessages}`);
      }
    } catch (e) {
      console.error(e);
      alert('註冊失敗');
    }
  };




  return (
    <main className={scss.Registermain}>
      <form onSubmit={handleSubmit}>
        <div className={scss.RegisterContainer}>
          <div className={scss.lfpic}>
            <Image className="imgWrap" src={lfpic} alt="Image" />
          </div>
          <div className={scss.rightText}>
            <div>
              <div className={scss.area1}>
                <p className={scss.h5}>建立帳號</p>
                <p>
                  已經有帳號了嗎?<Link href="/member/login"><span className={scss.loginSpan}>登入</span></Link>
                </p>
              </div>
              <div className={scss.area2}>
                <label>暱稱</label>
                <input
                  type="text"
                  name="nickname"
                  value={user.nickname}
                  onChange={handleFieldChange}
                />
                <label>電子郵件地址</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleFieldChange}
                />
                <div>
                  <div className={scss.passwordarea}><div><label>密碼</label></div> <div className={scss.passwordicon}><Image className="imgWrap" src={pswd_icon} alt="Image"
                    onClick={() => setShowPassword(!showPassword)}
                  />隱藏</div></div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={user.password}
                    onChange={handleFieldChange}
                  />
                  <p>使用8個或以上的字元, 包含字母數字和符號</p>
                </div>
                <div>
                  <div className={scss.passwordarea}><div><label>再次確認密碼</label></div> <div className={scss.passwordicon}><Image className="imgWrap" src={pswd_icon} alt="Image"
                    onClick={() => setShowPassword(!showPassword)}
                  />隱藏</div></div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="repassword"
                    value={user.repassword}
                    onChange={handleFieldChange}
                  />
                  <p>使用8個或以上的字元, 包含字母數字和符號</p>
                </div>
              </div>
              <div className={scss.area3}>
                <p>創建帳號即表示您同意我們的<span className={scss.a3Span}>使用條款</span> 和<span className={scss.a3Span}>隱私政策</span>。</p>
              </div>
              <div className={scss.area4}>
                <button type="submit" className={scss.createBtn}>建立帳號</button>
                <p>
                  已經有帳號了嗎?<Link href="/member/login"><span className={scss.loginSpan}>登入</span></Link>
                </p>
              </div>
            </div>
            <div className={scss.xBtn}>x</div>
          </div>
        </div>
      </form>
    </main>
  );
}
