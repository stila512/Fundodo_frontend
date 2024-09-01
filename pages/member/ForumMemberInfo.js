import { useRef, useState, useEffect, useContext } from 'react';
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

export default function PeopleInfo() {
  useAuthRedirect();
  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState(null);
  const { user: authUser, loading: authLoading } = useContext(AuthContext);
  const [user, setUser] = useState({
    nickname: '',
    introduce: '',
    avatar_file: ''
  })

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = 'http://localhost:3005/upload/';
  const fetchgetMember = (uuid) => {
    const url = `http://localhost:3005/api/member/${uuid}`;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(`錯誤 ${response.status}: ${errorData.message}`);
          });
        }
        return response.json();
      })
      .then(data => {
        if (data.status === 'success') {
          setUser(data.result);
          if (data.result.avatar_file) {
            const avatarUrl = `${BASE_URL}${data.result.avatar_file}`; // 組合完整的圖片 URL
            setAvatar(avatarUrl);
          } else {
            setAvatar(avatarPic); // 如果沒有頭像，設置為預設頭像
          }
        }
        else {
          setError(data.message);
        }
      })
      .catch(error => {
        setError(error.message);
        //setAvatar(avatarPic); // 發生錯誤時也設置為預設頭像
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

  // 頭像點擊
  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
      setUser({ ...user, avatar_file: file });
    }
  };

  // 提交表單處理函數
  const handleSubmit = (event) => {
    event.preventDefault();

    // 更新用戶資料
    const formData = new FormData();
    formData.append('nickname', user.nickname);
    formData.append('introduce', user.introduce);

    const url = `http://localhost:3005/api/member/ForumMemberInfo/${authUser.uuid}`;

    fetch(url, {
      method: 'PUT',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          alert('資料更新成功');

          // 如果有新的頭像，則上傳頭像
          if (user.avatar_file) {
            const formData2 = new FormData();
            formData2.append('avatar', user.avatar_file);

            const url2 = `http://localhost:3005/api/member/uploadAvatar/${authUser.uuid}`;

            return fetch(url2, {
              method: 'POST',
              body: formData2,
            });
          }
        } else {
          setError(data.message);
          throw new Error(data.message);
        }
      })
      .then(response => response.json())
      .then(data => {
        if (user.avatar_file && data.status === 'success') {
          const updatedAvatarUrl = `http://localhost:3005/upload/${authUser.uuid}.png`;
          setAvatar(updatedAvatarUrl);
        }
      })
      .catch(error => {
        setError(error.message);
      }).finally(() => {
        // 在資料提交和頭像上傳成功後重整頁面
        window.location.reload();
      });
  };

  const formatDate = (dateString) => {
    if (!dateString) return '未知';

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <div className="col-12 d-lg-none">
        <SideText_2 layoutType={0} />
      </div>
      <main className={scss.ForumMemberInfo}>
        <div className="col-1 col-lg-4"></div>
        <div className={`${scss.midarea} col-12 col-lg-5`}>
          <form className={`${scss.midtext}`} onSubmit={handleSubmit}>
            <div className={scss.area1}>頭像上傳
              <div className={scss.avatarPic} onClick={handleAvatarClick}>
                <div className={scss.avatarWrapper}>
                  <Image
                    className="imgWrap"
                    src={avatar || avatarPic} // 使用 || 運算符確保總是有一個有效的值
                    alt="Image"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              /></div>
            <div className={scss.area2}>暱稱
              <input value={user.nickname} onChange={(e) => setUser({ ...user, nickname: e.target.value })}
                placeholder="討論區暱稱">
              </input>
            </div>
            <div className={scss.area3}>性別
              <div className={scss.genderRadio}>
                <p>{user.gender === 1 ? '先生' : user.gender === 2 ? '女士' : '-'}</p>
              </div>
            </div>
            <div className={scss.area4}>生日
              <p>{formatDate(user.dob) || '-'}</p>
            </div>
            <div className={scss.area5}>
              所在地
              <div className={`${scss.area5 - 2} px-3`}>
                <p>{user.address || '-'}</p>
              </div>
            </div>
            <div className={scss.area6}>有效文章 <p>3篇</p></div>
            <div className={scss.area7}>自我介紹
              <textarea value={user.introduce} onChange={(e) => setUser({ ...user, introduce: e.target.value })} placeholder="如活潑、安靜、友善等..."></textarea>
            </div>
            <div className={`${scss.botarea} my-5 mx-5`}>
              <button type="submit" className={scss.btn2}>確認送出</button>
            </div>
          </form>
        </div>
        <div className="col-3 my-5 d-none d-lg-block">
          <SideText activeIndex={0} />
        </div>
      </main>
    </>
  );
}
PeopleInfo.layout = DefaultLayout;
