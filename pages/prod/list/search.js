import React, { useState } from 'react'
import scss from './search.module.scss'
import { IoIosSearch } from "react-icons/io";

export default function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  }

  return (
    <form onSubmit={handleSearch} className={scss.searchGrid}>
      <div className='text-nowrap'>搜尋: </div>
      <input 
        type="search" 
        className={scss.search} 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="輸入關鍵字"
      />
      <button type="submit" className={scss.searchButton}><IoIosSearch size={24} color={'#B9A399'}/></button>
    </form>
  )
}