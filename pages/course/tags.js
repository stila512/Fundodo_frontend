import React, { useState, useEffect } from 'react'
import scss from './tags.module.scss';
import { MdArrowForwardIos } from "react-icons/md";

export default function Tags({ selectedCate, setSelectedCate }) {
  const [courseTags, setCourseTags] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3005/api/course/categories")
      .then(res => res.json())
      .then(result => setCourseTags(result.data))
      .catch(err => console.log(err))
  }, [])


  const handleCateClick = (categoryId) => {
    setSelectedCate(categoryId)
  }

  return (
    <>
      <div className={["col-9", scss.tags].join(' ')}>
        <button className={`${scss.tag} ${selectedCate === null ? scss.selected : ""}`} onClick={() => setSelectedCate(null)} >全部分類</button>
        {courseTags.map(v => (
          <button key={v.id} className={`${scss.tag} ${selectedCate === v.id ? scss.selected : ""}`} onClick={() => handleCateClick(v.id)}>{v.name}</button>
        ))}
        
      </div>
    </>
  )
}
