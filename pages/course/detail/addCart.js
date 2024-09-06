import React, { useState, useEffect,useContext } from 'react'
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/AuthContext';
import Modal from '@/components/common/modal';
import scss from './addCart.module.scss';
import { FaPlayCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { PiVideoBold } from "react-icons/pi";
import Link from 'next/link';
import tokenDecoder from '@/context/token-decoder';

export default function AddCart({ original_price, sale_price, id }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [uID, setUID] = useState(0);
  const [hasPurchased, setHasPurchased] = useState(false);
  const [purchaseDate, setPurchaseDate] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });


  useEffect(() => {
    const { userId } = tokenDecoder();
    setUID(userId ? userId : 0);
  }, [])

  useEffect(() => {
    const checkPurchaseStatus = async () => {
      if (user && id) {
        try {
          console.log('cid:', id);
          const userId = uID; // 使用解析後的 userId
          const res = await fetch(`http://localhost:3005/api/course/permission?courseId=${id}&userId=${userId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          const data = await res.json();
          console.log('Purchase status response:', data);
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
  }, [user, id, uID]);


  const addToCart = async (shouldRedirect = false) => {
    if (!uID) {
      router.push('/member/login');
      return;
    }

    const crsData = new FormData();
    crsData.append('user_id', uID);
    crsData.append('buy_sort', 'CR');
    crsData.append('buy_id', id);
    crsData.append('quantity', 1);

    try {
      const response = await fetch('http://localhost:3005/api/cart', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: crsData
      });

      const result = await response.json();

      if (result.status === "success") {
        if (shouldRedirect) {
          router.push('http://localhost:3000/buy');  
        } else {
          setModalContent({
            title: '成功',
            message: '已成功加入購物車'
          });
          setShowModal(true);
        }
      } else {
        throw new Error(result.message || '加入購物車失敗');
      }
    } catch (error) {
      console.error('操作失敗:', error);
      setModalContent({
        title: '錯誤',
        message: '操作失敗，請稍後再試'
      });
      setShowModal(true);
    }
  };

  const handlePurchase = async () => {
   addToCart(true);
  };

  const handleAddToCart = async () => {
    if (isAddingToCart) return;
    setIsAddingToCart(true);
    await addToCart(false);
    setIsAddingToCart(false);
  };


  return (
    <>
    <div className={scss.stickyWrapper}>
    <div className={scss.cartBox}>
        {hasPurchased ? (
          <>
            <div className={scss.watchContent}>
              <PiVideoBold className={scss.icon} />
              <p>您已於 {new Date(purchaseDate).toLocaleDateString()} 購買此課程</p>
            </div>
            <Link href={`/course/play/${id}`} className={scss.btn}>
              <FaPlayCircle />
              <p>觀看課程</p>
            </Link>
          </>
        ) : (
          <>
            <div className={scss.price}>
              <h2>NT$ {sale_price}</h2>
              <p>NT$ {original_price}</p>
            </div>
           
            <div className={scss.btns}>
              <button 
                  onClick={handlePurchase} 
                  className={scss.purchaseBtn}
                >
                  立即購買
                </button>
               <button 
                  onClick={handleAddToCart}  
                  className={scss.cartBtn} 
                  disabled={isAddingToCart}
                >
                  <FaShoppingCart size={20} />
                  <span>{isAddingToCart ? '加入中...' : '加入購物車'}</span>
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
    </div>
     
    </>
  )
}