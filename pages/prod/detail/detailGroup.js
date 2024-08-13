import scss from './detailGroup.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { NumberPanel } from '@/components/buttons/NumberPanel';
import Toggle from './toggle';
import Recommend from './recommend';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
export default function DetailGroup() {
	const router = useRouter()

	const [selectedSort, setSelectedSort] = useState("");
	const [selectedSpec, setSelectedSpec] = useState("");
	const [selectedPrice, setSelectedPrice] = useState(null);
	const [product, setProduct] = useState({
		id: 0,
		name: "",
		picNameArr: [],
		desc: "",
		priceArr: [],
		others: {
			tagArr: "",
			ageArr: ""
		}
	})

	const getProduct = async (id) => {
		const URL = `http://localhost:3005/api/prod/detail/${id}`
		const res = await fetch(URL)
		const data = await res.json()
		const prices = data.product.priceArr;
		const priceMap = [];
		data.product.sortArr.forEach((sort, sortIndex) => {
			data.product.specArr.forEach((spec, specIndex) => {
				const priceIndex = sortIndex * data.product.specArr.length + specIndex;
				priceMap.push({
					sort,
					spec,
					value: prices[priceIndex] || 0,
				});
			});
		});
		setProduct({ ...data.product, priceMap })
	}

	const handleSortChange = (e) => {
		const sort = e.target.value;
		setSelectedSort(sort);
		updatePrice(sort, selectedSpec);
	};

	const handleSpecChange = (e) => {
		const spec = e.target.value;
		setSelectedSpec(spec);
		updatePrice(selectedSort, spec);
	};

	const updatePrice = (sort, spec) => {
		if (sort && spec) {
			const price = product.priceMap.find(priceItem =>
				priceItem.sort === sort && priceItem.spec === spec
			);
			setSelectedPrice(price ? price.value : '請選擇有效的類別和規格');
		}
	};

	useEffect(() => {
		if (router.isReady) {
			//這裡可以確保得到router.query
			console.log(router.query)

			// 向伺服器要求獲取資料
			getProduct(router.query.pid)
		}
	}, [router.isReady])
	return (
		<>
			<div className={[scss.detailGroup, 'row'].join(' ')}>
				<div className={['col-xl-5', 'col-12'].join(' ')}>
					{product.picNameArr.length > 0 && (
						<div className={[scss.prodImgBox, 'img-wrap-w100'].join(' ')}>
							<Image objectFit='cover' src={`/pic-prod/${product.picNameArr[0]}`} alt="Product Image" width={0} height={0} />
						</div>
					)}
					<div className={["d-flex", 'gap-3', "mt-3", scss.rwd].join(' ')}>
						{product.picNameArr.slice(1).map((picName, index) => (
							<div key={index} className={[scss.prodImgSmBox, 'img-wrap-w100'].join(' ')}>
								<Image objectFit='cover' src={`/pic-prod/${picName}`} alt={`Thumbnail ${index + 1}`} width={0} height={0} />
							</div>
						))}
					</div>
				</div>
				<div className='col-xl-5 col-12'>
					<div className={scss.headerGrid}>
						<h3 className={scss.header}>{product.name}</h3>
						<FaRegHeart size={27}/>
						{/* <FaHeart /> */}
					</div>
					<hr className='bg-primary' />
					<div className={scss.btnGroup}>
						{product.sortArr && product.sortArr.length > 0 && (
							<>
								<p className={['text-nowrap', scss.p].join(' ')}>類別</p>
								<div className='d-flex gap-3 flex-wrap'>
									{Array.isArray(product.sortArr) && product.sortArr.map((sort, i) => (
										<label
											key={i}
											className={`${scss.radio} ${selectedSort === sort ? scss.selected : ''}`}
										>
											<input
												type={"radio"}
												value={sort}
												checked={selectedSort === sort}
												onChange={handleSortChange}
												className={scss.hidden}// 應用隱藏的樣式，以隱藏標準的單選按鈕樣式。
											/>
											{sort}
										</label>
									))}
								</div>
							</>
						)}
					</div>
					<div className={scss.btnGroup}>
						{product.specArr && product.specArr.length > 0 && (
							<>
								<p className={['text-nowrap', scss.p].join(' ')}>規格</p>
								<div className='d-flex gap-3 flex-wrap'>
									{Array.isArray(product.specArr) && product.specArr.map((spec, i) => (
										<label
											key={i}
											className={`${scss.radio} ${selectedSpec === spec ? scss.selected : ''}`}
										>
											<input
												type={"radio"}
												value={spec}
												checked={selectedSpec === spec}
												onChange={handleSpecChange}
												className={scss.hidden}// 應用隱藏的樣式，以隱藏標準的單選按鈕樣式。
											/>
											{spec}
										</label>
									))}
								</div>
							</>
						)}
					</div>
					<hr className={[scss.mt, 'bg-primary'].join(' ')} />
					<div className={scss.priceGroup}>
						<span className={scss.price}>{selectedPrice !== null ? `NT$${selectedPrice}` : '請選擇規格和類別'}</span>
					</div>
					<div className={['gap-3', 'd-flex', scss.mt].join(' ')}>
						<span className={scss.cs3}>數量</span>
						<NumberPanel className={scss.NumberPanel} quantity={0} />
						<button className={scss.btnSubmit} type='submit'>加入購物車</button>
					</div>
				</div>
			</div>
			<Toggle />
			<Recommend />
		</>
	)
}
