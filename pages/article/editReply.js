import { useState, useEffect } from 'react';
import scss from '@/pages/article/editReply.module.scss'
import axios from 'axios';
import Editor from './editor';
import Head from 'next/head';
import DefaultLayout from '@/components/layout/default';
import { useRouter } from 'next/router';


export default function EditReply() {
  const [content, setContent] = useState('')
  const [isEditorReady, setIsEditorReady] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { rid } = router.query // 使用 rid 代替 aid

  useEffect(() => {
    if (rid) {
      setIsLoading(true);
      fetch(`http://localhost:3005/api/article/replyContent/${rid}`)
        .then(response => response.json())
        .then(data => {
          if (data.status === 'success') {
            setContent(data.content.content)
          }
        })
        .catch(error => console.error('Error fetching reply:', error))
        .finally(() => setIsLoading(false));
    }
  }, [rid])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.put(`http://localhost:3005/api/article/editReply/${rid}`, {
        content
      });

      console.log('Reply updated:', response.data)
      alert('回覆更新成功')
      router.push(`/article/content?aid=${response.data.articleId}`)
    } catch (error) {
      console.error('Error updating reply:', error)
      alert('更新回覆時發生錯誤，請稍後再試。')
    } finally {
      setIsLoading(false);
    }
  }

  const handleDelete = async () => {
    if (window.confirm('確定要刪除這個回覆嗎？')) {
      setIsLoading(true);
      try {
        const response = await axios.delete(`http://localhost:3005/api/article/deleteReply/${rid}`);
        console.log('Reply deleted:', response.data);
        alert('回覆已成功刪除')
        router.push(`/article/content?aid=${response.data.articleId}`)
      } catch (error) {
        console.error('Error deleting reply:', error);
        alert('刪除回覆時發生錯誤，請稍後再試。');
      } finally {
        setIsLoading(false);
      }
    }
  }

  if (isLoading) {
    return <div className={scss.loadingArea}>回覆更新中...</div>;
  }

  return (
    <>
      <Head>
        <title>編輯回覆</title>
        <meta name="description" content="Edit your reply" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={scss.mainbg}>
        <div className={`container ${scss.editForm}`}>
          <div className={scss.bread}>
            <h4>home/討論區/編輯回覆</h4>
          </div>
          <form onSubmit={handleSubmit} className={` ${scss.formArea}`}>
            <Editor
              content={content}
              setContent={setContent}
              editorHei="400px"
              onReady={() => setIsEditorReady(true)}
            />
            <div>
              <button
                className={scss.postBtn}
                type="submit"
                disabled={!isEditorReady || isLoading}
              >
                {isLoading ? '更新中...' : '更新回覆'}
              </button>
              <button
                className={`${scss.postBtn} ${scss.deleteBtn}`}
                type="button"
                onClick={handleDelete}
                disabled={isLoading}
              >
                {isLoading ? '處理中...' : '刪除回覆'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

EditReply.layout = DefaultLayout;