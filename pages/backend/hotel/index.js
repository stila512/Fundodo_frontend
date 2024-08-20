import React from 'react'
import Head from 'next/head'
import BackendLayout from '@/components/layout/backend'
import scss from './index.module.scss';

export default function index() {
  return (
  <>
     <BackendLayout>
     <Head>
        <title>Fundodo後台 - 旅館管理</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className={scss.coursePage}>
          <h1>寵物旅館列表</h1>
      </div>


     </BackendLayout>
  </>
  )
}
