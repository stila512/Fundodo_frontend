import { useRouter } from 'next/router'
import { useEffect } from 'react';
import DefaultLayout from '@/components/layout/default';
import dynamic from 'next/dynamic';

export default function Index() {
  // const router = useRouter();
  const Loader = dynamic(() => import('@/components/common/loading'));
  const HomePage = dynamic(
    () => import('./home'),
    {
      ssr: false, loading: () => <Loader />,
    }
  );

  // useEffect(() => {
  //   router.push('/home');
  // }, [])

  // router.push('/dev');
  return (<HomePage />)

}
Index.layout = DefaultLayout;
