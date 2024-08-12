import DefaultLayout from '@/components/layout/default';
import scss from './dogInfo.module.scss';
import Image from 'next/image';
import SideText from '@/components/member/SideText';
import mdi_dogAvatar from '@/public/memberPic/mdi_dogAvatar.svg';
import icon_i from '@/public/memberPic/i.svg';
import dog from '@/public/memberPic/dog.svg';
import radio from '@/public/memberPic/radio.svg';



export default function DogInfo() {
  return (
    <>
      <main className={`${scss.dogInfoContainer} pt-5`}>
        <div className="col-1 col-xl-1 col-xxl-3"></div>
        <div className={`${scss.midarea} col-10 col-xl-8 col-xxl-6`}>
          <div className={`${scss.tags} col-12`}>
            <div className={`${scss.tag1}`}>狗狗的資料</div>
            <div className={`${scss.tag2}`}>新增狗勾</div>
          </div>
          <div className={`${scss.mainarea} col-12`}>
            <div className={`${scss.toparea}`}>
              <Image className="img" src={mdi_dogAvatar} alt="Image" />
            </div>
            <div className={`${scss.textarea}`}>
              <div className={`${scss.TOPtext}`}>
                <div className={`col-1`}>
                  <div><Image className="img" src={dog} alt="Image" /></div>
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
                  <div><input type="text" placeholder="姓名" /></div>
                  <div>
                    <input type="radio" name="dog_gender" value="male"></input>
                    <label htmlFor="male"><Image className="imgWrap" src={radio} alt="Image" />公</label>
                    <input type="radio" name="dog_gender" value="female"></input>
                    <label htmlFor="female"><Image className="imgWrap" src={radio} alt="Image" />母</label>
                  </div>
                  <div>
                    <select>
                      <option>毛孩出生年</option>
                    </select>
                    <select>
                      <option>月份</option>
                    </select>
                    <select>
                      <option>日期</option>
                    </select>
                  </div>
                  <div>
                    <select>
                      <option>請選擇</option>
                    </select>
                  </div>
                  <div>
                    <input type="radio" name="dog_gender" value="Vac"></input>
                    <label htmlFor="Vac"><Image className="imgWrap" src={radio} alt="Image" />多合一疫苗</label>
                    <input type="radio" name="dog_gender" value="Vac"></input>
                    <label htmlFor="Vac"><Image className="imgWrap" src={radio} alt="Image" />狂犬病疫苗</label>
                    <input type="radio" name="dog_gender" value="Vac"></input>
                    <label htmlFor="Vac"><Image className="imgWrap" src={radio} alt="Image" />萊姆病疫苗</label>
                  </div>
                  <div>
                    <input type="radio" name="dog_gender" value="Neutering"></input>
                    <label htmlFor="Neutering"><Image className="imgWrap" src={radio} alt="Image" />是</label>
                    <input type="radio" name="dog_gender" value="Neutering"></input>
                    <label htmlFor="Neutering"><Image className="imgWrap" src={radio} alt="Image" />否</label>
                  </div>
                </div>


              </div>
              <div className={`${scss.BOTtext}`}>
                <div className={`col-1`}>
                  <div><Image className="img" src={icon_i} alt="Image" /></div>
                </div>
                <div className={`${scss.labelGroup_b} col-2`}>
                  <div>性格描述 </div>
                  <div>行為習慣</div>
                </div>
                <div className={`${scss.inputGroup_b} col-9`}>
                <div><textarea type="text" placeholder="如活潑、安靜、友善等..." /></div>
                <div><textarea type="text" placeholder="如是否容易焦慮、是否有攻擊性..." /></div>
                </div>
              </div>
            </div>
          </div>


          <div className={`${scss.btnarea} mt-5`}>
            <button className={`${scss.btn2}`}>確認送出</button>
          </div>
        </div>


        <div className="col-1 col-xl-3 col-xxl-3 my-2 d-none d-xl-block">
          <SideText></SideText>
        </div>
      </main>
    </>
  );
}
DogInfo.layout = DefaultLayout;
