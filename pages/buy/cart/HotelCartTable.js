import { useEffect } from 'react';
import FddBtn from '@/components/buttons/fddBtn';
import Image from 'next/image';
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
    if (data) {
      const total = data.reduce((sum, cur) => sum + cur.amount, 0);
      setAmount(arr => arr.map((v, i) => (i === i_amt) ? total : v));
    }
  }, [data]);


  return (
    <>
      <table className={s.cartTable}>
        <caption className='tx-default tx-shade4 tx-left'>共 {data ? data.length : 0} 間旅館</caption>
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
          {data.map((item) => (
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
                    alt={item.prod_name}
                  />
                </td>
                <td>
                  <p>{item.prod_name}</p>
                  <p>{date2str(item.check_in_date) + '—' + date2str(item.check_out_date)}</p>
                </td>
                <td>
                  <p>
                    <span>{item.room_type}（{item.dog_name}）</span>
                    <br className="d-lg-none" />
                    <span className="d-none d-lg-inline">{' '}</span>
                    <span>1 間</span>
                  </p>

                </td>
                <td>
                  <div className="mx-auto pe-1 tx-right w-fit">
                    ${item.amount}
                  </div>
                </td>
                <td>
                  <div className="mx-auto pe-1 tx-right w-fit">
                    ${item.amount}
                  </div></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}
