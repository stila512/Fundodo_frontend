import React from 'react';
import Head from 'next/head';
import BackendLayout from '@/components/layout/backend';
import { FaEdit, FaTrashAlt, FaFile } from 'react-icons/fa';
import scss from './detail.module.scss';

export default function CourseDetail() {
    return (
        <>
            <Head>
                <title>後台管理-課程詳情</title>
            </Head>
            <BackendLayout>
                <div className={scss.courseDetail}>
                    <h1 className={scss.title}>課程詳情</h1>
                    <div className={scss.actions}>
                        <button className={scss.editButton}><FaEdit /> 編輯課程</button>
                        <button className={scss.deleteButton}><FaTrashAlt /> 刪除課程</button>
                    </div>
                    <div className={scss.content}>
                        <div className={scss.mainInfo}>
                            <img src="/placeholder-image.jpg" alt="課程封面" className={scss.coverImage} />
                            <div className={scss.info}>
                                <h2>課程名稱</h2>
                                <p className={scss.summary}>課程簡介</p>
                                <div className={scss.tags}>
                                    <div className={scss.tag}><p>test</p></div>
                                    <div className={scss.tag}><p>test</p></div>
                                </div>
                            </div>
                        </div>

                        <div className={scss.section}>
                            <h3>課程價格</h3>
                            <p><strong>原價:</strong> $1000</p>
                            <p><strong>優惠價:</strong> $800</p>
                        </div>

                        <div className={scss.section}>
                            <h3>課程資訊</h3>
                            <p><strong>創建日期:</strong> 2024-08-22</p>
                        </div>

                        <div className={scss.section}>
                            <h3>課程描述</h3>
                            <p>課程描述</p>
                        </div>

                        <div className={scss.section}>
                            <h3>課程大綱</h3>
                            <div className={scss.chapter}>
                                <h4>章節 1: 章節名稱</h4>
                                <ul>
                                    <li>
                                        <span>1.1 課程單元名稱</span>
                                        <span>時長: 15分鐘</span>
                                        <span className={scss.filename}><FaFile /> lesson1_1.mp4</span>
                                    </li>
                                    <li>
                                        <span>1.2 課程單元名稱</span>
                                        <span>時長: 20分鐘</span>
                                        <span className={scss.filename}><FaFile /> lesson1_2.mp4</span>
                                    </li>
                                </ul>
                            </div>
                            <div className={scss.chapter}>
                                <h4>章節 2: 章節名稱</h4>
                                <ul>
                                    <li>
                                        <span>2.1 課程單元名稱</span>
                                        <span>時長: 18分鐘</span>
                                        <span className={scss.filename}><FaFile /> lesson2_1.mp4</span>
                                    </li>
                                    <li>
                                        <span>2.2 課程單元名稱</span>
                                        <span>時長: 22分鐘</span>
                                        <span className={scss.filename}><FaFile /> lesson2_2.mp4</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </BackendLayout>
        </>
    );
}