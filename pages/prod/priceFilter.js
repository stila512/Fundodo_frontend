import { useState } from 'react';
import ReactSlider from 'react-slider';
import scss from '@/pages/prod/priceFilter.module.scss';

export default function PriceFilter() {
    const [values, setValues] = useState([0, 10000]);

    const handleSliderChange = (newValues) => {
        setValues(newValues);
    };

    return (
        <div className={scss.priceFilter}>
            <div className={scss.priceRange}>${values[0]} - ${values[1]}</div>
            <ReactSlider
                className={[scss.horizontalSlider, 'bg-primary'].join(' ')}
                thumbClassName={scss.thumb}
                trackClassName={scss.track}
                value={values}
                min={0}
                max={10000}
                onChange={handleSliderChange}
                renderTrack={(props, state) => {
                    const trackClassName = state.index === 1 ? scss['track-1'] : scss['track-0'];
                    return <div {...props} className={`${scss.track} ${trackClassName}`} />;
                }}
            />
        </div>
    );
};
