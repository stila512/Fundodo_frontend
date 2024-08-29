import React from 'react'
import Link from 'next/link';
import scss from './tags.module.scss';


export default function Tags({ selectedTag, setSelectedTag, tags, linkMode = false  }) {

  return (
    <>
      <div className='container'>
        <div className={scss.tags}>
        {tags.map((tag, index) => (
            <Link 
              key={index} 
              href={`/course?tag=${encodeURIComponent(tag)}`}
              passHref
            >
              <button className={`${scss.btn} ${selectedTag === tag ? scss.selected : ''}`}
            onClick={(e) => {
                  if (!linkMode && setSelectedTag) {
                    e.preventDefault();
                    setSelectedTag(tag);
                  }
                }}
              >
                {tag}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
