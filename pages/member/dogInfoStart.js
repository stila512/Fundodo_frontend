import DefaultLayout from '@/components/layout/default';
import scss from './dogInfo.module.scss';
import Image from 'next/image';
import SideText from '@/components/member/SideText';
import mdi_dogAvatar from '@/public/memberPic/mdi_dogAvatar.svg';
import icon_i from '@/public/memberPic/i.svg';
import dog from '@/public/memberPic/dog.svg';
import Link from 'next/link';
import useAuthRedirect from '@/hooks/useAuthRedirect';



export default function DogInfoStart() {
  useAuthRedirect();
  return (
    <>
      <main className={scss.dogInfoStartContainer}>
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
                  <div className={`${scss.imgDogavatar}`}><Image className="img" src={mdi_dogAvatar} alt="Image" /></div>
                  <div className={`${scss.Dogname}`}>毛孩名</div>
                </div>
                <div className={`${scss.rightText} col-6`}>
                  <div className={`${scss.rightA1}`}>
                    <div className={`col-2`}><Image className="img" src={dog} alt="Image" /></div>
                    <div className={`${scss.a0} col-6`}>
                      <div className={`${scss.a1}`}>
                        <div>性別<br/>-</div>
                        <div>生日<br/>-</div>
                        <div>體重<br/>-</div>
                      </div>
                      <div>
                        <div>疫苗接種紀錄<br/>-</div>
                      </div>
                      <div>
                        <div>絕育狀態<br/>-</div>
                      </div>
                    </div>
                    <div className={`col-4`}></div>
                  </div>
                  <div className={`${scss.rightA2}`}>
                    <div className={`col-2`}><Image className="img" src={icon_i} alt="Image" /></div>
                    <div className={`${scss.a3} col-6`}>
                      <div>
                        <div>性格描述<br/>-</div>
                      </div>
                      <div>
                        <div>行為習慣<br/>-</div>
                      </div>
                    </div>
                    <div className={`col-4`}></div>
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
DogInfoStart.layout = DefaultLayout;
