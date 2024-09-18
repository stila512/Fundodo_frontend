import { useState, useEffect, useContext } from 'react';
import DefaultLayout from '@/components/layout/default';
import scss from './info.module.scss';
import Image from 'next/image';
import avatarPic from '@/public/memberPic/head.svg';
import radio from '@/public/memberPic/radio.svg';
import SideText from '@/components/member/SideText';
import SideText_2 from '@/components/member/SideText_2';
import { AuthProvider, AuthContext } from '@/context/AuthContext';
import TWZipCode from '@/components/member/tw-zipcode';
import useAuthRedirect from '@/hooks/useAuthRedirect';
import { useRouter } from 'next/router';
import { GoCheck } from "react-icons/go";

export default function PeopleInfo() {
  useAuthRedirect();
  const { user: authUser, loading: authLoading } = useContext(AuthContext);
  const [user, setUser] = useState({
    name: '',
    gender: '',
    dob: '',
    tel: '',
    address: ''
  })

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 新增狀態來存儲選擇的城市和區域
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

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

  useEffect(() => {
    if (authLoading) return;

    if (authUser && authUser.uuid) {
      fetchgetMember(authUser.uuid);
    } else {
      setError('User not authenticated');
      setLoading(false);
    }
  }, [authUser, authLoading]);

  // 處理 TWZipCode 選擇變更的函數
  const handleAddressChange = (city, district) => {
    console.log('City changed to:', city);
    console.log('District changed to:', district);
    setSelectedCity(city);
    setSelectedDistrict(district);
  };

  // 提交表單處理函數
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('gender', user.gender);
    formData.append('dob', user.dob);
    formData.append('tel', user.tel);
    formData.append('address', `${selectedCity}${selectedDistrict}${user.address}`);

    const url = `http://localhost:3005/api/member/${authUser.uuid}`;

    fetch(url, {
      method: 'PUT',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          alert('資料更新成功');
          if (data.token) {
            localStorage.setItem('token', data.token);
          }

        } else {
          setError(data.message);
        }
      })
      .catch(error => {
        setError(error.message);
      }).finally(() => {
        // 在資料提交和頭像上傳成功後重整頁面
        router.push('/member/peopleInfoData');
      });
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
  return (
    <>
      <div className="col-12 d-lg-none">
        <SideText_2 layoutType={0} />
      </div>
      <main className={scss.PeopleInfoContainer}>
        <div className="col-1 col-lg-4"></div>
        <div className={`${scss.midarea} col-12 col-lg-5`}>
          <form className={`${scss.midtext}`} onSubmit={handleSubmit}>
            <div className={`${scss.area2} `}>Email <p>{user.email || 'example@gmail.com'}
              <span>{user.email_verified === 1 ? (
                <span className="text-success" style={{ fontSize: '24px', color: '#00ff00', marginLeft: '20px' }}><GoCheck /></span>
              ) : (
                <span style={{ marginLeft: '20px' }} onClick={sendVerificationEmail} >沒收到驗證信?</span>
              )} </span></p></div>
            <div className={scss.area3}>姓名 <input type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              placeholder={user.name || '姓名'} >
            </input>
            </div>
            <div className={scss.area4}>性別
              <div className={scss.genderRadio}>
                <input type="radio"
                  name="gender"
                  value="1"
                  id="male"
                  checked={user.gender === '1'}
                  onChange={() => setUser({ ...user, gender: '1' })}>
                </input>
                <label htmlFor="male">先生</label>
                <input
                  type="radio"
                  name="gender"
                  value="2"
                  id="female"
                  checked={user.gender === '2'}
                  onChange={() => setUser({ ...user, gender: '2' })}
                />
                <label htmlFor="female">女士</label>
              </div>
            </div>
            <div className={scss.area5}>生日
              <div><label htmlFor="birthday"></label>
                <input
                  type="date" id="birthday" name="dob"
                  value={user.dob}
                  onChange={(e) => setUser({ ...user, dob: e.target.value })}
                  min="1900-01" max={new Date().toISOString().split("T")[0]} required>
                </input>
              </div>
            </div>
            <div className={scss.area6}>行動電話
              <input type="tel"
                value={user.tel}
                onChange={(e) => setUser({ ...user, tel: e.target.value })}
                placeholder="請輸入電話"
                pattern="^09\d{8}$"
                title="請輸入有效的台灣手機號碼，如：0912345678"
                required
              >
              </input></div>
            <div className={scss.area7}>聯絡地址
              <div className={scss.address}>
                <div className={scss.addressTOP}>
                  <TWZipCode onSelectionChange={handleAddressChange} />
                </div>
                {/* 顯示選擇的城市和區域（用於測試，可以根據需要移除） */}
                {/* <div>
                  選擇的城市：{selectedCity}，區域：{selectedDistrict}
                </div> */}
                <input value={user.address}
                  onChange={(e) => setUser({ ...user, address: e.target.value })}
                  placeholder="詳細地址" >
                </input>
              </div>
            </div>
            <div className={`${scss.botarea} my-5 mx-5`}>
              <button type="submit" className={scss.btn2}>確認送出</button>
            </div>
          </form>
        </div>

        <div className="col-5 my-5  d-none d-lg-block">
          <SideText activeIndex={0} />
        </div>
      </main>
    </>
  );
}
PeopleInfo.layout = DefaultLayout;
