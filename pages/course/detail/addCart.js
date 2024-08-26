import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Modal from '@/components/common/modal';
import scss from './addCart.module.scss';
import { RiCoupon3Line, FaPlayCircle } from "react-icons/ri";
import Link from 'next/link';



export default function AddCart({ original_price, sale_price, id }) {
  const { user } = useContext(AuthContext);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [purchaseDate, setPurchaseDate] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });
  const router = useRouter();

  useEffect(() => {
    const checkPurchaseStatus = async () => {
      if (user) {
        try {
          const res = await fetch(`http://localhost:3005/api/course/permission?courseId=${id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          const data = await res.json();
          if (data.status === 'success' && data.hasPurchased) {
            setHasPurchased(true);
            setPurchaseDate(data.startDate);
          }
        } catch (error) {
          console.error('檢查課程權限時出錯:', error);
        }
      }
    };

    checkPurchaseStatus();
  }, [user, id]);

  const handlePurchase = () => {
    if (!user) {
      router.push('/member/login');
      return;
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      setModalContent({
        title: '請先登入',
        message: '請先登入後再加入購物車'
      });
      setShowModal(true);
      // router.push('/member/login');
      return;
    }

    setIsAddingToCart(true);

    try {
      const cartItem = {
        buy_sort: 'CR',
        buy_id: id,
        quantity: 1,
      };
      const response = await fetch('http://localhost:3005/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(cartItem)
      });

      const data = await response.json();
      if (data.status === 'success') {
        setModalContent({
          title: '成功',
          message: '加入購物車成功'
        });
      } else {
        throw new Error(data.message || '加入購物車失敗');
      }
    } catch (error) {
      console.error('加入購物車時發生錯誤:', error);
      setModalContent({
        title: '錯誤',
        message: '加入購物車時發生錯誤，請稍後再試。'
      });
    } finally {
      setIsAddingToCart(false);
      setShowModal(true);
    }
  };

  return (
    <>
    <div className={scss.cartBox}>
      {hasPurchased ? (
        <>
          <div className={scss.purchaseInfo}>
            <p>您已於 {new Date(purchaseDate).toLocaleDateString()} 購買此課程</p>
          </div>
          <Link href={`/course/play/${id}`} className={scss.watchCourseBtn}>
            <FaPlayCircle />
            觀看課程
          </Link>
        </>
      ) : (
        <>
          <div className={scss.price}>
            <h2>NT$ {sale_price}</h2>
            <p>NT$ {original_price}</p>
          </div>
          <div className={scss.coupon}>
            <RiCoupon3Line />
            <p>專屬優惠券 NT$ 50</p>
          </div>
          <div className={scss.btns}>
            <button onClick={handlePurchase}>
              立即購買
            </button>
            <button onClick={handleAddToCart} disabled={isAddingToCart}>
              {isAddingToCart ? '加入中...' : '加入購物車'}
            </button>
          </div>
        </>
      )}
    </div>
    <Modal
        mode={1}
        active={showModal}
        onClose={() => setShowModal(false)}
      >
        <h4>{modalContent.title}</h4>
        <p>{modalContent.message}</p>
      </Modal>
    </>
  )
}
