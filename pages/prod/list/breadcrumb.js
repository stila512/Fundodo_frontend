import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import scss from './breadcrumb.module.scss';

const Breadcrumb = () => {
  const router = useRouter();
  const { id } = router.query;
  const [productName, setProductName] = useState('');

  const pathMap = {
    '/': { label: '首頁', link: '/' },
    '/prod': { label: '商品列表', link: '/prod' },
    '/prod/detail': { label: '商品詳情', link: `/prod/detail/${id}` },
  };


  const generateBreadcrumbs = () => {
    const asPath = router.asPath;
    const pathnames = asPath.split('/').filter((x) => x);
    const breadcrumbs = [pathMap['/']];

    if (pathnames[0] === 'prod') {
      breadcrumbs.push(pathMap['/prod']);
      
      if (pathnames[1] === 'detail' && pathnames[2]) {
        breadcrumbs.push({ 
          label: productName || '商品詳情', 
          link: `/prod/detail/${pathnames[2]}` 
        });
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