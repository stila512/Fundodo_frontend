import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import scss from './breadcrumb.module.scss'; 



const Breadcrumb = () => {
  const router = useRouter();
  const { id } = router.query;
  const [hotelName, setHotelName] = useState('');

  const pathMap = {
    '/home': { label: '首頁', link: '/home' },
    '/hotel/list': { label: '旅館列表', link: '/hotel/list' },
    '/hotel/detail': { label: '旅館詳情', link: `/hotel/detail/${id}` },
  };

  useEffect(() => {
    const fetchHotelName = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/hotel/detail/${id}`);
          const result = await response.json();
          if (result.status === 'success') {
            setHotelName(result.data.name);
          } else {
            console.error('獲取旅館失敗:', result.message);
          }
        } catch (error) {
          console.error('獲取旅館失敗:', error);
        }
      }
    };

    fetchHotelName();
  }, [id]);

  const generateBreadcrumbs = () => {
    const asPath = router.asPath;
    const pathnames = asPath.split('/').filter((x) => x);
    const breadcrumbs = [pathMap['/home']];

    if (pathnames[0] === 'hotel') {
      if (pathnames[1] === 'list') {
        breadcrumbs.push(pathMap['/hotel/list']);
      } else if (pathnames[1] === 'detail' && pathnames[2]) {
        breadcrumbs.push(pathMap['/hotel/list']);
        breadcrumbs.push({ 
          label: hotelName || '旅館詳情', 
          link: `/hotel/detail/${pathnames[2]}` 
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