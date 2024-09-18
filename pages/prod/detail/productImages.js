import React from 'react'
import scss from './productImages.module.scss'
import Image from 'next/image'
export default function ProductImages({ picNameArr }) {


	return (
		<>
			<div className='mb-3'>
				{picNameArr.length > 0 && (
					<div className={[scss.prodImgBox, 'img-wrap-w100'].join(' ')}>
						<Image objectFit='cover' src={`/pic-prod/${picNameArr[0]}`} alt="Product Image" width={0} height={0} />
					</div>
				)}
				<div className={`mt-3 ${scss.rwd} d-none d-lg-flex row`}>
					{picNameArr.slice(1).map((picName, index) => (
						<div key={index} className={['m-0', 'px-2', 'col-3', scss.border].join(' ')}>
							<Image objectFit='cover' src={`/pic-prod/${picName}`} alt={`Thumbnail ${index + 1}`} width={0} height={0} />
						</div>
					))}
				</div>

			</div>
		</>
	)
}
