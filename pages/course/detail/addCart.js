import { apiBaseUrl } from '@/configs';
import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/AuthContext';
import Modal from '@/components/common/modal';
import scss from './addCart.module.scss';
import { FaPlayCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { PiVideoBold } from "react-icons/pi";
import Link from 'next/link';
import tokenDecoder from '@/context/token-decoder';
import axios from 'axios';

export default function AddCart({ original_price, sale_price, id }) {
  const { user: userPkg } = useContext(AuthContext);
  const router = useRouter();
  const [hasPurchased, setHasPurchased] = useState(false);
  const [purchaseDate, setPurchaseDate] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });
  const [doesExistInCart, setDoesExistInCart] = useState(false);

  const { user } = useContext(AuthContext);
  //===== 會員 ID
  //0 | 未登入 ; -1 | 讀取中
  /** @type {[number, React.Dispatch<number>]} */
  const [uID, setUID] = useState(-1);

  //===== 獲得登入的會員 ID & 判斷管理員登入
  useEffect(() => {
    //第一次載入，得到 undefined
    if (user === undefined) return;
    //第二次載入，得到 null
    if (user === null) return setUID(0);
    // 其他情況的提防
    if (typeof user !== 'object') return console.error('objcet "user" 出現了意料外的情形!!');

    setUID(user.userId);
  }, [user]);

  useEffect(() => {
    const checkPurchaseStatus = async () => {
      try {
        const userId = uID; // 使用解析後的 userId
        const res = await fetch(`${apiBaseUrl}/course/permission?courseId=${id}&userId=${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await res.json();
        // console.log('Purchase status response:', data);
        if (data.status === 'success' && data.hasPurchased) {
          // 如果已經購買課程
          setHasPurchased(true);
          setPurchaseDate(data.startDate);
        } else {
          // 如果尚未購買課程
          const isInCart = await axios.get(
            `${apiBaseUrl}/cart/check-crs?uid=${uID}&cid=${id}`
          ).then(res => res.data.result);
          setDoesExistInCart(isInCart);
        }
      } catch (error) {
        console.error('檢查課程權限時出錯:', error);
      }
    };

    if (uID !== 0 && id) {
      checkPurchaseStatus();
    }
  }, [uID, id]);


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
            style: result.result ? 1 : 2,
            title: result.result ? '成功' : '放心',
            message: result.result ? '已成功加入購物車' : '此課程已經在購物車了'
          });
          setShowModal(true);

          if (result.result) setDoesExistInCart(true);
        }
      } else {
        throw new Error(result.message || '加入購物車失敗');
      }
    } catch (error) {
      console.error('操作失敗:', error);
      setModalContent({
        style: 2,
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
                <h2>NT$ {Number(sale_price).toLocaleString()}</h2>
                <p>NT$ {Number(original_price).toLocaleString()}</p>
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
                  <span>{isAddingToCart ? '加入中...'
                    : (doesExistInCart ? '已加入購物車' : '加入購物車')}</span>
                </button>
              </div>
            </>
          )}
        </div>
        <Modal
          mode={1}
          style={modalContent.style}
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