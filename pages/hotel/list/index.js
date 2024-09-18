import React,{useState} from 'react';
import Head from 'next/head';
import DefaultLayout from '@/components/layout/default';
import styles from '@/pages/hotel/list/index.module.scss';
import SearchBar from './SearchBar';
import HotelBlock from './hotelBlock';
import Sort from './sort';
import BreadCrumb from './breadcrumb';
import Loading from '@/components/common/loading.js';




export default function HotelPage() {
  //--props
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  const handleSort = (option) => {
    setSortOption(option);
  };



  return (
    <>
    <Head>
      <title>寵物旅館住宿 | Fundodo</title>
    </Head>
    <div className={styles.pageContainer}>
      <div className={styles.breadcrumbs}>
 
      </div>
      <SearchBar onSearch={handleSearch}/>
      <div className={styles.navContainer}>
       <BreadCrumb/>
        <Sort onSort={handleSort} />
      </div>
      <HotelBlock searchQuery={searchQuery} sortOption={sortOption}/>
    </div>
  </>
  );
}

HotelPage.layout = DefaultLayout;
