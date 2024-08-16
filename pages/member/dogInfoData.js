import { useState, useEffect, useContext } from 'react';
import { AuthProvider, AuthContext } from '@/context/AuthContext';
import DefaultLayout from '@/components/layout/default';
import scss from './dogInfo.module.scss';
import Image from 'next/image';
import SideText from '@/components/member/SideText';
import mdi_dogAvatar from '@/public/memberPic/mdi_dogAvatar.svg';
import icon_i from '@/public/memberPic/i.svg';
import dog from '@/public/memberPic/dog.svg';
import Shiba from '@/public/memberPic/Shiba.png';
import Link from 'next/link';



export default function DogInfoData() {
  const { user: authUser, loading: authLoading } = useContext(AuthContext);
  const [dogData, setDogData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  //從localstorage 找狗狗的資料
  const loadDogDataFromLocalStorage = (uuid) => {
    const data = localStorage.getItem(`dogData_${uuid}`);
    if (data) {
      setDogData(JSON.parse(data));
      setLoading(false);
    } else {
      fetchgetDog(uuid);
    }
  };


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

  const fetchgetDog = (uuid) => {
    const url = `http://localhost:3005/api/member/dog/${uuid}`;
    const token = localStorage.getItem('token');

    fetch(url, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.ok) {
          // 如果響應正常（2xx），將其解析為 JSON
          return response.json();
        } else {
          // 處理非 2xx 狀態碼的響應
          return response.text().then(text => {
            throw new Error(`Error ${response.status}: ${text}`);
          });
        }
      })
      .then(data => {
        if (data.status === 'success') {
          setDogData(data.result);
          localStorage.setItem(`dogData_${uuid}`, JSON.stringify(data.result));
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
      loadDogDataFromLocalStorage(authUser.uuid);
    } else {
      setError('User not authenticated');
      setLoading(false);
    }
  }, [authUser, authLoading]);

  const getBodyTypeDescription = (bodytype) => {
    switch (bodytype) {
      case 'MINI':
        return '迷你犬';
      case 'SMALL':
        return '小型犬';
      case 'MEDIUM':
        return '中型犬';
      case 'BIG':
        return '大型犬';
      default:
        return '未知';
    }
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <main className={scss.dogInfoDataContainer}>
          <div className="col-3"></div>
          <div className={`${scss.midarea} col-6`}>
            <div className={`${scss.midtext}`}>
              <div className={`${scss.toparea}`}>
                <div className={`${scss.tags}`}>
                  <div className={`${scss.tag1}`}>狗狗的資料</div>
                  <div className={`${scss.tag2}`}>新增狗狗</div>
                </div>
                <div className={`${scss.mainArea}`}>
                  <div className={`${scss.leftPic} col-6`}>
                    <div className={`${scss.imgDogavatar}`}>
                      {/* 顯示狗狗圖片 */}
                      <Image className="img" src={dogData[0].image || Shiba} alt="Dog Avatar" />
                    </div>
                    <div className={`${scss.Dogname}`}>
                      {/* 顯示狗狗名稱 */}
                      { dogData[0].name || '小廢柴'}
                    </div>
                  </div>
                  <div className={`${scss.rightText} col-6`}>
                    <div className={`${scss.rightA1}`}>
                      <div className={`col-2`}>
                        <Image className="img" src={dog} alt="Dog Icon" />
                      </div>
                      <div className={`${scss.a0} col-6`}>
                        <div className={`${scss.textgroup}`}>
                          <div className={`col-2`}>性別<br /><p>{dogData[0].gender === 1 ? '公' : '母' || '未知'}</p></div>
                          <div className={`col-6`}>年齡<br /><p>{dogData[0].age || '未知'}</p></div>
                          <div className={`col-4`}>犬型<br /><p>{getBodyTypeDescription(dogData[0].bodytype) || '未知'} </p></div>
                        </div>
                        <div>
                          <div>疫苗接種紀錄<br /><p>{dogData[0].vaccination || '未知'}</p></div>
                        </div>
                        <div>
                          <div>絕育狀態<br /><p>{dogData[0].neutered ? '是' : '否'}</p></div>
                        </div>
                      </div>
                      <div className={`col-4`}></div>
                    </div>
                    <div className={`${scss.rightA2}`}>
                      <div className={`col-2`}>
                        <Image className="img" src={icon_i} alt="Info Icon" />
                      </div>
                      <div className={`${scss.a3} col-8`}>
                        <div>
                          <div>性格描述<br /><p>{dogData[0].personality || '未知'}</p></div>
                        </div>
                        <div>
                          <div>行為習慣<br /><p>{dogData[0].behavior || '未知'}</p></div>
                        </div>
                      </div>
                      <div className={`col-2`}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={`${scss.botarea}`}>
                <Link href="/member/dogInfo"><button className={`${scss.btn2}`}>編輯資料</button></Link>
              </div>
            </div>
          </div>
          <div className="col-3 my-2">
            <SideText />
          </div>
        </main>
      )}
    </>
  );
}

DogInfoData.layout = DefaultLayout;
