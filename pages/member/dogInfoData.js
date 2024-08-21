import { useState, useEffect, useContext } from 'react';
import { AuthProvider, AuthContext } from '@/context/AuthContext';
import DefaultLayout from '@/components/layout/default';
import scss from './dogInfo.module.scss';
import Image from 'next/image';
import SideText from '@/components/member/SideText';
import mdi_dogAvatar from '@/public/memberPic/mdi_dogAvatar.svg';
import icon_i from '@/public/memberPic/i.svg';
import dogicon from '@/public/memberPic/dogicon.svg';
import Shiba from '@/public/memberPic/Shiba.png';
import Link from 'next/link';
import useAuthRedirect from '@/hooks/useAuthRedirect';



export default function DogInfoData() {
  useAuthRedirect();
  const { user: authUser, loading: authLoading } = useContext(AuthContext);
  const [dogData, setDogData] = useState(null);
  const [selectedDogIndex, setSelectedDogIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  //從localstorage 找狗狗的資料
  const loadDogDataFromLocalStorage = (uuid) => {
    const dogs = [];
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(`dogData_${uuid}`)) {
        const data = JSON.parse(localStorage.getItem(key));
        if (data) {
          dogs.push(...data);
        }
      }
    });
    setDogData(dogs);
    setLoading(false);
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
      setError('用戶未認證');
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

  const formatDate = (dateString) => {
    if (!dateString) return '未知';

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const renderDogInfo = (dog) => (
    <div className={`${scss.mainArea}`}>
      <div className={`${scss.leftPic} col-6`}>
        <div className={`${scss.imgDogavatar}`}>
          <Image className="img" src={dog.dog_avatar_file || Shiba} alt="Dog Avatar" />
        </div>
        <div className={`${scss.Dogname}`}>
          {dog.name || '小廢柴'}
        </div>
      </div>
      <div className={`${scss.rightText} col-6`}>
        <div className={`${scss.rightA1}`}>
          <div className={`col-2`}>
            <Image className="img" src={dogicon} alt="Dog Icon" />
          </div>
          <div className={`${scss.a0} col-6`}>
            <div className={`${scss.textgroup}`}>
              <div className={`col-2`}>性別<br /><p>{dog.gender === 1 ? '公' : '母'}</p></div>
              <div className={`col-6`}>生日<br /><p>{formatDate(dog.dob)}</p></div>
              <div className={`col-6`}>體重<br /><p>{dog.weight}kg</p></div>
              {/* <div className={`col-4`}>犬型<br /><p>{getBodyTypeDescription(dog.bodytype)}</p></div> */}
            </div>
            <div>
              <div>疫苗接種紀錄<br /><p>{dog.vaccination === 1 ? '是' : '否'}</p></div>
            </div>
            <div>
              <div>絕育狀態<br /><p>{dog.neutered === 1 ? '是' : '否'}</p></div>
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
              <div>性格描述<br /><p>{dog.personality || '-'}</p></div>
            </div>
            <div>
              <div>行為習慣<br /><p>{dog.behavior || '-'}</p></div>
            </div>
          </div>
          <div className={`col-2`}></div>
        </div>
      </div>
    </div>
  );


  return (
    <>
      {loading ? (
        <p>加載中...</p>
      ) : error ? (
        <p>錯誤: {error}</p>
      ) : (
        <main className={scss.dogInfoDataContainer}>
          <div className="col-3"></div>
          <div className={`${scss.midarea} col-6`}>
            <div className={`${scss.midtext}`}>
              <div className={`${scss.toparea}`}>
                <div className={`${scss.tags}`}>
                  <div className={`${scss.tagGroup}`}>
                    <div className={`${scss.tag1}`}>狗狗的資料</div>
                    <div className={`${scss.tag2}`}>新增狗狗</div>
                  </div>
                  <div className={`${scss.tagGroup}`}>
                    {dogData.map((dog, index) => (
                      <div
                        key={index}
                        className={`${scss.tag3} ${selectedDogIndex === index ? scss.activeTag : ''}`}
                        onClick={() => setSelectedDogIndex(index)}
                      >
                        {dog.name || `狗狗${index + 1}`}
                      </div>
                    ))}
                  </div>
                </div>
                {dogData.length > 0 && renderDogInfo(dogData[selectedDogIndex])}
              </div>
              <div className={`${scss.botarea}`}>
                {dogData && dogData.length > 0 && (
                  <div className="">
                    <Link href={`/member/dogInfo?id=${dogData[selectedDogIndex].id}`}>
                      <button className={`${scss.btn2}`}>編輯資料</button>
                    </Link>
                  </div>
                )}
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
