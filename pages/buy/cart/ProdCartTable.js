// function
import { useEffect, useState } from 'react';
import deleteCartOf from './doSoftDelete';
// component
import Image from 'next/image';
import FddBtn from '@/components/buttons/fddBtn';
import { NumberPanel } from '@/components/buttons/NumberPanel';
// styles
import s from './cart-page.module.scss';
import { TbTrashX } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";

//todo 將 isOutOfStock 與 stock_when_few 納入機制

//* 不可更改
const CART_INDEX = 0;

export default function ProdCartTable({
  data = null,
  itemStateArr = [],
  setItemStateArr = () => { },
  setAmount = () => { },
}) {
  const noData = (!data || data.length === 0
    || itemStateArr.filter(v => v).length === 0);

  const [qtyArr, setQtyArr] = useState([]);
  const [subtotArr, setSubtotArr] = useState([]);


  useEffect(() => {
    if(data) setQtyArr(data.map(d => d.quantity));
  }, [data]);

  //===== 計算 PD 購物車小計
  useEffect(() => {
    if (noData) return;

    const subtotList = qtyArr.map((q, i) => q * data[i].price);
    const total = subtotList.reduce((total, cur) => total + cur, 0);
    setSubtotArr(subtotList);
    setAmount(arr => arr.map((v, i) => (i === CART_INDEX) ? total : v));
  }, [qtyArr]);

  const handleZero = () => {
    console.log('ㄟ，不能歸零');
  }

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
          共 {itemStateArr.filter(v => v).length} 件商品
        </caption>
        <thead>
          <tr>
            <th className='d-none d-lg-table-cell'><TbTrashX /></th>
            <th></th>
            <th>商品資訊</th>
            <th>規格</th>
            <th style={{ width: '9rem' }}>單價</th>
            <th>數量</th>
            <th style={{ width: '9rem' }}>小計</th>
          </tr>
        </thead>
        <tbody className='tx-body'>
          {noData || data.map((item, i_item) => itemStateArr[i_item] && (
            <tr key={item.key}>
              <td className='d-none d-lg-table-cell'>
                <FddBtn
                  color='tint4'
                  size='sm' icon
                  callback={() => handleDelete(i_item, item.key)}
                >
                  <RxCross2 />
                </FddBtn>
              </td>
              <td>
                <div className="img-wrap-h100" style={{ height: 100 }}>
                  <Image
                    src={'/pic-prod/' + item.pic_name}
                    width={0}
                    height={0}
                    alt={item.prod_name}
                  />
                </div>
              </td>
              <td>{item.prod_name}</td>
              <td>
                {item.sort_name ? <p>{item.sort_name}</p> : <></>}
                {item.spec_name ? <p>{item.spec_name}</p> : <></>}
              </td>
              <td>
                <div className="mx-auto pe-1 tx-right w-fit">
                  ${item.price_sp ? item.price_sp : item.price}
                </div>
              </td>
              <td>
                <NumberPanel
                  quantity={qtyArr[i_item]}
                  setFunc={setQtyArr}
                  index={i_item}
                  min={1}
                  onOverMin={() => handleZero()}
                  doesDisableMinus={qtyArr[i_item] <= 0}
                />
              </td>
              <td>${subtotArr[i_item]}</td>
            </tr>
          ))}
          {noData && <tr><td colSpan={7}>
          <FddBtn color='secondary' size='sm' href='/course'>來去逛逛寵物商城</FddBtn>
          </td></tr>}
        </tbody>
      </table>
    </>
  )
}
