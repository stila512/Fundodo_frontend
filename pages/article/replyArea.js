import React from 'react';
import scss from '@/pages/article/replyArea.module.scss';

export default function ReplyArea() {
  return (
    <>
      <div className={scss.replyArea}>
        <div className={scss.replyTitle}>
          <h3>新增評論</h3>
        </div>
        <div className={scss.reply}>
          <input placeholder="留下你的評論..." />
          <div className={scss.replyBtn}>
            <button className={scss.btnCancel}>取消</button>
            <button className={scss.btnSubmit}>送出</button>
          </div>
        </div>
      </div>
    </>
  );
}
