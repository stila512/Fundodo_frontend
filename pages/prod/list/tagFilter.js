import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import scss from './tagFilter.module.scss'
const TagFilter = ({ tags, selectedTag, onTagChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const initialVisibleTags = 10;
  
  const filteredTags = tags.filter(tag => 
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleTags = isExpanded ? filteredTags : filteredTags.slice(0, initialVisibleTags);

  return (
    <div className=''>
      <div className={scss.tagFilterContainer}>
        {visibleTags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagChange(tag)}
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
              收起 <ChevronUp className="w-4 h-4 ml-1" />
            </>
          ) : (
            <>
              更多標籤 <ChevronDown className="w-4 h-4 ml-1" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default TagFilter;