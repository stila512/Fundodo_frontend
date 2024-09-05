import React from 'react';
import styles from './selectBar.module.scss';
import FddBtn from '@/components/buttons/fddBtn';

export default function SearchBar() {

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({behavior:'smooth'});
    }
  }

  return (
    <>
      <div className={styles.selectBar}>
        <button className={styles.selectBtn} onClick={() => scrollToSection('hotel-intro') }>旅館簡介</button>
        <button className={styles.selectBtn} onClick={() => scrollToSection('faq-section') }>常見問題</button>
        <button className={styles.selectBtn}>評價</button>
      </div>
    </>
  );
}
