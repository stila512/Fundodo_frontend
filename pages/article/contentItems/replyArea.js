import { useState, useEffect } from 'react';
import scss from '@/pages/article/contentItems/replyArea.module.scss';
import Editor from '../editor';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function ReplyArea({ user, onReplyAdded }) {
  const [content, setContent] = useState('');
  const [articleId, setArticleId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const aid = urlParams.get('aid');
    setArticleId(aid);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('請先登入');
      return;
    }
    if (!content.trim()) {
      alert('請輸入回覆內容');
      return;
    }
    try {
      console.log('Sending request with userId:', user.userId);
      const response = await axios.post(`http://localhost:3005/api/article/createReply/${articleId}`, { 
        content, 
        userid: user.userId,
        articleId: articleId
      });
      console.log('Reply created:', response.data);
      alert('回覆發表成功');
      setContent('')
      if (onReplyAdded) {
        onReplyAdded(response.data.reply);
      }
      router.push(`/article/content?aid=${articleId}`);
    } catch (error) {
      console.error('Error creating reply:', error);
      alert('回覆發表失敗');
    }
  };

  return (
    <>
      <form className={scss.replyArea} onSubmit={handleSubmit}>
        <div className={scss.replyTitle}>
          <h3>新增回覆</h3>
        </div>
        <div className={scss.reply}>
          <Editor content={content} setContent={setContent} editorHei='100px'/>
          <div className={scss.replyBtn}>
            <button className={scss.btnSubmit} type='submit' disabled={!user}>
              {user ? '送出' : '請先登入'}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}