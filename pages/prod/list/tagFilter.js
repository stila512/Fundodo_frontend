import React from 'react';
import scss from './tagFilter.module.scss';

function TagFilter({ tags, selectedTag, onTagChange }) {
  return (
    <div className={scss.tagFilterContainer}>
      {tags.map((tag) => (
        <button
          key={tag}
          className={`${scss.tagButton} ${selectedTag === tag ? scss.active : ''}`}
          onClick={() => onTagChange(tag)}
        >
          #{tag}
        </button>
      ))}
    </div>
  );
}

export default TagFilter;