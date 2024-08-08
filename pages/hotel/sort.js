import React from 'react';
import styles from './sort.module.scss';

export default function Sort() {
  <>
  <div style={{ display: 'flex', alignItems: 'center' }}>
  <div className="title">排序依據: </div>
  <select className="select">
    <option value="">最新上架</option>
    <option value="">價格由低到高</option>
    <option value="">價格由高到低</option>
  </select>
</div>

  </>
}