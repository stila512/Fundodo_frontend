import { useState, useEffect } from 'react'
import scss from './productGrid.module.scss'
import Image from 'next/image'
import heart from '/public/prodPic/iconamoon_heart.png'
import FddBtn from '@/components/buttons/fddBtn'

export default function ProductGrid() {
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        try {
            const URL = "http://localhost:3001/api/prod"
            const res = await fetch(URL)
            const data = await res.json()

            console.log(data);

            if (Array.isArray(data.allProducts)) {
                setProducts(data.allProducts)
            } else {
                console.log("API回應的allProducts不是陣列");
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    const getMaxMinPrice = (priceArr) => {
        const prices = priceArr.map(price => parseFloat(price)).filter(price => price > 0); // Filter out prices <= 0
        if (prices.length === 0) return { maxPrice: 0, minPrice: 0 };
        const maxPrice = Math.max(...prices);
        const minPrice = Math.min(...prices);
        return { maxPrice, minPrice };
    }
    const formatPrice = (price) => {
        return Math.floor(price); // Format to 2 decimal places
    }
    return (
        <>
            <div className={[scss.productGrid, 'row', 'g-3',].join(' ')}>
                {products.map((v, i) => {
                    const { maxPrice, minPrice } = getMaxMinPrice(v.priceArr)
                    const isSinglePrice = v.priceArr.length === 1;
                    return (
                        <div key={i} className='col-3'>
                            <div className={scss.card}>
                                <div className={scss.heartIconBox}>
                                    <div className={scss.heartIcon}>
                                        <Image src={heart} />
                                    </div>
                                </div>
                                <div className={scss.prodImgBox}>
                                    <div className={scss.prodImg}>
                                        <Image src={`/pic-prod/${v.picNameArr[0]}`} width={130} height={130} />
                                    </div>
                                </div>
                                <div className={scss.textarea}>
                                    <span className={scss.prodName}>{v.name}</span>
                                </div>
                                <div className={scss.textarea}>
                                    <span className={scss.prodPrice}>
                                        {isSinglePrice
                                            ? `NT$ ${formatPrice(parseFloat(v.priceArr[0]))}`
                                            : (minPrice > 0
                                                ? `NT$ ${formatPrice(minPrice)} - NT$ ${formatPrice(maxPrice)}`
                                                : `NT$ ${formatPrice(maxPrice)}`)
                                        }
                                    </span>
                                </div>
                                <div className={scss.btn}><span>我要購買</span></div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
