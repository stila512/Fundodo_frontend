import React from 'react';
import s from './progress.module.scss';
import colors from '@/styles/color/_variables-export.module.scss';

export default function BuyProgress({ stage = 1 }) {
  return (
    <div className="container">
      <div className={s.progressBox}>
        {Array(3)
          .fill('0')
          .map((_, i) => {
            const isCurrent = stage === i + 1;
            const palette = {
              color: isCurrent ? colors.tint5 : colors.shade3,
              backgroundColor: isCurrent ? colors.primary : colors.tint4,
            };
            return (
              <div key={i} className={s.circle} style={palette}>
                {i + 1}
              </div>
            );
          })}
      </div>
    </div>
  );
}
