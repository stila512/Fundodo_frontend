import {useState,useEffect} from 'react';
import scss from '@/pages/article/contentItems/replyArea.module.scss';
import Editor from '../editor';

export default function ReplyArea() {
  const [content, setContent] = useState('')
  return (
    <>
      <div className={scss.replyArea}>
        <div className={scss.replyTitle}>
          <h3>新增評論</h3>
        </div>
        <div className={scss.reply}>
          {/* <input placeholder="留下你的評論..." /> */}
          <Editor content={content} setContent={setContent}/>
          <div className={scss.replyBtn}>
            <button className={scss.btnSubmit}>送出</button>
          </div>
        </div>
      </div>
    </>
  );
}
