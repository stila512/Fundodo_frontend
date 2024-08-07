import FddBtn from '@/components/buttons/fddBtn'
import React from 'react'
import scss from './tags.module.scss';


export default function Tags() {
  return (
    <>
    <div className='container'>
    <div className={scss.tags}>
    <FddBtn href='/'>全部分類</FddBtn>
    <FddBtn color='shade3' outline href='/'>外出禮儀</FddBtn>
    <FddBtn color='shade3' outline href='/'>感情增溫</FddBtn>
    <FddBtn color='shade3' outline  href='/'>正向教養體驗式課程</FddBtn>
    <FddBtn color='shade3' outline href='/'>線上行為知識講座</FddBtn>
    </div>
    </div>
    
   
    </>
  )
}
