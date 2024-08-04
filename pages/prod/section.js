import Image from 'next/image';
import scss from './section.module.scss';
import shiba from 'public/prodPic/shiba.png';

export default function Section() {
  return (
    <>
      <section className={scss.mt}>
        <div className={[scss.section, 'd-flex', 'container'].join(' ')}>
          <div className={scss.shibaBox}>
            <Image src={shiba} alt={shiba} />
          </div>
          <h1 className={[scss.pt3, scss.dogFood].join(' ')}>狗的食物</h1>
        </div>
      </section>
    </>
  );
}
