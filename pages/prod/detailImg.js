import React from 'react'
import Image from 'next/image'
import prodImg from '/public/prodPic/Container.png';
import mini1 from '/public/prodPic/1.png';
import mini2 from '/public/prodPic/2.png';
import mini3 from '/public/prodPic/3.png';

export default function DetailImg() {
  return (
    <>
        <div>
            <Image src={prodImg} />
        </div>
        <div className='dFlex'>
            <div>
                <Image src={mini1}/>
            </div>
            <div>
                <Image src={mini2}/>
            </div>
            <div>
                <Image src={mini3}/>
            </div>
        </div>
    </>
  )
}
