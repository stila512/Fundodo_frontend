import { useEffect, useState } from 'react';
import FddBtn from '@/components/buttons/fddBtn';
import Image from 'next/image';
import { apiBaseUrl } from '@/configs';
import { TbTrashX } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import s from './cart-page.module.scss';

const date2str = date => {
  const dArr = date.split('T')[0].split('-');
  return dArr[0] + '年' + dArr[1] + '月' + dArr[2] + '日';
}

export default function HotelCartTable({
  data = null,
  setAmount = () => { },
  i_amt = -1
}) {
  useEffect(() => {
    const total = data.reduce((sum, cur) => sum + cur.tot, 0);
    setAmount(arr => arr.map((v, i) => (i === i_amt) ? total : v));
  }, [data]);

  const noData = (!data || data.length === 0);

  return (
    <>
      <table className={s.cartTable}>
        <caption className='tx-default tx-shade4 tx-left'>共 {data.length} 間旅館</caption>
        <thead>
          <tr>
            <th><TbTrashX /></th>
            <th></th>
            <th>入住資訊</th>
            <th>房型</th>
            <th style={{ width: '9rem' }}>單房總額</th>
            <th style={{ width: '9rem' }}>小計</th>
          </tr>
        </thead>
        <tbody className='tx-body'>
          {noData ? <tr><th colSpan={6}><h2 className='tx-shade4'>購物車現在空無一物</h2></th></tr> :
            data.map((item) => (
              <tr key={item.key}>
                <td>
                  <FddBtn color='tint4' size='sm' icon callback={() => { }}>
                    <RxCross2 />
                  </FddBtn>
                </td>
                <td>
                  <Image
                    src={"/hotelPic/pic/" + item.pic_name}
                    width={100}
                    height={100}
                    alt={item.hotel_name}
                  />
                </td>
                <td>
                {console.log(item.hotel_name)}
                  <p>{item.hotel_name}</p>
                  <p>{date2str(item.check_in_date) + '—' + date2str(item.check_out_date)}</p>
                </td>
                <td>
                  <p>
                    <span>{item.room_type}</span>
                    <br className="d-lg-none" />
                    <span className="d-none d-lg-inline">{' '}</span>
                    <span>{'item.qty'} 間</span>
                  </p>

                </td>
                <td>
                  <div className="mx-auto pe-1 tx-right w-fit">
                    ${item.amount}
                  </div>
                </td>
                <td>
                  <div className="mx-auto pe-1 tx-right w-fit">
                    ${'item.tot'}
                  </div></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}
