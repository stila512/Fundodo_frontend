// function
import { useEffect } from 'react';
import deleteCartOf from './doSoftDelete';
// component
import Image from 'next/image';
import FddBtn from '@/components/buttons/fddBtn';
// styles
import { TbTrashX } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import s from './cart-page.module.scss';

//* 不可更改
const i_cart = 2;

export default function CrsCartTable({
  data = null,
  itemStateArr = [],
  setItemStateArr = () => { },
  setAmount = () => { },
}) {
  const noData = (!data || data.length === 0
    || itemStateArr.filter(v => v).length === 0);

  useEffect(() => {
    if (data) {
      const total = data.reduce((sum, cur) => sum + cur.price, 0);
      setAmount(arr => arr.map((v, i) => (i === i_cart) ? total : v));
    }
  }, [data]);

  /** 刪除購物車資料 */
  const handleDelete = (i_item, db_id) => {
    // 更新前端的監控數據
    const new_arr = itemStateArr.map(
      (state, j_item) => i_item === j_item ? false : state
    );
    setItemStateArr(prev => prev.map(
      (arr, i_cart) => (i_cart === CART_INDEX) ? new_arr : arr)
    );
    // 更新後台的資料庫
    deleteCartOf(db_id);
  }

  return (
    <>
      <table className={s.cartTable}>
        <caption className='tx-default tx-shade4 tx-left'>
          共 {itemStateArr.filter(v => v).length} 堂課程
        </caption>
        <thead>
          <tr>
            <th><TbTrashX /></th>
            <th></th>
            <th>課程資訊</th>
            <th style={{ width: '9rem' }}>方案價</th>
            <th style={{ width: '9rem' }}>小計</th>
          </tr>
        </thead>
        <tbody className='tx-body'>
          {noData || data.map((item, i_item) => (
            <tr key={item.cart_id}>
              <td>
                <FddBtn color='tint4' size='sm' icon callback={() => handleDelete(i_item, item.key)}>
                  <RxCross2 />
                </FddBtn>
              </td>
              <td>
                <div className="img-wrap-w100">
                  <Image
                    src={"/pic-course/" + item.pic_name}
                    width={0}
                    height={0}
                    alt={item.prod_name}
                  />
                </div>
              </td>
              <td>
                <p>{item.prod_name}</p>
              </td>
              <td>
                <div className="mx-auto pe-1 tx-right w-fit">
                  ${item.price}
                </div>
              </td>
              <td>
                <div className="mx-auto pe-1 tx-right w-fit">
                  ${item.price}
                </div></td>
            </tr>
          ))
          }
          {noData && <tr><td colSpan={7}>
            <FddBtn color='tint1' size='sm' href='/course'>來去逛逛寵物課程</FddBtn>
          </td></tr>}
        </tbody>
      </table>
    </>
  )
}
