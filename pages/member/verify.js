import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Loading from '@/components/common/loading';

export default function VerifyPage() {
  const router = useRouter();
  const [status, setStatus] = useState('loading');
  const { setLoading } = useContext(AuthContext);
  useEffect(() => {
    if (router.isReady) {
      const { token } = router.query;

      if (token) {
        console.log('Token received:', token);
        try {
          localStorage.setItem('token', token);
          console.log('Token saved to localStorage');
          // setLoading(true);
          router.push('/member/ChangePassword2').then(() => {
            setStatus('success');
          }).catch(error => {
            console.error('Redirect failed:', error);
            setStatus('error');
          });
        } catch (error) {
          console.error('Failed to save token:', error);
          setStatus('error');
        }
      } else {
        console.warn('No token found in query');
        setStatus('error');
      }
    }
  }, [router.isReady, router.query]);

    switch (status) {
        case 'loading':
            return <Loading></Loading>;
        case 'success':
            return <div>處理完成。</div>;
        case 'error':
            return <div>處理失敗。請重試。</div>;
        default:
            return <div>未知狀態</div>;
    }
}