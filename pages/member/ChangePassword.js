import DefaultLayout from '@/components/layout/default';
import scss from './info.module.scss';
import Image from 'next/image';
import SideText from '@/components/member/SideText';
import Link from 'next/link';

export default function ChangePassword() {
  return (
    <>
      <main className={scss.ChangePasswordContainer}>
        <div className="col-2"></div>
        <div className="col-7">
          <div className={`${scss.maintest} col-12`}>
            <div className="col-3"></div>
            <div className="col-6">
              <div className={`${scss.toptext} my-5`}>
                <div className={`${scss.toptexta1} col-2`}>
                  <div>Email </div>
                  <div>新密碼</div>
                  <div>確認新密碼</div>
                </div>
                <div className={`${scss.toptexta2} col-10`}>
                  <div>example@gmail.com</div>
                  <div><input name="password" placeholder="密碼"></input></div>
                  <div><input name="repassword" placeholder="確認新密碼"></input></div>
                </div>
              </div>
              <div className={`${scss.botBTN} my-5`}>
                <Link href="/member/dogInfo"><button className={`${scss.btn2}`}>確認送出</button></Link>
              </div>
            </div>
            <div className="col-3"></div>
          </div>
        </div>
        <div className="col-5 my-5 mx-5 d-none d-lg-block">
          <SideText></SideText>
        </div>
      </main>
    </>
  );
}
ChangePassword.layout = DefaultLayout;
