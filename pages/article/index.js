import React from 'react'
import Head from 'next/head'
import NavHeader from '@/components/common/navHeader'
import Footer from '@/components/common/footer'
import style from '@/styles/style.module.scss'
import scss from '@/pages/article/index.module.scss'
import UserAction from './userAction'



export default function ArticleList() {
    return (
        <>
            <main className={style.container}>
                <UserAction />
                <aside className={[scss.leftSide].join()}>
                    <div>
                        <div className={[scss.leftTitle].join()}>最新文章</div>
                        <div className={[scss.leftArticle].join()}>
                            <img className={[scss.leftImg].join()} src='./logo.png' alt="" />
                            <div className={[scss.leftArticleTitle].join()}>
                                <p>123123123</p>
                                <p>2024-07-22</p>
                            </div>
                        </div>
                        <div className={[scss.leftArticle].join()}>
                            <img className={[scss.leftImg].join()} src='./logo.png' alt="" />
                            <div className={[scss.leftArticleTitle].join()}>
                                <p>123123123</p>
                                <p>2024-07-22</p>
                            </div>
                        </div>
                        <div className={[scss.leftArticle].join()}>
                            <img className={[scss.leftImg].join()} src='./logo.png' alt="" />
                            <div className={[scss.leftArticleTitle].join()}>
                                <p>123123123</p>
                                <p>2024-07-22</p>
                            </div>
                        </div>
                        <div className={[scss.leftArticle].join()}>
                            <img className={[scss.leftImg].join()} src='./logo.png' alt="" />
                            <div className={[scss.leftArticleTitle].join()}>
                                <p>123123123</p>
                                <p>2024-07-22</p>
                            </div>
                        </div>
                        <div className={[scss.leftArticle].join()}>
                            <img className={[scss.leftImg].join()} src='./logo.png' alt="" />
                            <div className={[scss.leftArticleTitle].join()}>
                                <p>123123123</p>
                                <p>2024-07-22</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={[scss.leftTitle].join()}>熱門文章</div>
                        <div className={[scss.leftArticle].join()}>
                            <img className={[scss.leftImg].join()} src='./logo.png' alt="" />
                            <div className={[scss.leftArticleTitle].join()}>
                                <p>123123123</p>
                                <p>2024-07-22</p>
                            </div>
                        </div>
                        <div className={[scss.leftArticle].join()}>
                            <img className={[scss.leftImg].join()} src='./logo.png' alt="" />
                            <div className={[scss.leftArticleTitle].join()}>
                                <p>123123123</p>
                                <p>2024-07-22</p>
                            </div>
                        </div>
                        <div className={[scss.leftArticle].join()}>
                            <img className={[scss.leftImg].join()} src='./logo.png' alt="" />
                            <div className={[scss.leftArticleTitle].join()}>
                                <p>123123123</p>
                                <p>2024-07-22</p>
                            </div>
                        </div>
                        <div className={[scss.leftArticle].join()}>
                            <img className={[scss.leftImg].join()} src='./logo.png' alt="" />
                            <div className={[scss.leftArticleTitle].join()}>
                                <p>123123123</p>
                                <p>2024-07-22</p>
                            </div>
                        </div>
                        <div className={[scss.leftArticle].join()}>
                            <img className={[scss.leftImg].join()} src='./logo.png' alt="" />
                            <div className={[scss.leftArticleTitle].join()}>
                                <p>123123123</p>
                                <p>2024-07-22</p>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>



        </>
    )
}
