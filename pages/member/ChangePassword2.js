import DefaultLayout from '@/components/layout/default';
import { useState, useEffect, useContext, useRef } from 'react';
import { useRouter } from 'next/router';
import { AuthProvider, AuthContext } from '@/context/AuthContext';
import scss from './info.module.scss';
import Image from 'next/image';
import SideText from '@/components/member/SideText';
import SideText_2 from '@/components/member/SideText_2';
import Link from 'next/link';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import pswd_icon from '@/public/memberPic/password-icon.svg';
import Loading from '@/components/common/loading';
export default function ChangePassword() {
  useAuthRedirect();
  const { user: authUser, loading: authLoading } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false)

  const [user, setUser] = useState({
    password: '',
    repassword: '',
    email: authUser?.email || 'example@gmail.com',
  })

  const router = useRouter();

  const fetchgetMember = (uuid) => {
    const url = `http://localhost:3005/api/member/${uuid}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(`错误 ${response.status}: ${errorData.message}`);
          });
        }
        return response.json();
      })
      .then(data => {
        if (data.status === 'success') {
          setUser(data.result);
        } else {
          setError(data.message);
        }
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
    const newErrors = { password: '', repassword: '' };

    // 開始檢查
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
    const hasErrors = Object.values(newErrors).some((v) => v);

    // 如果有錯誤發生，停止接下來的送到伺服器程式碼
    if (hasErrors) {
      const errorMessages = Object.values(newErrors).filter(v => v).join('\n');
      alert(`請修正以下錯誤:\n${errorMessages}`);
      return;
    }
    // 表單檢查--- END ---

    const formData = new FormData();
    formData.append('password', user.password);

    // 提交表單到伺服器
    try {
      const url = `http://localhost:3005/api/member/ChangePassword/${authUser.uuid}`;
      const res = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      const resData = await res.json();

      if (res.ok) {
        alert('修改成功');
        router.push('/member/peopleInfoData');
      } else {
        // 從後端獲取錯誤信息並顯示
        const errorMessages = resData.message || '修改失敗';
        alert(`修改失敗:\n${errorMessages}`);
      }
    } catch (e) {
      console.error(e);
      alert('修改失敗');
    }
  };

  useEffect(() => {
    if (authLoading) return;

    let timeoutId;

    if (authUser === null) {
      // 如果 authUser 為 null，則延遲2秒後刷新頁面
      timeoutId = setTimeout(() => {
        router.reload();
      }, 1000); // 0.5秒延遲
    } else if (authUser && authUser.uuid) {
      fetchgetMember(authUser.uuid);
    } else {
      setErrors('User not authenticated');
      setLoading(false);
    }

    // 清理函數，清除超時操作
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [authUser, authLoading, router]);

  return (
    <>
      <div className="col-12 d-lg-none">
        <SideText_2 layoutType={0} />
      </div>
      <main className={scss.ChangePasswordContainer}>
        <div className="col-1 col-lg-3"></div>
        <div className="col-10 col-lg-6">
          <form className={`${scss.maintext} col-12 col-lg-5`} onSubmit={handleSubmit}>
            <div className="col-1 col-md-2 col-lg-3"></div>
            <div className="col-10 col-md-8 col-lg-6">
              <div className={`${scss.toptext} my-5`}>
                <div className={`${scss.toptexta1} col-3 col-lg-2`}>
                  <div>Email </div>
                  <div>新密碼</div>
                  <div>確認新密碼</div>
                </div>
                <div className={`col-1 col-lg-2`}></div>
                <div className={`${scss.toptexta2} col-8`}>
                  <div>{user.email || 'example@gmail.com'}</div>
                  <div className={`${scss.icon_password}`} >
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="密碼"
                      value={user.password}
                      onChange={handleFieldChange}
                      required
                    />
                    <div className={`${scss.imgWrap}`}>
                      <Image className="imgWrap" src={pswd_icon} alt="Image" onClick={() => setShowPassword(!showPassword)}
                      />
                    </div>
                  </div>
                  <div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="repassword"
                      placeholder="確認新密碼"
                      value={user.repassword}
                      onChange={handleFieldChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className={`${scss.botBTN} my-5`}>
                <button type="submit" className={`${scss.btn2}`}>確認送出</button>
              </div>
            </div>
            <div className="col-1 col-md-2 col-lg-3">
            </div>
          </form>
        </div>
        <div className="col-1 col-lg-3 d-none d-lg-block my-5 mx-5">
          <SideText activeIndex={3} />
        </div>
      </main>
    </>
  );
}
ChangePassword.layout = DefaultLayout;
