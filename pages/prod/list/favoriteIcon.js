import { useState, useEffect, useContext } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { AuthContext } from '@/context/AuthContext'; 
import { useRouter } from 'next/router';

export default function FavoriteIcon({ className = {}, size = 24, style = {}, productId, productData }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const { user, loading } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        // 檢查該商品是否已經在收藏列表中
        if (user) {
            checkIfFavorite();
        }
    }, [user, productId]);

    const checkIfFavorite = async () => {
        // 向後端 API 發送請求，檢查該商品是否已被收藏
        try {
            const response = await fetch(`http://localhost:3005/api/prod/check/${productId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
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
            router.push('/login');
            return;
        }

        try {
            const response = await fetch('http://localhost:3005/api/prod', {
                method: isFavorite ? 'DELETE' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ productId, productData })
            });

            if (response.ok) {
                setIsFavorite(!isFavorite);
                alert(isFavorite ? '已從收藏移除' : '已加入收藏');
            } else {
                throw new Error('操作失敗');
            }
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
            {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
        </div>
    );
}