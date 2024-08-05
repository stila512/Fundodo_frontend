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

//TODO: Remove
const tempData = [
  {
    name: 'Plus+機能保健系列 泌尿道紓壓保健',
    pic_path: 'PR0000001611.jpg',
    sort: '',
    spec: '1.5g x 30入',
    price: 450,
    number: 1,
  },
  {
    name: '花花拾便器套裝',
    pic_path: 'PR0000002581.jpg',
    sort: '補充替換袋',
    spec: '單入 (拾便器+拾便袋1捲)',
    price: 150,
    number: 2,
  },
  {
    name: 'LINSLINS寵物漏食玩具 - 魔法小兔帽',
    pic_path: 'PR0000003971.jpg',
    sort: '魔法小兔帽',
    spec: '',
    price: 250,
    number: 1,
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

export default function CartPage() {
  const [dataArr, setDataArr] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const results = await axios.get(apiLink);

      if (results.data.status !== 'success') {
        throw new Error(`伺服器回應：${response.data.message}`);
      }
      setDataArr(results.data.result);
    }
    getData();
  }, []);

  const noData = (!dataArr || dataArr.length === 0);

  return (
    <>
      <Head>
        <title>購物車 | Fundodo</title>
      </Head>
      <BuyProgress stage={1} />
      <section className="container">
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
              dataArr.map((item) => {
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
                    <td style={{ minWidth: '4rem' }}>{item.price}</td>
                    <td>數量面板</td>
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
