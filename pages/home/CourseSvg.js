import React from 'react'
import Image from 'next/image';
import scss from './CourseSvg.module.scss';

import bg from '@/public/homePic/courseSvg/bg.svg'
import cloud1 from '@/public/homePic/courseSvg/cloud1.svg'
import cloud2 from '@/public/homePic/courseSvg/cloud2.svg'
import dog from '@/public/homePic/courseSvg/dog.svg'
import main from '@/public/homePic/courseSvg/main.svg'

const CourseSvg = () => {
  return (
    <div className={scss.svgComposition}>
      <div className={`${scss.svgWrapper} ${scss.dog}`}>
        <Image src={dog} alt="dog" />
      </div>
      <div className={`${scss.svgWrapper} ${scss.main}`}>
        <Image src={main} alt="main" />
      </div>
      <div className={`${scss.svgWrapper} ${scss.cloud1}`}>
        <Image src={cloud1} alt="cloud1" />
      </div>
      <div className={`${scss.svgWrapper} ${scss.cloud2}`}>
        <Image src={cloud2} alt="cloud2" />
      </div>
      <div className={`${scss.svgWrapper} ${scss.bg}`}>
        <Image src={bg} alt="bg" />
      </div>
    </div>
  );
};

export default CourseSvg;

