import DefaultLayout from '@/components/layout/default';
import scss from './info.module.scss';

export default function PeopleInfo() {
  return (
    <>
      <main className={scss.PeopleInfoContainer}>
        <div className={scss.toparea}>
            <div>
                <div>頭像</div>
                <div>email</div>
                <div>姓名</div>
                <div>性別</div>
                <div>生日</div>
                <div>行動電話</div>
                <div>聯絡地址</div>
            </div>
            <div>icon</div>
        </div>
        <div className={scss.botarea}><button>確認送出</button></div>
      </main>
    </>
  );
}
PeopleInfo.layout = DefaultLayout;
