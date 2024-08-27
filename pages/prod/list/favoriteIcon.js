import { useState, useEffect, useContext } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { AuthContext } from '@/context/AuthContext'; 
import { useRouter } from 'next/router';

export default function FavoriteIcon({ className = {}, size = 24, style = {}, productId, productData }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            checkIfFavorite();
        }
    }, [user, productId]);

    const checkIfFavorite = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }
            

            const response = await fetch(`http://localhost:3005/api/prod/check/${productId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 401) {
                // 可能需要在這裡處理登出邏輯
                return;
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setIsFavorite(data.isFavorite);
        } catch (error) {
            console.error('檢查收藏狀態失敗:', error);
        }
    };

		const toggleFavorite = async () => {
			if (loading) return;

			if (!user) {
					alert('請先登入以收藏商品');
					router.push('/member/login');
					return;
			}

			try {
					const token = localStorage.getItem('token');
					if (!token) {
							console.error('No token found');
							alert('請重新登入');
							router.push('/member/login');
							return;
					}

					const response = await fetch(`http://localhost:3005/api/prod`, {
							method: isFavorite ? 'DELETE' : 'POST',
							headers: {
									'Content-Type': 'application/json',
									'Authorization': `Bearer ${token}`
							},
							body: JSON.stringify({ productId, productData })
					});

					if (response.status === 401) {
							alert('登入已過期，請重新登入');
							router.push('/member/login');
							return;
					}

					if (!response.ok) {
							throw new Error(`HTTP error! status: ${response.status}`);
					}

					const result = await response.json();
					setIsFavorite(!isFavorite);
					alert(result.message);
			} catch (error) {
					console.error('收藏操作失敗:', error);
					alert('操作失敗，請稍後再試');
			}
	};

    return (
        <div
            className={className}
            onClick={toggleFavorite}
            style={{ fontSize: size, ...style, cursor: 'pointer' }}
        >
            {isFavorite ? <FaHeart color="#B9A399" /> : <FaRegHeart />}
        </div>
    );
}