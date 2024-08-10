import React, { useEffect } from 'react'
import { useRouter } from 'next/router'


export default function CourseDetail() {

    const router = useRouter()
    useEffect(() => {
        if (router.isReady) {

        }
    }, [router.isReady])

    return (
        <div>Detail</div>
    )
}




