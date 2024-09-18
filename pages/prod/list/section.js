import Image from 'next/image';
import scss from './section.module.scss';
import shiba from 'public/prodPic/shiba.png';

export default function Section() {
	return (
		<>
			<section className='w-100'>
				<div className={[scss.section, 'd-flex'].join(' ')}>
					<div className='img-wrap-h100'>
						<Image src={shiba} alt={shiba} width={0} height={0} />
					</div>
					<div className={scss.pet}>寵物商城</div>
				</div>
			</section>
		</>
	);
}
