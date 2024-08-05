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

//TODO: Remove
const testData = [
  {
    name: 'Plus+機能保健系列 泌尿道紓壓保健',
    pic_path: 'PR0000001611.jpg',
    sort_name: '',
    spec_name: '1.5g x 30入',
    price: 450,
    qty: 1,
    key: 'dfjiaoejga'
  },
  {
    name: '花花拾便器套裝',
    pic_path: 'PR0000002581.jpg',
    sort_name: '補充替換袋',
    spec_name: '單入 (拾便器+拾便袋1捲)',
    price: 150,
    qty: 2,
    key: 'ef53j'
  },
  {
    name: 'LINSLINS寵物漏食玩具 - 魔法小兔帽',
    pic_path: 'PR0000003971.jpg',
    sort_name: '魔法小兔帽',
    spec_name: '',
    price: 250,
    qty: 1,
    key: 'ld073f3j'
  },
];

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

const NumberPanel = ({ quantity = 1, setFunc = () => { }, index = -1 }) => {

  return (
    <div className='hstack mx-auto p-2' style={{ width: '8rem', height: '3rem', border: '1px solid #787473' }}>
      <div className='fx-center' onClick={() => setFunc(arr => arr.map((d, j) => (j === index) ? d - 1 : d))}>
        <LuMinus />
      </div>
      <div className='flex-grow-1'>{quantity}</div>
      <div className='fx-center' onClick={() => setFunc(arr => arr.map((d, j) => (j === index) ? d + 1 : d))}>
        <LuPlus />
      </div>
    </div>
  )
}

export default function CartPage() {
  const [dataArr, setDataArr] = useState([]);
  const [qtyArr, setQtyArr] = useState([]);
  const [totArr, setTotArr] = useState([]);
  useEffect(() => {
    // const getData = async () => {
    //   const results = await axios.get(apiLink);

    //   if (results.data.status !== 'success') {
    //     throw new Error(`伺服器回應：${response.data.message}`);
    //   }
    //   setDataArr(results.data.result);
    // }
    // getData();
    // setQtyArr(dataArr.flatMap(d => d.qty));
    setDataArr(testData);
    setQtyArr(testData.flatMap(d => d.qty));
  }, []);
  useEffect(() => {
    const totList = qtyArr.map((q, i) => q * dataArr[i].price);
    setTotArr(totList);
  }, [qtyArr])


  const noData = (!dataArr || dataArr.length === 0);

  return (
    <>
      <Head>
        <title>購物車 | Fundodo</title>
      </Head>
      <BuyProgress stage={1} />
      <section className="container mt-5">
        <h4 className='tx-shade4'>共 {dataArr.length} 件商品</h4>
        <table className={s.cartTable}>
          <thead>
            <tr>
              <th><TbTrashX /></th>
              <th style={{ width: '200px' }}></th>
              <th>商品資訊</th>
              <th>規格</th>
              <th style={{ width: '9rem' }}>單價</th>
              <th>數量</th>
              <th style={{ width: '9rem' }}>小計</th>
            </tr>
          </thead>
          <tbody className='tx-body'>
            {noData ? <></> :
              dataArr.map((item, i_data) => (
                <tr key={item.key}>
                  <td>
                    <FddBtn color='tint4' size='sm' icon callback={() => { }}>
                      <RxCross2 />
                    </FddBtn>
                  </td>
                  <td>
                    <Image
                      src={'/pic-prod/' + item.pic_path}
                      width={192}
                      height={192}
                      alt={item.name}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>
                    {item.sort_name ? <p>{item.sort_name}</p> : <></>}
                    {item.spec_name ? <p>{item.spec_name}</p> : <></>}
                  </td>
                  <td>
                    <div className="mx-auto pe-1 tx-right w-fit">
                      ${item.price}
                    </div>
                  </td>
                  <td><NumberPanel quantity={qtyArr[i_data]} setFunc={setQtyArr} index={i_data} /></td>
                  <td>${totArr[i_data]}</td>
                </tr>
              ))
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
