import React, { useState, useEffect } from 'react';
import styles from './index.module.scss'

export default function Counter() {
  const [smallDogs, setSmallDogs] = useState(0);
  const [mediumDogs, setMediumDogs] = useState(0);
  const [largeDogs, setLargeDogs] = useState(0);
  const [totalDogs, setTotalDogs] = useState(0);
  const [selectedDogSize, setSelectedDogSize] = useState('小型犬');

  const increment = (setter, size) => () => {
    setter(prev => prev + 1);
    setSelectedDogSize(size);
  };

  const decrement = (setter, size) => () => {
    setter(prev => {
      if (prev > 0) {
        setSelectedDogSize(size);
      }
      return Math.max(0, prev - 1);
    });
  };

  useEffect(() => {
    setTotalDogs(smallDogs + mediumDogs + largeDogs);
  }, [smallDogs, mediumDogs, largeDogs]);

  

  return (
    <div className={styles.counterContainer}>
      <div className={styles.counterHeader}>{totalDogs} 隻 {selectedDogSize}</div>
      <div className={styles.counterHeader}>{totalDogs} 隻 {selectedDogSize}</div>
      <div className={styles.counterItem}>
        <span className={styles.counterLabel}>小型犬</span>
        <div className={styles.counterControls}>
          <button className={styles.counterButton} onClick={decrement(setSmallDogs, '小型犬')}>-</button>
          <span className={styles.counterValue}>{smallDogs}</span>
          <button className={styles.counterButton} onClick={increment(setSmallDogs, '小型犬')}>+</button>
        </div>
      </div>
      <div className={styles.counterItem}>
        <span className={styles.counterLabel}>中型犬</span>
        <div className={styles.counterControls}>
          <button className={styles.counterButton} onClick={decrement(setMediumDogs, '中型犬')}>-</button>
          <span className={styles.counterValue}>{mediumDogs}</span>
          <button className={styles.counterButton} onClick={increment(setMediumDogs, '中型犬')}>+</button>
        </div>
      </div>
      <div className={styles.counterItem}>
        <span className={styles.counterLabel}>大型犬</span>
        <div className={styles.counterControls}>
          <button className={styles.counterButton} onClick={decrement(setLargeDogs, '大型犬')}>-</button>
          <span className={styles.counterValue}>{largeDogs}</span>
          <button className={styles.counterButton} onClick={increment(setLargeDogs, '大型犬')}>+</button>
        </div>
      </div>
    </div>
  );
}