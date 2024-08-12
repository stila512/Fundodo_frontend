import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import styles from './sort.module.scss';

const sort = () => {
	return (
		<div className={styles.container}>
			<div className={styles.title}>排序依據:</div>
			<div className={styles.selectContainer}>
				<select className={styles.select} name="" id="">
					<option value="">最新上架</option>
					<option value="">價格由低到高</option>
					<option value="">價格由高到低</option>
				</select>
				<IoIosArrowDown className={styles.selectArrow} />
			</div>
		</div>
	);
};

export default sort;
