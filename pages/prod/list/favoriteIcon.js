import { useState } from 'react';
import { FaRegHeart, FaHeart } from 'react-icons/fa';

export default function FavoriteIcon({ className = {}, size = 24, style = {} }) {
    // 使用 useState 來控制是否已加入收藏
    const [isFavorite, setIsFavorite] = useState(false);

    // 切換收藏狀態
    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    }

    return (
        <div
            className={className} // 允許外部傳入自訂的 className
            onClick={toggleFavorite}
            style={{ fontSize: size, ...style }} // 允許外部傳入自訂的內聯樣式
        >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </div>
    );
}
