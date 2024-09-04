import React from 'react'
import FddBtn from '../buttons/fddBtn'
import Image from 'next/image';
import topIcon from '@/public/top.svg';
import s from './go-top.module.scss';

export default function GoTop() {
  const toTop = () => {
    if (typeof window === 'undefined') return;

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <FddBtn color='white' icon outline
      className={['img-wrap-w100', s.topBtn].join(' ')}
      title="回到最上"
      callback={toTop}
    >
      <Image src={topIcon} width={0} height={0} alt='go to top button' />
    </FddBtn>
  )
}
