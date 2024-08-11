import { useState, useEffect } from 'react'
import scss from './productGrid.module.scss'
import Image from 'next/image'
import FavoriteIcon from './favoriteIcon'
import Link from 'next/link'

export default function ProductGrid() {
	const [products, setProducts] = useState([])
	const [page, setPage] = useState(1)
	const perPage = 12
	const thisPage = page * perPage
	const fitstProduct = thisPage - perPage
	const currentProduct = products.slice(fitstProduct, thisPage)

	const changePage = (pageNum) => setPage(pageNum)

	const getMaxMinPrice = (priceArr) => {
		const prices = priceArr.map(price => parseFloat(price)).filter(price => price > 0);
		if (prices.length === 0) return { maxPrice: 0, minPrice: 0 };
		const maxPrice = Math.max(...prices);
		const minPrice = Math.min(...prices);
		return { maxPrice, minPrice };
	}
	const formatPrice = (price) => {
		return new Intl.NumberFormat('en-US').format(Math.floor(price));
	}
	const getProducts = async () => {
		try {
			const URL = "http://localhost:3005/api/prod"
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

	return (
		<>
			<div className={['row', 'col-lg-9', 'g-3'].join(' ')}>
				{currentProduct.map((v, i) => {
					const { maxPrice, minPrice } = getMaxMinPrice(v.priceArr);
					const isSinglePrice = v.priceArr.length === 1 && v.priceArr[0] > 0;
					return (
						<div key={i} className='col-xxl-3 col-xl-4 col-6'>
							<div className={scss.card}>
								<FavoriteIcon />
								<div className={scss.prodImgBox}>
									<div className={[scss.prodImg, 'img-wrap-w100', 'img-wrap-h100'].join(' ')}>
										<Image src={`/pic-prod/${v.picNameArr[0]}`} width={0} height={0} layout="responsive" />
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
								<Link className={scss.btn} type='button' href={`/prod/detail/${v.id}`}><span>我要購買</span></Link>
							</div>
						</div>
					)
				})}
				<div className='text-center'>
					<button
						onClick={() => changePage(page - 1)}
						disabled={page === 1}
					>
						上一頁
					</button>
					<span>{page}</span>
					<button
						onClick={() => changePage(page + 1)}
						disabled={thisPage >= products.length}
					>
						下一頁
					</button>
				</div>
			</div>
		</>
	)
}
