import DefaultLayout from '@/components/layout/default';
import scss from './dogInfo.module.scss';
import Image from 'next/image';
import SideText from '@/components/member/SideText';
import mdi_dogAvatar from '@/public/memberPic/mdi_dogAvatar.svg';

export default function PeopleInfo() {
  return (
    <>
      <main className={scss.dogInfoContainer}>
        <div className="col-3"></div>
        <div className={`${scss.midarea} col-6`}>
          <div className={`${scss.midtext}`}>
            <div className={`${scss.toparea}`}>
              <div className={`${scss.tags}`}>
                <div className={`${scss.tag1}`}>狗狗的資料</div>
                <div className={`${scss.tag2}`}>新增狗狗</div>
              </div>
              <div className={`${scss.mainArea}`}>
                <div className={`${scss.leftPic}`}>
                  <div><Image className="imgWrap" src={mdi_dogAvatar} alt="Image" /></div>
                  <div>毛孩名</div>
                </div>
                <div className={`${scss.rightText}`}></div>
              </div>
            </div>
            <div className={`${scss.botarea} my-5`}>
              <button className={scss.btn1}>編輯資料</button>
            </div>
          </div>
        </div>
        <div className="col-3 my-5">
        <SideText></SideText>
        </div>
      </main>
    </>
  );
}
PeopleInfo.layout = DefaultLayout;
