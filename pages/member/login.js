import { useState } from 'react';
import { useRouter } from 'next/router';
import DefaultLayout from '@/components/layout/default';
import scss from './login.module.scss';
import Image from 'next/image';
import lfpic from '@/public/login.svg';
import pswd_icon from '@/public/memberPic/password-icon.svg';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export default function LoginPage() {
  // 顯示密碼使用
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    fetch('http://localhost:3005/api/member/login', {
      method: 'POST',
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(`錯誤 ${response.status}: ${errorData.message}`);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Response Data:', data);
        if (data.status === 'success' && data.token) {
          console.log('Login successful, about to call login() and router.push()');
          login(data.token);
          alert('登入成功');
          console.log('Login function called, about to redirect');
          router.push('/member')
            .then(() => console.log('Navigation successful'))
            .catch((err) => console.error('Navigation failed:', err));
        } else {
          setError(data.message || '登入失败');
          alert(`登入失败:\n${data.message || '登入失败'}`);
        }
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
          <form onSubmit={handleLogin}>
            <div className={scss.area2}>
              <label>電子郵件地址</label>
              <input type="email" name="email" required />
              <div>
                <div className={scss.passwordarea}><div><label>密碼</label></div> <div className={scss.passwordicon}><Image className="imgWrap" src={pswd_icon} alt="Image"
                  onClick={() => setShowPassword(!showPassword)}
                />隱藏</div></div>
                <input type={showPassword ? 'text' : 'password'} name="password" required />
                <p>使用8個或以上的字元, 包含字母數字和符號</p>
              </div>
            </div>
            <div className={scss.area3}>
              <p>忘記密碼?</p>
            </div>
            <div className={scss.area4}>
              <button className={scss.createBtn} type="submit"
                disabled={loading}>{loading ? '登入中...' : '登入'}</button>
            </div>
          </form>
          <button className={scss.xBtn}>x</button>
        </div>
      </div>
    </main>
  );
}
