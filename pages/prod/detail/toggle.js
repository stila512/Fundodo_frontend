// import React from 'react'
// import scss from './toggle.module.scss'
// import { useRouter } from 'next/router';
// import { useState, useEffect } from 'react';

// export default function Toggle() {
// 	const router = useRouter()
//   const [product, setProduct] = useState({
// 		id: 0,
// 		name: "",
// 		picNameArr: [],
// 		desc: "",
// 		priceArr: [],
// 		others: {
// 			tagArr: "",
// 			ageArr: ""
// 		}
// 	})
//   const getProduct = async (id) => {
// 		const URL = `http://localhost:3005/api/prod/detail/${id}`
// 		const res = await fetch(URL)
// 		const data = await res.json()
// 		const prices = data.product.priceArr;
// 		const priceMap = [];
// 		data.product.sortArr.forEach((sort, sortIndex) => {
// 			data.product.specArr.forEach((spec, specIndex) => {
// 				const priceIndex = sortIndex * data.product.specArr.length + specIndex;
// 				priceMap.push({
// 					sort,
// 					spec,
// 					value: prices[priceIndex] || 0,
// 				});
// 			});
// 		});
// 		setProduct({ ...data.product, priceMap })
// 	}
//   useEffect(() => {
// 		if (router.isReady) {
// 			//這裡可以確保得到router.query
// 			console.log(router.query)

// 			// 向伺服器要求獲取資料
// 			getProduct(router.query.pid)
// 		}
// 	}, [router.isReady])
  
//   return (
//     <>
//       <div className={[scss.toggleGrid].join(' ')}>
//         <label className={[scss.toggle, scss.selected].join(' ')}>
//           <input type="checkbox" className={scss.hiddenBtn} />
//           <span></span>
//           商品描述
//         </label>
//         <label className={scss.toggle}>
//           <input type="checkbox" className={scss.hiddenBtn} />
//           <span></span>
//           評價
//         </label>
//         <label className={scss.toggle}>
//           <input type="checkbox" className={scss.hiddenBtn} />
//           <span></span>
//           商品規格
//         </label>
//       </div>
//       {/* <div className={[scss.toggleText, 'row'].join(' ')}>
//         <div className='col-7'>
//           {product.desc}
//         </div>
//       </div> */}
//       <table style={{ borderCollapse: 'collapse', width: '100%' }}>
//         <tbody>
//           <tr>
//             <td style={{ backgroundColor: '#f2f2f2', padding: '8px', border: '1px solid #ddd' }}>品牌名稱</td>
//             <td style={{ padding: '8px', border: '1px solid #ddd' }}>{product.brand_id}</td>
//           </tr>
//           <tr>
//             <td style={{ backgroundColor: '#f2f2f2', padding: '8px', border: '1px solid #ddd' }}>對象與族群</td>
//             <td style={{ padding: '8px', border: '1px solid #ddd' }}> {product.others.ageArr && product.others.ageArr.length > 0 ? product.others.ageArr.join(", ") : ''}</td>
//           </tr>
//           <tr>
//             <td style={{ backgroundColor: '#f2f2f2', padding: '8px', border: '1px solid #ddd' }}>重量</td>
//             <td style={{ padding: '8px', border: '1px solid #ddd' }}>5-7歲以下　3.1kg~5kg</td>
//           </tr>
//           <tr>
//             <td style={{ backgroundColor: '#f2f2f2', padding: '8px', border: '1px solid #ddd' }}>保存方式</td>
//             <td style={{ padding: '8px', border: '1px solid #ddd' }}>常溫</td>
//           </tr>
//           <tr>
//             <td style={{ backgroundColor: '#f2f2f2', padding: '8px', border: '1px solid #ddd' }}>軟硬度</td>
//             <td style={{ padding: '8px', border: '1px solid #ddd' }}>稍硬</td>
//           </tr>
//           <tr>
//             <td style={{ backgroundColor: '#f2f2f2', padding: '8px', border: '1px solid #ddd' }}>形狀</td>
//             <td style={{ padding: '8px', border: '1px solid #ddd' }}>小顆粒　特殊造型</td>
//           </tr>
//           <tr>
//             <td style={{ backgroundColor: '#f2f2f2', padding: '8px', border: '1px solid #ddd' }}>功效</td>
//             <td style={{ padding: '8px', border: '1px solid #ddd' }}>胃腸保養　骨骼保養　護膚毛髮保健　淚痕</td>
//           </tr>
//           <tr>
//             <td style={{ backgroundColor: '#f2f2f2', padding: '8px', border: '1px solid #ddd' }}>成份</td>
//             <td style={{ padding: '8px', border: '1px solid #ddd' }}>羊肉　魚肉　有穀　其他　其他</td>
//           </tr>
//           <tr>
//             <td style={{ backgroundColor: '#f2f2f2', padding: '8px', border: '1px solid #ddd' }}>商品規格</td>
//             <td style={{ padding: '8px', border: '1px solid #ddd' }}>
//               本產品包含：<br />
//               ☆ Real Power 瑞威天然狗糧:大骨 4kg裝 乙包, 夾鏈袋合宜諮袋裝.<br /><br />

//               產品保存期限：<br />
//               ☆ 製造地: 台灣<br />
//               ☆ 保存期限18個月，本產品使用天然植物性抗氧化劑，每次使用後請關緊夾鏈，並於45天內使用完畢.<br /><br />

//               ☆ 特選食材：<br />
//               60%原料 來自 台灣 新鮮無污染、低食安風險食材：<br />
//               知名企業台產當季新米、新鮮現採富口'倉藏急速冷凍乾燥蔬果、CAS多重檢驗上市企業水解雞肉蛋白等<br />
//               40%原料 來自 歐美先進國家 專精食材：<br />
//               澳洲草飼羊肉、日本沿海干貝、北歐深海鱈魚、加拿大亞麻籽、瑞士百年企業DSM公司複合維生素、<br />
//               日本美國知名品牌益生菌、歐洲美國雙重水解魚肉消化酵素、美國出界大廠有機 整合礦物質、<br />
//               德國酵母細胞壁(MOS)、美國奈米級專業吸附劑、水解酵母脂等<br /><br />

//               ※ 為顧及生物安全、疾病傳染等問題，恕無法接受已開封之產品退貨。
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </>
//   )
// }
