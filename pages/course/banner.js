import Image from 'next/image';
import scss from './banner.module.scss';
import dog from "@/public/homepagePic/whitedog.png"

export default function Banner() {
  return (
    <>
    <div className='container'>
      <div className={scss.banner}>
      <Image src={dog} className={scss.dog}/>
      <h2>狗的課程</h2>
      </div>
      <p>Home 狗狗課程</p>
    
      </div>
    </>
  );
}
