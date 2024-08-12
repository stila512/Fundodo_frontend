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
  return (
    <>
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
                  <div className={`${scss.imgDogavatar}`}><Image className="img" src={Shiba} alt="Image" /></div>
                  <div className={`${scss.Dogname}`}>小廢柴</div>
                </div>
                <div className={`${scss.rightText} col-6`}>
                  <div className={`${scss.rightA1}`}>
                    <div className={`col-2`}><Image className="img" src={dog} alt="Image" /></div>
                    <div className={`${scss.a0} col-6`}>
                      <div className={`${scss.a1}`}>
                        <div>性別<br/><p>公</p></div>
                        <div>生日<br/><p>2020/07/18</p></div>
                        <div>體重<br/><p>7 KG</p></div>
                      </div>
                      <div>
                        <div>疫苗接種紀錄<br/><p>多合一疫苗, 狂犬病疫苗</p></div>
                      </div>
                      <div>
                        <div>絕育狀態<br/><p>是</p></div>
                      </div>
                    </div>
                    <div className={`col-4`}></div>
                  </div>
                  <div className={`${scss.rightA2}`}>
                    <div className={`col-2`}><Image className="img" src={icon_i} alt="Image" /></div>
                    <div className={`${scss.a3} col-8`}>
                      <div>
                        <div>性格描述<br/><p>平常很喜歡趴著的小廢柴，性格很溫馴最喜歡吃小餅乾</p></div>
                      </div>
                      <div>
                        <div>行為習慣<br/><p>吃飯的時候要擺兩個碗才會吃</p></div>
                      </div>
                    </div>
                    <div className={`col-2`}></div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${scss.botarea}`}>
            <Link href="/member/dogInfo"><button className={`${scss.btn2}`}>編輯資料</button></Link>
            </div>
          </div>
        <div className="col-3 my-2">
        <SideText></SideText>
        </div>
      </main>
    </>
  );
}
DogInfoData.layout = DefaultLayout;
