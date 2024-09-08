import React, { useState, useEffect, useCallback } from 'react';
import ReactSlider from 'react-slider';
import scss from './priceFilter.module.scss';

export default function PriceFilter({ min, max, onChange, resetTrigger }) {
  const [values, setValues] = useState([min, max]);

  useEffect(() => {
    setValues([min, max]);
  }, [min, max, resetTrigger]); 
  
  const handleSliderChange = useCallback((newValues) => {
    setValues(newValues);
    if (onChange) {
      onChange(newValues[0], newValues[1]);
    }
  }, [onChange]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  return (
    <div className={scss.priceFilter}>
      <div className={scss.priceRange}>
        NT${formatPrice(values[0])} - NT${formatPrice(values[1])}
      </div>
      <ReactSlider
        className={[scss.horizontalSlider, 'bg-primary'].join(' ')}
        thumbClassName={scss.thumb}
        trackClassName={scss.track}
        value={values}
        min={min}
        max={max}
        onChange={handleSliderChange}
        renderTrack={(props, state) => {
          const trackClassName = state.index === 1 ? scss['track-1'] : scss['track-0'];
          return <div {...props} className={`${scss.track} ${trackClassName}`} />;
        }}
      />
    </div>
  );
}