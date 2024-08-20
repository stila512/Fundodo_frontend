import {useState,useEffect} from 'react';
import scss from '@/pages/article/contentItems/replyArea.module.scss';
import Editor from '../editor';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom'

export default function ReplyArea() {
  const [content, setContent] = useState('')
  const [articleId, setArticleId] = useState(null);
  const userId = 0;

  useEffect(() => {
    // 從 URL 獲取 articleId
    const urlParams = new URLSearchParams(window.location.search);
    const aid = urlParams.get('aid');
    setArticleId(aid);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3001/api/createReply/${articleId}`, { 
        content, 
        userid: userId ,
        articleId: articleId
      });
      console.log('Reply created:', response.data);
      alert('回覆發表成功');
      setContent(''); // 清空輸入框
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
