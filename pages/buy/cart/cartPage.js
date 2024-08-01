import BuyProgress from '@/components/buy/buyProgress';
import BuyLayout from '@/components/layout/buy';
import Head from 'next/head';
import React from 'react';
// import PropTypes from 'prop-types';
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

const CartPage = () => {
  return (
    <>
      <Head>
        <title>購物車 | Fundodo</title>
      </Head>
      <BuyProgress stage={1} />
      <section className="container">
        <h4>共 3 件商品</h4>
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
            {tempData.map((prod, i) => {
              let specIndicator =
                (prod.sort === '' ? 0 : 10) + (prod.spec === '' ? 0 : 1);
              let specStr = '';
              if (specIndicator > 10)
                specStr = [prod.sort, prod.spec].join('、');
              else if (specIndicator > 0)
                specStr = specIndicator === 10 ? prod.sort : prod.spec;

              {
                /* const imgPath = resolve('/', 'pic-prod', prod.pic_path); */
              }
              const imgPath = '/pic-prod/' + prod.pic_path;
              return (
                <tr key={prod + i}>
                  <td>
                    <FddBtn color='tint4' size='sm' icon callback={() => { }}><RxCross2 /></FddBtn>
                  </td>
                  <td>
                    <div className="mx-auto">
                      <Image
                        src={imgPath}
                        width={100}
                        height={100}
                        alt={prod.name}
                      />
                    </div>
                  </td>
                  <td>{prod.name}</td>
                  <td>{specStr}</td>
                  <td style={{minWidth: '4rem'}}>{prod.price}</td>
                  <td>數量面板</td>
                  <td>小計</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
};

// CartPage.prototype = {
//   data: PropTypes.arrayOf({
//     name: PropTypes.string,
//     pic_path: PropTypes.string,
//     sort: PropTypes.string,
//     spec: PropTypes.string,
//     price: PropTypes.number,
//     number: PropTypes.number,
//   }),
// };

CartPage.layout = BuyLayout;

export default CartPage;
