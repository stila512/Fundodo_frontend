import React from 'react'
import BuyLayout from '@/components/layout/buy';
import BuyProgress from '@/components/buy/buyProgress';

export default function ConfirmPage() {
  return (
    <>
      <Head>
        <title>確認付款 | Fundodo</title>
      </Head>
      <BuyProgress stage={2} />
      <div>ConfirmPage</div>
    </>
  )
}
ConfirmPage.layout = BuyLayout;
