import Image from 'next/image';
import scss from './section.module.scss';
import style from '@/styles/style.module.scss';
import shiba from 'public/prodPic/shiba.png';

export default function Section() {
  return (
    <>
      <section className={scss.mt3}>
        <div className={[scss.section, style.dFlex, style.container].join(' ')}>
          <div className={scss.shibaBox}>
            <Image src={shiba} alt={shiba} />
          </div>
          <h1 className={[scss.pt3, scss.dogFood].join(' ')}>狗的食物</h1>
        </div>
      </section>
    </>
  );
}
