import { useRouter } from 'next/router'
import { useEffect } from 'react';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dev');
  })

  // router.push('/home');
  return (<></>)

}
