import BuyProgress from '@/components/buy/buyProgress';
import BuyLayout from '@/components/layout/buy';
import Head from 'next/head';
import ProdCartTable from './ProdCartTable';
import HotelCartTable from './HotelCartTable';

export default function CartPage() {
  return (
    <>
      <Head>
        <title>購物車 | Fundodo</title>
      </Head>
      <BuyProgress stage={1} />
      <section className="container mt-5">
        <ProdCartTable />
        {/* <hr className='my-5' style={{borderColor: "transparent transparent black transparent"}} /> */}
        <HotelCartTable />
      </section>
    </>
  );
};

CartPage.layout = BuyLayout;
