import scss from './aside.module.scss';
import Filter from './filter'
import React from 'react';
import PriceFilter from './priceFilter';

export default function Aside() {
	return (
		<>
			<aside className={['col-3', scss.rwd].join(' ')}>
				<h2 className={[scss.mb, scss.font].join(' ')}>篩選</h2>
				<div className={scss.filters}>
					<div className={scss.ractangle}>
						<div className={scss.margin}>
							<div className={scss.header}>
								<h2 className={scss.font}>飼料分類</h2>
							</div>
							<Filter categories={['一般乾糧', '無穀乾糧', '一般凍乾', '無穀凍乾', '功能配方', '處方飼料']} />
						</div>
					</div>
					<div className={scss.ractangle}>
						<div className={scss.margin}>
							<div className={scss.header}>
								<h2 className={scss.font}>適用年齡</h2>
							</div>
							<div className={['row', scss.gap].join(" ")}>
								<Filter categories={['全齡', '幼犬', '成犬', '高齡犬']} multiple={true} />
							</div>
						</div>
					</div>
					<div className={scss.ractangle}>
						<div className={scss.margin}>
							<div className={scss.header}>
								<h2 className={scss.font}>價錢篩選</h2>
							</div>
							<PriceFilter />
						</div>
					</div>
					<div className={scss.ractangle}>
						<div className={scss.margin}>
							<div className={scss.header}>
								<h2 className={scss.font}>品牌</h2>
							</div>
							<Filter categories={['ZiwiPeak 巔峰', '汪喵星球', '法國皇家', '飼糧倉', '朝貢 조공', '小犬威利']} multiple={true} />
						</div>
					</div>
				</div>
			</aside>
		</>
	)
}
