import React from 'react'
import scss from './tags.module.scss';
import { MdArrowForwardIos } from "react-icons/md";

export default function Tags({ selectedCategory, setSelectedCategory, categories }) {


  return (
    <>
      <div className={["col-11 col-lg-9", scss.tags].join(' ')}>
        {categories.map(category => (
          <button
            key={category.id}
            className={`${scss.tag} ${selectedCategory === category.name ? scss.selected : ''}`}
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </>
  )
}
