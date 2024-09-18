import React from 'react'
import scss from './tags.module.scss';
import { MdArrowForwardIos } from "react-icons/md";

export default function Tags({ selectedTag, setSelectedTag, tags }) {


  return (
    <>
      <div className={["col-11 col-lg-9", scss.tags].join(' ')}>
        {tags.map(tag => (
          <button
            key={tag.id}
            className={`${scss.tag} ${selectedTag === tag.name ? scss.selected : ''}`}
            onClick={() => setSelectedTag(tag.name)}
          >
            {tag.name}
          </button>
        ))}
      </div>
    </>
  )
}
