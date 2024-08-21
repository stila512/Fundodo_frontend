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
const i_cart = 0;

export default function ProdCartTable({
  data = null,
  cartLength = 0,
  setLengArr = () => { },
  setAmount = () => { },
}) {
  const [qtyArr, setQtyArr] = useState([]);
  const [subtotArr, setSubtotArr] = useState([]);

  const noData = (!data || data.length === 0);

  useEffect(() => {
    setQtyArr(data.map(d => d.quantity));
  }, [data]);

  //===== 計算 PD 購物車小計
  useEffect(() => {
    if (noData) return;
    const subtotList = qtyArr.map((q, i) => q * data[i].price);
    const total = subtotList.reduce((total, cur) => total + cur, 0);
    setSubtotArr(subtotList);
    setAmount(arr => arr.map((v, i) => (i === i_cart) ? total : v));
  }, [qtyArr]);

  const handleZero = () => {
    console.log('ㄟ，不能歸零');
  }

  return (
    <>
      <table className={s.cartTable}>
        <caption className='tx-default tx-shade4 tx-left'>
          共 {data ? data.length : 0} 件商品
        </caption>
        <thead>
          <tr>
            <th><TbTrashX /></th>
            <th></th>
            <th>商品資訊</th>
            <th>規格</th>
            <th style={{ width: '9rem' }}>單價</th>
            <th>數量</th>
            <th style={{ width: '9rem' }}>小計</th>
          </tr>
        </thead>
        <tbody className='tx-body'>
        {console.log(data.length)}
          {noData || data.map((item, i_data) => item.deleted_at && (
            <tr key={item.key}>
              <td>
                <FddBtn color='tint4' size='sm' icon callback={() => deleteCartOf(item.key)}>
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
                  quantity={qtyArr[i_data]}
                  setFunc={setQtyArr}
                  index={i_data}
                  min={1}
                  onOverMin={() => handleZero()}
                  doesDisableMinus={qtyArr[i_data] <= 0}
                />
              </td>
              <td>${subtotArr[i_data]}</td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </>
  )
}
