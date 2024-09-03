import React, { useState, useEffect, useContext } from 'react';
import DefaultLayout from '@/components/layout/default';
import scss from './favoriteProd.module.scss';
import FavoriteIcon from './favoriteIcon';
import Image from 'next/image';
import Link from 'next/link';
import SideText from '@/components/member/SideText';
import { AuthContext } from '@/context/AuthContext';

export default function FavoriteProd() {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [error, setError] = useState(null);
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      if (loading) return; // 如果還在加載用戶信息，則等待

      if (!user) {
        setError('請先登入');
        return;
      }

      try {
        const token = localStorage.getItem('token');
        console.log('Using token:', token); // 檢查 token

        const response = await fetch(`http://localhost:3005/api/prod/favorites`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('Response status:', response.status);

        if (response.status === 401) {
          setError('未授權，請重新登入');
          // 可能需要在這裡調用 logout 函數
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Received data:', data);
        setFavoriteProducts(data.favorites);
      } catch (err) {
        console.error('Error fetching favorite products:', err);
        setError(err.message || 'Failed to load favorite products');
      }
    };

    fetchFavoriteProducts();
  }, [user, loading]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <body className='bg-secondary'>
        <main className={['container row jc-between', scss.pd].join(' ')}>
          <div className={['row', scss.bg, 'col-9'].join(' ')}>
            {favoriteProducts.length === 0 ? (
              <div>您還沒有收藏任何商品。</div>
            ) : (
              favoriteProducts.map((product) => (
                <div key={product.id} className='col-xxl-3 col-xl-4 col-6'>
                  <div className={scss.card}>
                    <div className={scss.prodImgBox}>
                      <div className={[scss.prodImg, 'img-wrap-w100', 'img-wrap-h100'].join(' ')}>
                        <Image
                          src={`/pic-prod/${product.product_image}`}
                          alt={product.product_name}
                          width={100}
                          height={100}
                          layout="responsive"
                        />
                      </div>
                    </div>
                    <div className={scss.textarea2}>
                      <div className={scss.textarea}>
                        <span className={scss.prodName}>{product.product_name}</span>
                      </div>
                      <div className={scss.textarea}>
                        <span className={scss.prodPrice}>
                          {product.product_price}
                        </span>
                      </div>
                    </div>
                    <Link className={scss.btn} href={`/prod/detail/${product.product_id}`}>
                      <span>我要購買</span>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className={['col-3', scss.sideTextGrid].join(' ')}>
            <SideText activeIndex={4} />
          </div>
        </main>
      </body>
    </>
  );
}

FavoriteProd.layout = DefaultLayout;