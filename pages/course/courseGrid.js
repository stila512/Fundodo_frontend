import React from 'react'
import scss from "./courseGrid.module.scss"
import { AiOutlineUser } from "react-icons/ai";
import Image from 'next/image';
import dog from "@/public/homepagePic/courseimg.png"
import Link from 'next/link';

export default function CourseGrid() {
    return (
        <>
            <div className={scss.cards}>
                <div className="row">
                    <div className="col-6 col-lg-4">
                        <div className={scss.card}>
                            <Link href="/course/detail">
                                <Image src={dog}/>
                                <div className={scss.cardText}>
                                    <h3>【狗狗教養實作】線上體驗課</h3>
                                    <div className='d-flex gap-1 ai-center'>
                                        <AiOutlineUser /> <p>125人來學習</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-6 col-lg-4">
                        <div className={scss.card}>
                            <Link href="/course/detail">
                                <Image src={dog} />
                                <div className={scss.cardText}>
                                    <h3>【狗狗教養實作】線上體驗課</h3>
                                    <div className='d-flex gap-1 ai-center'>
                                        <AiOutlineUser /> <p>125人來學習</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-6 col-lg-4">
                        <div className={scss.card}>
                            <Link href="/course/detail">
                                <Image src={dog} />
                                <div className={scss.cardText}>
                                    <h3>【狗狗教養實作】線上體驗課</h3>
                                    <div className='d-flex gap-1 ai-center'>
                                        <AiOutlineUser /> <p>125人來學習</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="col-6 col-lg-4">
                        <div className={scss.card}>
                            <Link href="/course/detail">
                                <Image src={dog} />
                                <div className={scss.cardText}>
                                    <h3>【狗狗教養實作】線上體驗課</h3>
                                    <div className='d-flex gap-1 ai-center'>
                                        <AiOutlineUser /> <p>125人來學習</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
