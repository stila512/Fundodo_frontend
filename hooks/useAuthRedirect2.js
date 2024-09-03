import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/AuthContext';

export default function useAuthRedirect() {
  const { user: authUser, loading: authLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/member/login_BackEnd');
      return;
    }

    if (authUser && authUser.user_level !== 20) {
      router.push('/member/login_BackEnd');
      return;
    }

  }, [authUser, authLoading, router]);
}
