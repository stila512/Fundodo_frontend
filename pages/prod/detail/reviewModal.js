import React, { useState } from 'react';
import StarRating from './StarRating';
import FddBtn from "@/components/buttons/fddBtn";
import { RxCross2 } from "react-icons/rx";
import s from './reviewModal.module.scss';

const ReviewModal = ({ isOpen, onClose, onSubmit, productId, userId, userName }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = () => {
    const reviewData = {
      rating,
      review_text: reviewText,
      image,
      productId,
      userId,
      userName
    };
    onSubmit(reviewData);
  };

  if (!isOpen) return null;

  return (
    <div className={s.modalOverlay}>
      <div className={s.modalContent} onClick={e => e.stopPropagation()}>
        <div className={s.closeBtnBox}>
          <FddBtn color="tint4" size='mini' icon callback={onClose}><RxCross2 /></FddBtn>
        </div>
        <h4>撰寫商品評論</h4>
        <div className={s.reviewContent}>
          <div className={s.ratingContainer}>
            <span>為此商品評分：</span>
            <StarRating rating={rating} onChange={setRating} interactive={true} />
          </div>
          <textarea
            className={s.reviewTextarea}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="分享您的使用體驗..."
            rows={5}
          />
          <div className={s.imageUpload}>
            <label htmlFor="reviewImage" className={s.uploadButton}>
              上傳圖片
            </label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
              id="reviewImage"
            />
            {image && <span className={s.fileName}>{image.name}</span>}
          </div>
        </div>
        <div className={s.btnBox}>
          <button className={s.cancelBtn} onClick={onClose}>取消</button>
          <button className={s.confirmBtn} onClick={handleSubmit}>提交評論</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;