import Image from 'next/image';
import scss from './section.module.scss';
import shiba from 'public/prodPic/shiba.png';

export default function Section() {
	return (
		<>
			<section className={[scss.mt, 'w-100'].join(' ')}>
				<div className={[scss.section, 'd-flex'].join(' ')}>
					<div className='img-wrap-h100'>
						<Image src={shiba} alt={shiba} width={0} height={0}/>
					</div>
					<h1 className={[scss.pt3, scss.dogFood].join(' ')}>寵物商城</h1>
				</div>
			</section>
		</>
	);
}
