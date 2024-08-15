import { useState, useEffect, useContext } from 'react';
import DefaultLayout from '@/components/layout/default';
import scss from './info.module.scss';
import Image from 'next/image';
import avatarPic from '@/public/memberPic/head.svg';
import radio from '@/public/memberPic/radio.svg';
import SideText from '@/components/member/SideText';
import { AuthProvider, AuthContext } from '@/context/AuthContext';

export default function PeopleInfo() {
  const { user: authUser, loading: authLoading } = useContext(AuthContext);
  const [user, setUser] = useState({
    nickname: '',
    password: '',
    email: '',
  })

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  return (
    <>
      <main className={scss.PeopleInfoContainer}>
        <div className="col-1 col-lg-4"></div>
        <div className={`${scss.midarea} col-12 col-lg-5`}>
          <div className={`${scss.midtext}`}>
          <div className={`${scss.area2} `}>Email <p>{user.email || 'example@gmail.com'} <span>沒收到驗證信?</span></p></div>
            <div className={scss.area3}>姓名 <input placeholder="姓名"></input></div>
            <div className={scss.area4}>性別
              <div className={scss.genderRadio}>
                <input type="radio" name="gender" value="male"></input>
                <label html="male"><Image className="imgWrap" src={radio} alt="Image" />先生</label>
                <input type="radio" name="gender" value="female"></input>
                <label html="male"><Image className="imgWrap" src={radio} alt="Image" />女士</label>
              </div>
            </div>
            <div className={scss.area5}>生日
              <div><label html="birthday"></label>
                <input type="month" id="birthday" name="birthday" min="1900-01" max="2023-12" required></input>
              </div>
            </div>
            <div className={scss.area6}>行動電話 <input placeholder="Please enter"></input></div>
            <div className={scss.area7}>聯絡地址
              <div className={scss.address}>
                <div className={scss.addressTOP}>
                  <select>
                    <option>城市</option>
                  </select>
                  <select>
                    <option>地區</option>
                  </select>
                </div>
                <input placeholder="詳細地址"></input>
              </div>

            </div>
            <div className={`${scss.botarea} my-5 mx-5`}>
              <button className={scss.btn1}>編輯資料</button>
              <button className={scss.btn2}>確認送出</button>
            </div>
          </div>
        </div>
        <div className="col-5 my-5  d-none d-lg-block">
        <SideText></SideText>
        </div>
      </main>
    </>
  );
}
PeopleInfo.layout = DefaultLayout;
