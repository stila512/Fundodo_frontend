import { useRouter } from 'next/router'
import { useEffect, Suspense } from 'react';
import DefaultLayout from '@/components/layout/default';
import dynamic from 'next/dynamic';
import Loading from '@/components/common/loading.js';
import Head from 'next/head';
// import Home from '@/pages/home'

//*V1
// export default function Index() {
//   return (
//     <Suspense fallback={<Loading />}>
//       <Home />
//     </Suspense>
//   )
// }
//*V2
// export default function Index() {
//   const HomePage = dynamic(
//     () => import('./home'),
//     {
//       ssr: false, loading: () => <Loading />,
//     }
//   );
//   return (<HomePage />)
// }
//*V3: original version
export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.push('/home');
  }, [])

  return (
    <>
      <Head><title>歡迎來到翻肚肚 | Fundodo</title></Head>
      <Loading />
    </>
  )
    ;
}
Index.layout = DefaultLayout;
