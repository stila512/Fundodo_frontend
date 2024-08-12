import scss from './detailGroup.module.scss'
import Image from 'next/image'
import prodImg from '/public/prodPic/Container.png';
import mini1 from '/public/prodPic/1.png';
import mini2 from '/public/prodPic/2.png';
import mini3 from '/public/prodPic/3.png';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function DetailGroup() {
	const router = useRouter()

	const [product, setProduct] = useState({
		id: 0,
		name: "",
		picNameArr: "",
		desc: "",
		priceArr: 0,
		others: {
			tagArr: "",
			ageArr: ""
		}
	})

	const getProduct = async (id) => {
		const URL = `http://localhost:3005/api/prod/detail/${id}`
		const res = await fetch(URL)
		const data = await res.json()
		console.log(data);
		setProduct(data.product)
	}

	useEffect(() => {
		if (router.isReady) {
			//這裡可以確保得到router.query
			console.log(router.query)

			// 向伺服器要求獲取資料
			getProduct(router.query.pid)
		}
		// 以下為省略eslint檢查一行
		// eslint-disable-next-line
	}, [router.isReady])
	return (
		<>
			<div className={[scss.detailGroup]}>
				<div className={[scss.imgGroup]}>
					<div>
						<Image src={prodImg} />
					</div>
					<div className={"d-flex gap-3 mt-3"}>
						<div>
							<Image src={mini1} />
						</div>
						<div>
							<Image src={mini2} />
						</div>
						<div>
							<Image src={mini3} />
						</div>
					</div>
				</div>
				<div className={[scss.aside]}>
					<div>
						<h3 className={scss.header}>{product.name}</h3>
					</div>
					<hr className='bg-primary' />
					<div className={scss.btnGroup}>
						<p>規格</p>
						<div className='d-flex gap-3'>
							<button className={scss.btnPrimary}>{product.sortArr}</button>
						</div>
					</div>
					<div className={scss.btnGroup}>
						{product.specArr && product.specArr.length > 0 && (
							<>
								<p>規格</p>
								<div className='d-flex gap-3'>
									{Array.isArray(product.specArr) && product.specArr.map((spec, i) => (
										<button key={i} className={scss.btnPrimary}>{spec}</button>
									))}
								</div>
							</>
						)}
					</div>
					<hr className={[scss.mt, 'bg-primary'].join(' ')} />
					<div className={scss.priceGroup}>
						<span className={scss.price}>NT$680</span>

					</div>
					<div className={['gap-3', 'd-flex', scss.mt].join(' ')}>
						<span className={scss.cs3}>數量</span>
						<button>-</button>
						<span>1</span>
						<button>+</button>
						<button>加入購物車</button>
					</div>
				</div>
			</div>
		</>
	)
}
