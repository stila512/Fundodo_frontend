import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import styles from './sort.module.scss';

export default function Sort({ onSort }) {
  const handleSortChange = (e) => {
    onSort(e.target.value);
  };

	return (
			<div className={styles.container}>
				<div className={styles.title}>排序依據:</div>
				<div className={styles.selectContainer}>
				<select className={styles.select} onChange={handleSortChange}>
				<option value="default">請選擇排序</option>
					<option value="new">最新上架</option>
					<option value="priceAsc">價格最高</option>
					<option value="priceDesc">價格最低</option>
				</select>
					<IoIosArrowDown className={styles.selectArrow} />
				</div>
			</div>
		);
}

