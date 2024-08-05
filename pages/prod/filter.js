import { useState } from 'react';
import scss from './filter.module.scss';

export default function Filter() {
    const categorys = [
        '一般乾糧', '無穀乾糧', '一般凍乾', '無穀凍乾', '功能配方', '處方飼料'
    ];

    const [category, setCategory] = useState('');

    return (
        <div className={scss.radioWrapper}>
            {categorys.map((v, i) => (
                <label
                    key={i}
                    className={`${scss.customRadio} ${v === category ? scss.selected : ''}`}
                >
                    <input
                        type="radio"
                        value={v}
                        checked={v === category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={scss.hiddenRadio}
                    />
                    <span className={scss.radioIndicator}></span>
                    {v}
                </label>
            ))}
        </div>
    );
}
