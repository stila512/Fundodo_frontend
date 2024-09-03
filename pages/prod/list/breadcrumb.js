import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import scss from './bread.module.scss';
import { IoIosArrowForward } from "react-icons/io";

const Breadcrumb = () => {
  const router = useRouter();
  const pathSegments = router.asPath.split('/').filter(segment => segment);

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);
    const isLast = index === pathSegments.length - 1;

    return (
      <React.Fragment key={href}>
        <li>
          {isLast ? (
            <span className={scss.shade3}>{label}</span>
          ) : (
            <Link href={href} className="tx-primary">
              {label}
            </Link>
          )}
        </li>
        {!isLast && <IoIosArrowForward />}
      </React.Fragment>
    );
  });

  return (
    <div className='d-block'>
      <nav aria-label="breadcrumb">
        <ol className={`${scss.ul} d-flex`}>
          <li>
            <Link href="/" className="tx-primary">
              Home
            </Link>
          </li>
          <IoIosArrowForward />
          {breadcrumbItems}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;