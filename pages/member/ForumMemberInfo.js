import { useState, useEffect, useContext } from 'react';
import DefaultLayout from '@/components/layout/default';
import scss from './info.module.scss';
import Image from 'next/image';
import avatarPic from '@/public/memberPic/head.svg';
import radio from '@/public/memberPic/radio.svg';
import SideText from '@/components/member/SideText';
import { AuthProvider, AuthContext } from '@/context/AuthContext';
import TWZipCode from '@/components/member/tw-zipcode';
import useAuthRedirect from '@/hooks/useAuthRedirect';

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
        } else {
          setError(data.message);
        }
      })
      .catch(error => {
        setError(error.message);
      });
  };
  return (
    <>
      <main className={scss.ForumMemberInfo}>
        <div className="col-1 col-lg-4"></div>
        <div className={`${scss.midarea} col-12 col-lg-5`}>
          <div className={scss.midtext}>
            <div className={scss.area1}>頭像上傳 <div className={scss.avatarPic}><Image className="imgWrap" src={avatarPic} alt="Image" /></div></div>
            <div className={scss.area2}>暱稱 <input placeholder="討論區暱稱"></input></div>
            <div className={scss.area3}>性別
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
            <div className={scss.area4}>生日
              <div><label html="birthday"></label>
                <input type="month" id="birthday" name="birthday" min="1900-01" max="2023-12" required></input>
              </div>
            </div>
            <div className={scss.area5}>
              所在地
              <div className={`${scss.area5 - 2} px-2`}>
                <TWZipCode onSelectionChange={handleAddressChange} />
              </div>
            </div>
            <div className={scss.area6}>有效文章 <p>3篇</p></div>
            <div className={scss.area7}>自我介紹
              <textarea placeholder="如活潑、安靜、友善等..."></textarea>
            </div>
            <div className={`${scss.botarea} my-5 mx-5`}>
              <button className={scss.btn1}>編輯資料</button>
              <button className={scss.btn2}>確認送出</button>
            </div>
          </div>
        </div>
        <div className="col-3 my-5 d-none d-lg-block">
          <SideText></SideText>
        </div>
      </main>
    </>
  );
}
PeopleInfo.layout = DefaultLayout;
