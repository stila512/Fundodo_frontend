import { useState, useEffect } from 'react';
import scss from './filter.module.scss';
import PropTypes from 'prop-types';

function Filter({ className = {}, categories = [], onChange, multiple = false, resetTrigger, selected  }) {

  const [selectedCategories, setSelectedCategories] = useState(multiple ? [] : selected || '');

  useEffect(() => {
    setSelectedCategories(multiple ? [] : '');
  }, [categories, multiple, resetTrigger]);

  useEffect(() => {
    setSelectedCategories(multiple ? [] : selected || '');
  }, [categories, multiple, resetTrigger, selected]);

  const handleChange = (e) => {
    const newValue = e.target.value;

    if (multiple) {
      setSelectedCategories((prev) => {
        const newSelection = prev.includes(newValue)
          ? prev.filter((category) => category !== newValue)
          : [...prev, newValue];

        if (onChange) {
          onChange(newSelection);
        }

        return newSelection;
      });
    } else {
      setSelectedCategories(newValue);
      if (onChange) {
        onChange(newValue);
      }
    }
  };

  if (!Array.isArray(categories) || categories.length === 0) {
    return <div className={className.wrapper || ''}>無可用選項</div>;
  }

  return (
		<>
      {categories.map((category, i) => (
        <label
          key={i}
          className={`
            ${scss.customRadio} 
            ${className.radio || ''}
            ${(multiple ? selectedCategories.includes(category) : category === selectedCategories)
              ? `${scss.selected} ${className.selected || ''}`
              : ''}
          `}
        >
          <input
            type={multiple ? "checkbox" : "radio"}
            value={category}
            checked={multiple
              ? selectedCategories.includes(category)
              : category === selectedCategories}
            onChange={handleChange}
            className={`${scss.hiddenRadio}`}
          />
          <span className={`${scss.radioIndicator} ${className.indicator || ''}`}></span>
          {category}
        </label>
      ))}
			</>
  );
}

Filter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  multiple: PropTypes.bool,
  resetTrigger: PropTypes.number,
  className: PropTypes.shape({
    wrapper: PropTypes.string,
    radio: PropTypes.string,
    selected: PropTypes.string,
    input: PropTypes.string,
    indicator: PropTypes.string
  })
};

export default Filter;