import React from 'react';
import scss from '@/pages/article/userCard.module.scss';
import Image from 'next/image';

export default function PageControl() {
  return (
    <>
      {' '}
      <div className={[scss.pageCtrl].join()}>
        <div className={scss.ctrler}>
          <Image
            className={scss.userImg}
            src="/logo.png"
            alt=""
            width={200}
            height={200}
            objectFit='cover'
          />
        </div>
        <div>
          <span className={[scss.ctrlText].join()}>@userid</span>
        </div>
        <hr style={{width:'100%'}} />
        <div>
          <span className={[scss.identityText].join()}>一般會員</span>
        </div>
      </div>
    </>
  );
}
