import { useEffect, useState } from 'react';
import FddBtn from '@/components/buttons/fddBtn';
import Image from 'next/image';
import { apiBaseUrl } from '@/configs';
import { TbTrashX } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import s from './cart-page.module.scss';

//TODO: 以下 testData 僅供無後台情況時，本機測試用
const testData = [
  {
    hotel_name: '毛起來住寵物旅館',
    pic_path: '',
    start_date: '2024-08-16',
    end_date: '2024-08-17',
    bodytype: '中型犬',
    price: 337,
    qty: 1,
    tot: 337,
    key: 'dfjiaoejga'
  },
  {
    hotel_name: '毛起來住寵物旅館',
    pic_path: '',
    start_date: '2024-08-16',
    end_date: '2024-08-17',
    bodytype: '大型犬',
    price: 422,
    qty: 1,
    tot: 422,
    key: 'ef53dsegkj'
  }
];

//======= API =====================================
//== parameters
const USER_ID = 58;//todo: test
const apiLink = `${apiBaseUrl}/carts/${USER_ID}`;

//======= API END ==================================

const date2str = date => {
  const dArr = date.split('-');
  return dArr[0] + '年' + dArr[1] + '月' + dArr[2] + '日';
}

export default function HotelCartTable({ setAmount = () => { }, i_amt = -1 }) {
  const [dataArr, setDataArr] = useState([]);
  useEffect(() => {
    //todo: 後台尚未建立    
    setDataArr(testData);

  }, []);
  useEffect(() => {
    const total = dataArr.reduce((sum, cur) => sum + cur.tot, 0);
    setAmount(arr => arr.map((v, i) => (i === i_amt) ? total : v));
  }, [dataArr]);

  const noData = (!dataArr || dataArr.length === 0);

  return (
    <>
      <table className={s.cartTable}>
        <caption className='tx-default tx-shade4 tx-left'>共 {dataArr.length} 間旅館</caption>
        <thead>
          <tr>
            <th><TbTrashX /></th>
            <th></th>
            <th>入住資訊</th>
            <th>房型</th>
            <th style={{ width: '9rem' }}>單日房價</th>
            <th style={{ width: '9rem' }}>小計</th>
          </tr>
        </thead>
        <tbody className='tx-body'>
          {noData ? <tr><th colSpan={6}><h2 className='tx-shade4'>購物車現在空無一物</h2></th></tr> :
            dataArr.map((item) => (
              <tr key={item.key}>
                <td>
                  <FddBtn color='tint4' size='sm' icon callback={() => { }}>
                    <RxCross2 />
                  </FddBtn>
                </td>
                <td>
                  <Image
                    src="https://fakeimg.pl/100x100/"
                    width={100}
                    height={100}
                    alt={item.hotel_name}
                  />
                </td>
                <td>
                  <p>{item.hotel_name}</p>
                  <p>{date2str(item.start_date) + '—' + date2str(item.end_date)}</p>
                </td>
                <td>
                  <p>
                    <span>{item.bodytype}</span>
                    <br className="d-lg-none" />
                    <span className="d-none d-lg-inline">{' '}</span>
                    <span>{item.qty} 間</span>
                  </p>

                </td>
                <td>
                  <div className="mx-auto pe-1 tx-right w-fit">
                    ${item.price}
                  </div>
                </td>
                <td>
                  <div className="mx-auto pe-1 tx-right w-fit">
                    ${item.tot}
                  </div></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </>
  )
}
