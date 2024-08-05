import BuyProgress from '@/components/buy/buyProgress';
import BuyLayout from '@/components/layout/buy';
import { apiBaseUrl } from '@/configs';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import axios from 'axios';
import Image from 'next/image';
import FddBtn from '@/components/buttons/fddBtn';
import s from './cart-page.module.scss';
import { TbTrashX } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { LuPlus, LuMinus } from "react-icons/lu";

//======= API ==================================
//== parameters
const USER_ID = 58;//todo: test

const apiLink = `${apiBaseUrl}/carts/${USER_ID}`;

// const getData = async () => {
//   const apiLink = `${serverLink}/api/carts/${USER_ID}`;


//   const results = await axios.get(apiLink);

//   if (results.data.status === 'success') {
//     return results.data.result;
//   } else {
//     throw new Error(`伺服器回應：${response.data.message}`);
//   }
// }
//======= API END ==================================

const NumberPanel = ({qty = 1}) => {
  const [number, setNumber] = useState(qty);

  return (
    <div className='hstack mx-auto p-2' style={{ width: '8rem', height: '3rem', border: '1px solid #787473' }}>
      <div className='fx-center' onClick={() => setNumber(number - 1)}>
        <LuMinus />
      </div>
      <div className='flex-grow-1'>{number}</div>
      <div className='fx-center' onClick={() => setNumber(number + 1)}>
        <LuPlus />
      </div>
    </div>
  )
}

export default function CartPage() {
  const [dataArr, setDataArr] = useState([]);
  const [qtyArr, setQtyArr] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const results = await axios.get(apiLink);

      if (results.data.status !== 'success') {
        throw new Error(`伺服器回應：${response.data.message}`);
      }
      setDataArr(results.data.result);
    }
    getData();
    setQtyArr(dataArr.flatMap(d => d.qty));
  }, []);


  const noData = (!dataArr || dataArr.length === 0);

  return (
    <>
      <Head>
        <title>購物車 | Fundodo</title>
      </Head>
      <BuyProgress stage={1} />
      <section className="container mt-5">
        <h4>共 {dataArr.length} 件商品</h4>
        <table className={s.cartTable}>
          <thead>
            <tr>
              <th><TbTrashX /></th>
              <th></th>
              <th>商品資訊</th>
              <th>規格</th>
              <th>單價</th>
              <th>數量</th>
              <th>小計</th>
            </tr>
          </thead>
          <tbody>
            {noData ? <></> :
              dataArr.map((item, i_data) => {
                let specIndicator =
                  (item.sort_name ? 1 : 0) + (item.spec_name ? 2 : 0);
                let infoStr = '';
                switch (specIndicator) {
                  case 3:
                    infoStr = [item.sort_name, item.spec_name].join('、');
                    break;
                  case 2:
                    infoStr = item.spec_name;
                    break;
                  case 1:
                    infoStr = item.sort_name;
                    break;
                  case 0:
                  default:
                    break;
                }
                const imgPath = '/pic-prod/' + item.pic_path;
                return (
                  <tr key={item.key}>
                    <td>
                      <FddBtn color='tint4' size='sm' icon callback={() => { }}>
                        <RxCross2 />
                      </FddBtn>
                    </td>
                    <td>
                      <div className="mx-auto">
                        <Image
                          src={imgPath}
                          width={100}
                          height={100}
                          alt={item.name}
                        />
                      </div>
                    </td>
                    <td>{item.name}</td>
                    <td>{infoStr}</td>
                    <td style={{ minWidth: '4rem' }}>
                      <div className="mx-auto pe-1 tx-right" style={{ width: '3rem' }}>
                        ${item.price}
                      </div>
                    </td>
                    <td><NumberPanel qty={qtyArr[i_data]} setFunc={setQtyArr} index={i_data} /></td>
                    <td>小計</td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
        {noData ? <h2 className='tx-dark'>購物車現在空無一物</h2>
          : <></>}
      </section>
    </>
  );
};

CartPage.layout = BuyLayout;
