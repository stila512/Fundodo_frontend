import { useState, useEffect } from 'react';
import DefaultLayout from '@/components/layout/default';
import scss from './info.module.scss';
import Image from 'next/image';
import avatarPic from '@/public/memberPic/head.svg';
import radio from '@/public/memberPic/radio.svg';
import SideText from '@/components/member/SideText';
import Link from 'next/link';

export default function PeopleInfoData() {
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
    const uuid = '1eaf3f71-0568-4541-86fe-c6e9f0108636';
    fetchgetMember(uuid);
  }, []);

  return (
    <>
      <main>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <form>
            <div className={scss.PeopleInfoDataContainer}>
              <div className="col-1 col-lg-4"></div>
              <div className={`${scss.midarea} col-12 col-lg-5`}>
                <div className={`${scss.midtext}`}>
                  <div className={`${scss.area2} `}>Email <p>{user.email || 'example@gmail.com'} <span>沒收到驗證信?</span></p></div>
                  <div className={scss.area3}>姓名<p>{user.name || '-'}</p></div>
                  <div className={scss.area4}>性別
                    <div className={scss.genderRadio}>
                      <p>{user.gender || '-'}</p>
                    </div>
                  </div>
                  <div className={scss.area5}>生日
                    <div><label html="birthday"></label>
                      {user.dob || '-'}
                    </div>
                  </div>
                  <div className={scss.area6}>行動電話 <p>{user.tel || '-'}</p></div>
                  <div className={scss.area7}>聯絡地址
                    <div className={scss.address}>
                    {user.adr_city || '-'} {user.address || '-'}
                    </div>

                  </div>
                  <div className={`${scss.botarea} my-5 mx-5`}>
                    <Link href="/member/peopleInfo"><button className={scss.btn1}>編輯資料</button></Link>
                  </div>
                </div>
              </div>
              <div className="col-5 my-5  d-none d-lg-block">
                <SideText></SideText>
              </div>
            </div>
          </form>
        )}
      </main>
    </>
  );
}
PeopleInfoData.layout = DefaultLayout;
