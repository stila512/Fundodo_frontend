import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import scss from './breadCrumb.module.scss';

const Breadcrumb = () => {
  const router = useRouter();
  const { id } = router.query;

  const pathMap = {
    '/home': { label: 'Home', link: '/home' },
    '/course': { label: '線上課程', link: '/course' },
    '/course/detail': { label: '課程詳情', link: `/course/detail/${id}` },
    '/course/play': { label: '課程播放', link: `/course/play/${id}` },
  };

  const beBreadcrumb = () => {
    const asPath = router.asPath;
    const pathnames = asPath.split('/').filter((x) => x);   //  將路徑分割成陣列，並過濾掉空字符串
    const breadcrumbs = [];

    breadcrumbs.push({ label: 'Home', link: '/home' });

    if (pathnames[0] === 'course') {
      breadcrumbs.push(pathMap['/course']);

      if (pathnames[1] === 'detail' && pathnames[2]) {
        breadcrumbs.push({ ...pathMap['/course/detail'], link: `/course/detail/${pathnames[2]}` });
      } else if (pathnames[1] === 'play' && pathnames[2]) {
        breadcrumbs.push({ ...pathMap['/course/detail'], link: `/course/detail/${pathnames[2]}` });
        breadcrumbs.push({ ...pathMap['/course/play'], link: `/course/play/${pathnames[2]}` });
      }
    }
    return breadcrumbs;
  };

  const breadcrumbs = beBreadcrumb();

  return (
    <div className='d-none d-md-block '>
      <nav className={scss.breadcrumb}>
        <ol>
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.link}>
              {index < breadcrumbs.length - 1 ? (
                <>
                <Link href={breadcrumb.link}>{breadcrumb.label}</Link>
                  <span className={scss.arrow}>&gt;</span>
                </>
              ) : (
                <span>{breadcrumb.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;