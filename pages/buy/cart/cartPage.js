import BuyProgress from '@/components/buy/buyProgress';
import DefaultLayout from '@/components/layout/default-layout';
import Head from 'next/head';
import React from 'react';

export default function CartPage() {
  return (
    <>
      <Head>
        <title>購物車 | Fundodo</title>
      </Head>
      <DefaultLayout>
        <BuyProgress></BuyProgress>
      </DefaultLayout>
      {/* //todo 製作簡化版本的 layout  */}
    </>
  );
}
