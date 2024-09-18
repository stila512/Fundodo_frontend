import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import scss from './tagFilter.module.scss'

const TagFilter = ({ tags, selectedTag, onTagChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const initialVisibleTags = 10;
  
  const filteredTags = tags.filter(tag => 
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleTags = isExpanded ? filteredTags : filteredTags.slice(0, initialVisibleTags);

  const handleTagClick = (tag) => {
    if (selectedTag === tag) {
      // 如果點擊的是當前選中的標籤，則取消選擇
      onTagChange('');
    } else {
      // 否則，選擇新的標籤
      onTagChange(tag);
    }
  };

  return (
    <div className='mb-5'>
      <div className={scss.tagFilterContainer}>
        {visibleTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={[scss.tagButton, selectedTag === tag ? scss.active : ''].join(' ')}
          >
            #{tag}
          </button>
        ))}
      </div>
      
      {filteredTags.length > initialVisibleTags && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={scss.handleToggle}
        >
          {isExpanded ? (
            <>
              收起 <IoIosArrowUp />
            </>
          ) : (
            <>
              更多標籤 <IoIosArrowDown />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default TagFilter;