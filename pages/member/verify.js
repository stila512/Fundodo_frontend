import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function VerifyPage() {
    const router = useRouter();

    useEffect(() => {
        const { token } = router.query;

        if (token) {
            console.log('Token received:', token);
            // 直接將 token 存入 localStorage
            localStorage.setItem('token', token);

            // 重定向到您想要的頁面
            router.push('/member/peopleInfoData');
        }
    }, [router.query]);

    return <div>驗證中...</div>;
}
