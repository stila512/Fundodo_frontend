import { useRouter } from 'next/router'
import { useEffect, Suspense } from 'react';
import DefaultLayout from '@/components/layout/default';
import dynamic from 'next/dynamic';
import Loading from '@/components/common/loading.js';
import HomePage from '@/pages/home'

//*V1
// export default function Index() {
//   return (
//     <Suspense fallback={<Loading />}>
//       <HomePage />
//     </Suspense>
//   )
// }
//*V2
export default function Index() {
  // const Loader = dynamic(() => import('@/components/common/loading'));

  const HomePage = dynamic(
    () => import('./home'),
    {
      ssr: false, loading: () => <Loading />,
    }
  );
  return (<HomePage />)
}
//*V3
// export default function Index() {
//   const router = useRouter();

//   useEffect(() => {
//     router.push('/home');
//   }, [])

//   return <></>;
// }
Index.layout = DefaultLayout;
