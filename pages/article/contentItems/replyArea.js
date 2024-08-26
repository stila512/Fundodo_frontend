import {useState,useEffect} from 'react';
import scss from '@/pages/article/contentItems/replyArea.module.scss';
import Editor from '../editor';
import axios from 'axios';
import { Router, useRouter } from 'next/router';


export default function ReplyArea({user}) {
  const [content, setContent] = useState('')
  const [articleId, setArticleId] = useState(null);
  const router = useRouter()

  useEffect(() => {
    // 從 URL 獲取 articleId
    const urlParams = new URLSearchParams(window.location.search);
    const aid = urlParams.get('aid');
    setArticleId(aid)
  }, []);

  

  const handleSubmit = async (e) => {
    console.log('Sending request with userId:', user.userId);
    e.preventDefault();
    if (!user || !user.userId) {
      alert('請先登入');
      return;
    }
    if (!content.trim()) {
      alert('請輸入回覆內容');
      return;
    }
    try {
      const response = await axios.post(`http://localhost:3005/api/article/createReply/${articleId}`, { 
        content, 
        userid: user.userId ,
        articleId: articleId
      });
      console.log('Reply created:', response.data);
      alert('回覆發表成功');
      setContent(''); // 清空輸入框
      router.push(`/article/content?aid=${articleId}`)
    } catch (error) {
      console.error('Error creating reply:', error);
      alert('回覆發表失敗');
    }

  }

  return (
    <>
      <form className={scss.replyArea} onSubmit={handleSubmit}>
        <div className={scss.replyTitle}>
          <h3>新增評論</h3>
        </div>
        <div className={scss.reply}>
          <Editor content={content} setContent={setContent} editorHei='100px'/>
          <div className={scss.replyBtn}>
            <button className={scss.btnSubmit} type='submit'>送出</button>
          </div>
        </div>
      </form>
    </>
  );
}
