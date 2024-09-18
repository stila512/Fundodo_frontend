import Image from 'next/image'
import React from 'react'

export default function Loading() {
  return (
    <div
      className='min-vh-100 gr-center pos-a t-0 l-0 r-0'
      style={{
        backgroundColor: "#F4D284",
        zIndex: 999
      }}
    >
      <Image src='/loading.gif' width={150} height={150} alt='loading fundodo logo' />
    </div>
  )
}
