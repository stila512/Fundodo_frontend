import { useState, useEffect, useContext } from 'react';
import DefaultLayout from '@/components/layout/default';
import scss from './info.module.scss';
import Image from 'next/image';
import avatarPic from '@/public/memberPic/head.svg';
import radio from '@/public/memberPic/radio.svg';
import SideText from '@/components/member/SideText';
import SideText_2 from '@/components/member/SideText_2';
import Link from 'next/link';
import { AuthProvider, AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import useAuthRedirect from '@/hooks/useAuthRedirect';

import Modal from '@/components/common/modal';
import { GoCheck } from "react-icons/go";
import FddBtn from '@/components/buttons/fddBtn';
import Head from 'next/head';
import Loading from '@/components/common/loading';

export default function PeopleInfoData() {
  const router = useRouter();
  useAuthRedirect();
  const { user: authUser, loading: authLoading } = useContext(AuthContext);
  const [user, setUser] = useState({
    nickname: '',
    password: '',
    email: '',
  })
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const [confirmEmail, setConfirmEmail] = useState('');
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleEmailChange = (e) => {
    setConfirmEmail(e.target.value);
  };

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // 頁面是否載入完 authUser
  const [isYetOpening, setIsYetOpening] = useState(true);

  const fetchgetMember = (uuid) => {
    const url = `http://localhost:3005/api/member/${uuid}`;

    fetch(url)
      .then(async response => {
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`錯誤 ${response.status}: ${errorData.message}`);
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

  const handleDeleteUser = () => {
    if (confirmEmail !== user.email) {
      alert('電子信箱不匹配，無法刪除帳號');
      return;
    }

    const url = `http://localhost:3005/api/member/deleteUser/${authUser.uuid}`;
    const token = localStorage.getItem('token');

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(async response => {
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || '刪除失敗');
        }
        return response.json();
      })
      .then(data => {
        if (data.status === 'success') {
          alert('用戶已刪除');
          localStorage.removeItem('token');
          localStorage.removeItem(`userData_${authUser.uuid}`);
          router.push('/member/login');
        } else {
          alert('刪除失敗: ' + data.message);
        }
      })
      .catch(error => {
        console.error('刪除用戶錯誤:', error);
        alert('刪除用戶時發生錯誤: ' + error.message);
      })
      .finally(() => {
        closeModal();
        setConfirmEmail(''); // 重置確認郵件
      });
  };

  const handleCancelDelete = () => {
    closeModal();
    setConfirmEmail('');
  };

  const sendVerificationEmail = () => {
    const url = 'http://localhost:3005/api/member/email/send';
    const token = localStorage.getItem('token');

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ email: user.email })
    })
      .then(response => {
        if (!response.ok) {
          return response.text(); // 讀取非 JSON 回應
        }
        return response.json(); // 讀取 JSON 回應
      })
      .then(data => {
        if (typeof data === 'string') {
          // 處理非 JSON 回應
          console.error('伺服器回應非 JSON 格式:', data);
          alert('伺服器回應非 JSON 格式: ' + data);
        } else {
          if (data.status === 'success') {
            alert('驗證郵件已發送，請檢查您的信箱');
          } else {
            alert('發送失敗: ' + data.message);
          }
        }
      })
      .catch(error => {
        console.error('發送驗證郵件錯誤:', error);
        alert('發送驗證郵件時發生錯誤: ' + error.message);
      });
  };

  useEffect(() => {
    if (authLoading) return;

    if (authUser && authUser.uuid) {
      fetchgetMember(authUser.uuid);
      setIsYetOpening(false);
    } else {
      // setError('User not authenticated');
      setLoading(false);
    }
  }, [authUser, authLoading]);

  const formatDate = (dateString) => {
    if (!dateString) return '未知';

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `西元 ${year} 年 ${month} 月 ${day} 日`;
  };

  const displayTel = () => {
    // 檢查 user.tel 是否存在且有效
    if (!user.tel) return '-';
  
    let telStr = user.tel.toString();
    if (telStr.length === 9) telStr = '0' + telStr;
  
    return [telStr.slice(0, 4), telStr.slice(4, 7), telStr.slice(-3)].join('-');
  };

  return (
    <>
      <Head><title>會員中心 | Fundodo</title></Head>
      {isYetOpening && <Loading />}
      <main>
        {loading ? (
          <Loading />
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <form>
            <div className="col-12 d-lg-none">
              <SideText_2 layoutType={0} />
            </div>
            <div className={scss.PeopleInfoDataContainer}>
              <div className="col-1 col-lg-4"></div>
              <div className={`${scss.midarea} col-10 col-lg-5`}>
                <div className={`${scss.midtext}`}>
                  <div className={`${scss.area2} `}>Email <p>{user.email || 'example@gmail.com'}
                    <span>{user.email_verified === 1 ? (
                      <span className="text-success" style={{ fontSize: '24px', color: '#00ff00', marginLeft: '20px' }}><GoCheck /></span>
                    ) : (
                      <span style={{ marginLeft: '20px' }} onClick={sendVerificationEmail} >沒收到驗證信?</span>
                    )} </span></p></div>
                  <div className={scss.area3}>姓名<p>{user.name || '-'}</p></div>
                  <div className={scss.area4}>性別
                    <div className={scss.genderRadio}>
                      <p>{user.gender === 1 ? '先生' : user.gender === 2 ? '女士' : '-'}</p>
                    </div>
                  </div>
                  <div className={scss.area5}>生日
                    <div><label html="birthday"></label>
                      {formatDate(user.dob)}
                    </div>
                  </div>
                  <div className={scss.area6}>行動電話 <p>{displayTel()}</p></div>
                  <div className={scss.area7}>聯絡地址
                    <div className={scss.address}>
                      {user.address || '-'}
                    </div>

                  </div>
                  <div className={scss.botarea}>
                    {/* <Link href="/member/peopleInfo"><button className={scss.btn1}>編輯資料</button></Link> */}
                    <FddBtn color='heading' className={scss.btn1} outline pill={false} href='/member/peopleInfo'>編輯資料</FddBtn>
                    {/* <FddBtn color='error' outline pill={false} callback={() => setIsModalOpen(true)}>刪除用戶</FddBtn> */}
                    <button type="button" className={scss.btn2} onClick={openModal}>刪除用戶</button>
                  </div>
                </div>
              </div>
              <div className="col-1 col-lg-5 my-5  d-none d-lg-block">
                <SideText activeIndex={0} />
              </div>
            </div>
          </form>
        )}
      </main>

      <Modal
        mode={1}
        active={isModalOpen}
        onClose={closeModal}
        confirmText="發送 OTP"
        cancelText="取消"
      >
        <h4>刪除確認</h4>
        <p>你確定要刪除帳號？這個操作無法撤銷。</p>
        <p>請輸入您的電子信箱以確認刪除：</p>
        <input
          type="email"
          value={confirmEmail}
          onChange={handleEmailChange}
          placeholder="輸入您的電子信箱"
        />
        <button onClick={handleDeleteUser} disabled={confirmEmail !== user.email}>確認刪除</button>
        <button onClick={handleCancelDelete}>取消</button>
      </Modal>
    </>
  );
}
PeopleInfoData.layout = DefaultLayout;
