import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/AuthContext';
import useLocalStorage from '@/hooks/use-localstorage.js';

export default function useAuthRedirect() {
  const { user: authUser, loading: authLoading } = useContext(AuthContext);
  const router = useRouter();
  const [_, setValue] = useLocalStorage('redirFrom', '');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token || authUser === null) {
      setValue(router.pathname);
      router.push('/member/login');
      return;
    }

    // if (!authLoading && (!authUser || !authUser.uuid)) {
    //   router.push('/member/login');
    // }
  }, [authUser, authLoading, router]);
}