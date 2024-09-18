import React from 'react'
import BackendLayout from '@/components/layout/backend'
import useAuthRedirect2 from '@/hooks/useAuthRedirect2';


export default function index() {
  useAuthRedirect2();
  return (
    <BackendLayout></BackendLayout>
  )
}
