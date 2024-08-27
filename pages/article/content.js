import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head';
import scss from '@/pages/article/content.module.scss';
import DefaultLayout from '@/components/layout/default';
import TitleAction from './commonItem/titleAction';
import ArticleContent from './contentItems/articleContent';
import ArtiAside from './commonItem/aside';
import ReplyArea from './contentItems/replyArea';
import ReplyBlock from './contentItems/replyBlock';
import UserCard from './contentItems/userCard'
import AsideRwd from './commonItem/asideRwd';
import UserAction from './commonItem/userAction';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import jwt_decode from 'jwt-decode';

export default function Content() {
    const [replies, setReplies] = useState([])
    const [decodedUser, setDecodedUser] = useState(null)
    const router = useRouter()
    const { aid } = router.query
    const{user,loading}=useContext(AuthContext)

    useEffect(() => {
        if (!user && !loading) {
            // 如果 AuthContext 中沒有用戶信息，嘗試使用 token-decoder
            const decoded = tokenDecoder();
            if (decoded && decoded.userId) {
                setDecodedUser({
                    userId: decoded.userId,
                    nickname: decoded.nickname || decoded.email, // 假設 nickname 可能不存在，使用 email 作為備選
                });
                console.log('User info set from token-decoder:', decoded);
            } else {
                console.log('No valid user info found');
            }
        }
    }, [user, loading]);

    useEffect(() => {
        if (aid) {
            fetch(`http://localhost:3005/api/article/replys/${aid}`)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        setReplies(data.replies);
                    }
                }).catch(error => console.log(error.message))
        }
    }, [aid])

    const currentUser = user || decodedUser;
    return (
        <>
            <Head>
                <title>文章內容</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={scss.mainbg}>
                <main className="container" style={{ paddingTop: '40px' }}>
                    <div className={scss.userActionRwd}>
                        <UserAction />
                    </div>
                    <TitleAction />

                    <div className={[scss.mainArea].join()}>
                        <div className={scss.rwdAside}>
                            <ArtiAside />
                        </div>

                        <div className={scss.contentArea}>
                            <ArticleContent />
                            <ReplyArea user={currentUser}/>
                            {replies.map(reply => (
                                <ReplyBlock key={reply.id} reply={reply} />
                            ))}

                            <AsideRwd />
                        </div>
                        <UserCard />
                    </div>
                </main>
            </div>
        </>
    )
}

Content.layout = DefaultLayout;
