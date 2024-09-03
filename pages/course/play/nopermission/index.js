import React from 'react';
import Link from 'next/link';
import { FaBan } from 'react-icons/fa';
import scss from './index.module.scss';

const NoPermissionPage = ({courseId}) => {
  return (
    <div className={scss.nopms}>
      <div className={scss.content}>
        <FaBan className={scss.icon} />
        <h1>沒有觀看權限</h1>
        <p>很抱歉，您尚未購買此課程，沒有觀看權限</p>
        
        <Link href={`/course/detail/${courseId}`} className={scss.button}>
          立即前往購買
        </Link>
      </div>
    </div>
  );
};

export default NoPermissionPage;