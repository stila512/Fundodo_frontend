import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { GoogleLogin } from '@react-oauth/google';
import scss from './login.module.scss';
import Image from 'next/image';
import lfpic from '@/public/login.svg';
import pswd_icon from '@/public/memberPic/password-icon.svg';
import { AuthContext } from '@/context/AuthContext';
import Link from 'next/link';
import Modal from '@/components/common/modal';
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  // 顯示密碼使用
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState('');

  const openModal = () => {
    console.log('開啟 Modal');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log('關閉 Modal');
    setIsModalOpen(false);
    setError(null);
  };

  const handleEmailChange = (e) => {
    setConfirmEmail(e.target.value);
  };

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
        console.log('回應數據:', data);
        if (data.status === 'success' && data.token) {
          console.log('登入成功，準備呼叫 login() 和 router.push()');
          login(data.token);
          alert('登入成功');
          console.log('登入函數已呼叫，準備重定向');
          router.push('/member/peopleInfoData')
            .then(() => console.log('導航成功'))
            .catch((err) => console.error('導航失敗:', err));
        } else {
          setError(data.message || '登入失敗');
          alert(`登入失敗:\n${data.message || '登入失敗'}`);
        }
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const sendOTP = () => {
    fetch('http://localhost:3005/api/member/email/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: confirmEmail }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          alert('臨時密碼 已發送至您的電子信箱，請檢查您的電子信箱。');
          closeModal();
        } else {
          setError(data.message || '發送 臨時密碼 失敗');
        }
      })
      .catch(error => {
        setError(error.message || '發送 臨時密碼 失敗');
      });
  };


  const handleGoogleSuccess = (response) => {
    const { credential } = response;

    fetch('http://localhost:3005/api/member/google_login/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: credential }),
    })
      .then(response => {
        console.log('API Response:', response);  // 這裡日誌輸出
        return response.json();
      })
      .then(data => {
        console.log('API Data:', data);  // 這裡日誌輸出
        if (data.status === 'success' && data.data && data.data.accessToken) {
          localStorage.setItem('accessToken', data.data.accessToken);
          login(data.data.accessToken);
          router.push('/member/peopleInfoData');
        } else {
          alert(data.message || '登入失敗');
          setError(data.message || '登入失敗');
        }
      })
      .catch(error => {
        console.error('Fetch Error:', error);  // 這裡日誌輸出
        alert(error.message || '登入失敗');
        setError(error.message || '登入失敗');
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
                <div className={scss.passwordarea}>
                  <div><label>密碼</label></div>
                  <div className={scss.passwordicon} onClick={() => setShowPassword(!showPassword)}>
                    <div className={scss.point}>
                      <Image className="imgWrap" src={pswd_icon} alt="Image"
                      />隱藏</div>
                  </div></div>
                <input type={showPassword ? 'text' : 'password'} name="password" required />
                <p>使用8個或以上的字元, 包含字母數字和符號</p>
                <Link href="/member/register">註冊會員</Link>
                <div className={`mt-5 col-6 ${scss.Googleicon}`}>
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={(error) => setError(error.message)}
                  />
                </div>
              </div>
            </div>
            <div className={scss.area3}>
              <p onClick={openModal}> 忘記密碼?</p>
            </div>
            <div className={scss.area4}>
              <button className={scss.createBtn} type="submit"
                disabled={loading}>{loading ? '登入中...' : '登入'}</button>
            </div>
          </form>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          mode={1}
          active={isModalOpen}
          onClose={closeModal}
          confirmText="發送 臨時密碼"
          cancelText="取消"
        >
          <h4>忘記密碼</h4>
          <p>請輸入你的電子信箱，我們將發送臨時密碼。</p>
          <input
            type="email"
            value={confirmEmail}
            onChange={handleEmailChange}
            placeholder="輸入您的電子郵件"
          />
          <button onClick={sendOTP} disabled={!confirmEmail}>
            發送
          </button>
          <button onClick={closeModal}>取消</button>
        </Modal>
      )}
    </main>
  );
}
