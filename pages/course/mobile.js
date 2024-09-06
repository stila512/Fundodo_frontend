import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import scss from './mobile.module.scss';
import { IoIosArrowDown } from 'react-icons/io';

const MobileFilterSort = ({ selectedTag, setSelectedTag, tags, sortBy, setSortBy }) => {
  return (
    <div className={scss.mobileFilterSort}>
      <div className={scss.tags}>
        <Swiper
          slidesPerView="auto"
          spaceBetween={10}
          freeMode={true}
          className={scss.tagsWrapper}
        >
          {tags.map((tag) => (
            <SwiperSlide key={tag.id} className={scss.tagSlide}>
              <span
                className={`${scss.tag} ${selectedTag === tag.name ? scss.active : ''}`}
                onClick={() => setSelectedTag(tag.name)}
              >
                {tag.name}
              </span>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={scss.sortRow}>
        <div className={scss.selectWrapper}>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className={scss.sortSelect}
          >
            <option value="newest">最新上架</option>
            <option value="mostViewed">最多觀看人數</option>
            <option value="priceLowToHigh">價格由低到高</option>
            <option value="priceHighToLow">價格由高到低</option>
          </select>
          <IoIosArrowDown className={scss.selectArrow} />
        </div>
      </div>
    </div>
  );
};

export default MobileFilterSort;