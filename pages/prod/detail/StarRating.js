import React from 'react';
import scss from './starRating.module.scss';
import { IoIosStarOutline, IoIosStarHalf, IoMdStar } from "react-icons/io";

export default function StarRating({ rating, onChange, interactive = false }) {
  const stars = [1, 2, 3, 4, 5];

  const renderStar = (starNumber) => {
    if (rating >= starNumber) {
      return <IoMdStar className={scss.star} />;
    } else if (rating > starNumber - 1) {
      return <IoIosStarHalf className={scss.star} />;
    } else {
      return <IoIosStarOutline className={scss.star} />;
    }
  };

  return (
    <div className={scss.starRating}>
      {stars.map((star) => (
        <span
          key={star}
          className={`${scss.starWrapper} ${star <= Math.floor(rating) ? scss.filled : ''}`}
          onClick={() => interactive && onChange && onChange(star)}
        >
          {renderStar(star)}
        </span>
      ))}
    </div>
  );
}