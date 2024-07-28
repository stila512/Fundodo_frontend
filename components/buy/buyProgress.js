import React from 'react';
import s from './progress.module.scss';
import colors from '@/styles/useful/exported-color.module.scss';

export default function BuyProgress({ stage = 1 }) {
  return (
    <div className={s.progressBox}>
      {Array(3)
        .fill('0')
        .map((_, i) => {
          const isCurrent = stage === i + 1;
          const palette = {
            color: isCurrent ? colors.colorTint5 : colors.colorShade3,
            backgroundColor: isCurrent ? colors.primary : colors.colorTint4,
          };
          return (
            <div key={i} className={s.circle} style={palette}>
              {i + 1}
            </div>
          );
        })}
    </div>
  );
}
