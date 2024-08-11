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
    name: '玩出好感情！與狗兒的互動遊戲課',
    pic_path: 'CR0000011.png',
    start_date: '2024-08-16',
    end_date: '2024-08-17',
    plan: '單堂線上遊戲課(5/18的重播教學)',
    price: 1200,
    key: 'semv8942lm'
  }
];

//======= API =====================================
//== parameters
const CRS_ID = 58;//todo: test
const apiLink = `${apiBaseUrl}/carts/${CRS_ID}`;

//======= API END ==================================

export default function CrsCartTable({ setAmount = () => { }, i_amt = -1 }) {
  const [dataArr, setDataArr] = useState([]);
  useEffect(() => {
    //todo: 後台尚未建立    
    setDataArr(testData);
    
  }, []);
  useEffect(() => {
    const total = dataArr.reduce((sum, cur) => sum + cur.price, 0);
    setAmount(arr => arr.map((v, i) => (i === i_amt) ? total : v));
  }, [dataArr]);

  const noData = (!dataArr || dataArr.length === 0);

  return (
    <>
      <table className={s.cartTable}>
        <caption className='tx-default tx-shade4 tx-left'>共 {dataArr.length} 堂課程</caption>
        <thead>
          <tr>
            <th><TbTrashX /></th>
            <th style={{ width: '200px' }}></th>
            <th>課程資訊</th>
            <th>方案</th>
            <th style={{ width: '9rem' }}>方案價</th>
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
                  <div className="img-wrap-w100">
                    <Image
                      src={"/pic-course/" + item.pic_path}
                      width={0}
                      height={0}
                      alt={item.name}
                    />
                  </div>
                </td>
                <td>
                  <p>{item.name}</p>
                </td>
                <td>
                  <p>{item.plan}</p>
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
