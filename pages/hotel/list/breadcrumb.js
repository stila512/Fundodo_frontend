import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import scss from './breadCrumb.module.scss';

const pathMap = {
  '/home': { label: 'Home', link: '/home' },
  '/hotel': { label: '旅館列表', link: '/hotel' },
  '/hotel/detail': { label: '旅館詳情', link: '/hotel/detail' },
};

const Breadcrumb = () => {
  const router = useRouter();
  const { id } = router.query;

  const generateBreadcrumbs = () => {
    const asPath = router.asPath;
    const pathnames = asPath.split('/').filter((x) => x);
    const breadcrumbs = [pathMap['/home']];

    if (pathnames[0] === 'hotel') {
      breadcrumbs.push(pathMap['/hotel']);

      if (pathnames[1] === 'detail' && id) {
        breadcrumbs.push({ ...pathMap['/hotel/detail'], link: `/hotel/detail/${id}` });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
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
  );
};

export default Breadcrumb;