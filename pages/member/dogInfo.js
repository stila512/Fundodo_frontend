import { useRef, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthProvider, AuthContext } from '@/context/AuthContext';
import DefaultLayout from '@/components/layout/default';
import scss from './dogInfo.module.scss';
import Image from 'next/image';
import SideText from '@/components/member/SideText';
import SideText_2 from '@/components/member/SideText_2';
import mdi_dogAvatar from '@/public/memberPic/mdi_dogAvatar.svg';
import icon_i from '@/public/memberPic/i.svg';
import dogicon from '@/public/memberPic/dogicon.svg';
import useAuthRedirect from '@/hooks/useAuthRedirect';


export default function DogInfo() {
  useAuthRedirect();
  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState(null);
  const [showUploadHint, setShowUploadHint] = useState(true);
  const [weight, setWeight] = useState('');
  const { user: authUser, loading: authLoading } = useContext(AuthContext);
  const [dog, setDog] = useState({
    name: '',
    gender: '',
    dob: '',
    weight: '',
    introduce: '',
    behavior: '',
    avatar_file: '',
    vaccinations: [],
    neutering: ''
  });
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  //體重
  const handleWeightChange = (event) => {
    const newWeight = event.target.value;
    setWeight(event.target.value);
    setDog(prevState => ({ ...prevState, weight: newWeight }));
    console.log('Selected weight:', event.target.value);
  };

  // checkbox 勾選狀態
  const handleVaccinationChange = (value) => {
    setDog(prevState => {
      const updatedVaccinations = prevState.vaccinations.includes(value)
        ? prevState.vaccinations.filter(vac => vac !== value)
        : [...prevState.vaccinations, value];

      return { ...prevState, vaccinations: updatedVaccinations };
    });
  };

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
        setShowUploadHint(false);
      };
      reader.readAsDataURL(file);
      setDog({ ...dog, avatar_file: file });
    }
  };

  //表單送出事件
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', dog.name);
    formData.append('gender', dog.gender);
    formData.append('dob', dog.dob);
    formData.append('weight', dog.weight);
    formData.append('introduce', dog.introduce);
    formData.append('behavior', dog.behavior);
    formData.append('vaccinations', JSON.stringify(dog.vaccinations));
    formData.append('neutering', dog.neutering);

    const url = `http://localhost:3005/api/member/dogInfo/${id}`;

    fetch(url, {
      method: 'PUT',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          alert('資料更新成功');

          // 取得當前 localStorage 中的狗狗資料
          const existingData = [];
          Object.keys(localStorage).forEach(key => {
            if (key.startsWith(`dogData_${authUser.uuid}`)) {
              const data = JSON.parse(localStorage.getItem(key));
              if (Array.isArray(data)) {
                existingData.push(...data);
              } else if (data) {
                existingData.push(data);
              }
            }
          });

          // 合併更新的狗狗資料
          const updatedDog = data.data;
          const updatedData = existingData.filter(dog => dog.id !== updatedDog.id).concat(updatedDog);

          // 更新 localStorage
          localStorage.setItem(`dogData_${authUser.uuid}`, JSON.stringify(updatedData));

          // 其他操作，如顯示成功訊息或刷新頁面
          console.log('狗狗資料更新成功');
          router.push('/member/dogInfoData')


          // 如果有新的頭像，則上傳頭像
          if (dog.avatar_file) {
            const formData2 = new FormData();
            formData2.append('avatar', dog.avatar_file);

            const url2 = `http://localhost:3005/api/member/uploadAvatar_dog/${id}`;

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
        if (dog.avatar_file && data.status === 'success') {
          const updatedAvatarUrl = `http://localhost:3005/upload_dog/${id}.png`;
          setAvatar(updatedAvatarUrl);
        }
      })
      .catch(error => {
        setError(error.message);
      }).finally(() => {
        router.push('/member/dogInfoData');
      });
  };

  useEffect(() => {
    if (!id || !authUser) return;

    // 取得當前 localStorage 中的狗狗資料
    const existingData = [];
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(`dogData_${authUser.uuid}`)) {
        const data = JSON.parse(localStorage.getItem(key));
        if (Array.isArray(data)) {
          existingData.push(...data);
        } else if (data) {
          existingData.push(data);
        }
      }
    });

    // 根據 id 查找對應的狗狗資料
    const dogData = existingData.find(dog => dog.id === parseInt(id, 10));

    if (dogData) {
      setDog(prevState => ({ ...prevState, name: dogData.name }));
    } else {
      setError('未找到對應的狗狗資料');
    }
  }, [id, authUser]);

  return (
    <>
      <div className="col-12 d-lg-none">
        <SideText_2 layoutType={0} />
      </div>
      <main className={`${scss.dogInfoContainer} pt-5`}>
        <div className="col-1 col-xl-1 col-xxl-3"></div>
        <form className={`${scss.midarea} col-10 col-xl-8 col-xxl-6`} onSubmit={handleSubmit}>
          <div className={`${scss.tags} col-12`}>
            <div className={`${scss.tag1}`}>狗狗的資料</div>
          </div>
          <div className={`${scss.mainarea} col-12`}>
            <div className={`${scss.toparea}`} onClick={handleAvatarClick}>
              <div className={['img-wrap-h100', scss.avatarWrapper].join(' ')}>
                <Image
                  className="img"
                  src={avatar || mdi_dogAvatar}
                  alt="Image"
                  width={0}
                  height={0}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                {showUploadHint && mdi_dogAvatar && (
                  <div className={scss.tips}>
                    請點擊上傳
                  </div>
                )}
              </div>
            </div>
            <div className={`${scss.textarea}`}>
              <div className={`${scss.TOPtext}`}>
                <div className={`col-1 d-none d-lg-block`}>
                  <div><Image className="img" src={dogicon} alt="Image" /></div>
                </div>
                <div className={`${scss.labelGroup} col-2`}>
                  <div>毛孩名 </div>
                  <div>性別</div>
                  <div>生日</div>
                  <div>體重</div>
                  <div>疫苗接種紀錄</div>
                  <div>絕育狀態</div>
                </div>
                <div className={`${scss.inputGroup} col-9`}>
                  <div>
                    <input type="text" placeholder="姓名"
                      value={dog.name}
                      onChange={(e) => setDog({ ...dog, name: e.target.value })}
                    />
                  </div>
                  <div className={scss.genderRadio}>
                    <input type="radio"
                      name="gender"
                      value="1"
                      id="male"
                      checked={dog.gender === '1'}
                      onChange={() => setDog({ ...dog, gender: '1' })}>
                    </input>
                    <label htmlFor="male">男孩</label>
                    <input type="radio"
                      name="gender"
                      value="2"
                      id="female"
                      checked={dog.gender === '2'}
                      onChange={() => setDog({ ...dog, gender: '2' })}>
                    </input>
                    <label htmlFor="female">女孩</label>
                  </div>
                  <div>
                    <input
                      type="date" id="dob" name="dob"
                      value={dog.dob}
                      onChange={(e) => setDog({ ...dog, dob: e.target.value })}
                      min="1900-01" max={new Date().toISOString().split("T")[0]} required>
                    </input>
                  </div>
                  <div>
                    <select id="weight" value={weight} onChange={handleWeightChange}>
                      <option value="">請選擇體重</option>
                      {Array.from({ length: 100 }, (_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1} 公斤
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={`${scss.inputRadioGroup}`}>
                    <div className="mb-3">
                      <input
                        type="checkbox"
                        id="vac-multi"
                        name="vaccinations"
                        value="multi"
                        checked={dog.vaccinations.includes('multi')}
                        onChange={() => handleVaccinationChange('multi')}
                      />
                      <label htmlFor="vac-multi">多合一疫苗</label>

                      <input
                        type="checkbox"
                        id="vac-rabies"
                        name="vaccinations"
                        value="rabies"
                        checked={dog.vaccinations.includes('rabies')}
                        onChange={() => handleVaccinationChange('rabies')}
                      />
                      <label htmlFor="vac-rabies">狂犬病疫苗</label>

                      <input
                        type="checkbox"
                        id="vac-lyme"
                        name="vaccinations"
                        value="lyme"
                        checked={dog.vaccinations.includes('lyme')}
                        onChange={() => handleVaccinationChange('lyme')}
                      />
                      <label htmlFor="vac-lyme">萊姆病疫苗</label>
                    </div>

                    <div>
                      <input
                        type="radio"
                        id="neutering-yes"
                        name="neutering"
                        value="yes"
                        checked={dog.neutering === 'yes'}
                        onChange={() => setDog({ ...dog, neutering: 'yes' })}
                      />
                      <label htmlFor="neutering-yes">是</label>

                      <input
                        type="radio"
                        id="neutering-no"
                        name="neutering"
                        value="no"
                        checked={dog.neutering === 'no'}
                        onChange={() => setDog({ ...dog, neutering: 'no' })}
                      />
                      <label htmlFor="neutering-no">否</label>
                    </div>
                  </div>
                </div>


              </div>
              <div className={`${scss.BOTtext}`}>
                <div className={`col-1 d-none d-lg-block`}>
                  <div><Image className="img" src={icon_i} alt="Image" /></div>
                </div>
                <div className={`${scss.labelGroup_b} col-2`}>
                  <div>性格描述 </div>
                  <div>行為習慣</div>
                </div>
                <div className={`${scss.inputGroup_b} col-9`}>
                  <div>
                    <textarea placeholder="如活潑、安靜、友善等..."
                      value={dog.introduce}
                      onChange={(e) => setDog({ ...dog, introduce: e.target.value })}
                    />
                  </div>
                  <div>
                    <textarea placeholder="如是否容易焦慮、是否有攻擊性..."
                      value={dog.behavior}
                      onChange={(e) => setDog({ ...dog, behavior: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className={`${scss.btnarea} mt-5`}>
            <button type="submit" className={`${scss.btn2}`}>確認送出</button>
          </div>
        </form>


        <div className="col-1 col-xl-3 col-xxl-3 my-2 d-none d-xl-block">
          <SideText activeIndex={1} />
        </div>
      </main>
    </>
  );
}
DogInfo.layout = DefaultLayout;
