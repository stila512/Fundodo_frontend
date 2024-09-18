import scss from './select.module.scss';
import { IoIosArrowDown } from 'react-icons/io';

export default function Select({ onChange }) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <>
      <div className={[scss.customSelect, 'd-flex', scss.rwd].join(' ')}>
        <div>排序依據: </div>
        <select onChange={handleChange}>
          <option value="default" selected>排序</option>
          <option value="newest">最新上架</option>
          <option value="price_asc">價格由低到高</option>
          <option value="price_desc">價格由高到低</option>
        </select>
        <div className={scss.arrow}>
          <IoIosArrowDown />
        </div>
      </div>
    </>
  );
}