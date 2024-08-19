import { useEffect, useState } from 'react';
import FddBtn from '@/components/buttons/fddBtn';
import Image from 'next/image';
import { TbTrashX } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import s from './cart-page.module.scss';
import { node } from 'prop-types';

export default function CrsCartTable({
  data = null,
  setAmount = () => { },
  i_amt = -1
}) {
  useEffect(() => {
    if (data) {
      const total = data.reduce((sum, cur) => sum + cur.price, 0);
      setAmount(arr => arr.map((v, i) => (i === i_amt) ? total : v));
    }
  }, [data]);


  return (
    <>
      <table className={s.cartTable}>
        <caption className='tx-default tx-shade4 tx-left'>共 {data ? 0 : data.length} 堂課程</caption>
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
          {data.map((item) => (
              <tr key={item.key}>
                <td>
                  <FddBtn color='tint4' size='sm' icon callback={() => { }}>
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
        </tbody>
      </table>
    </>
  )
}
