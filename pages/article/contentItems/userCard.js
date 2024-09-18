import React, { useEffect, useState } from 'react';
import scss from '@/pages/article/contentItems/userCard.module.scss';
import Image from 'next/image';

export default function PageControl({ aid }) {
  const [content, setContent] = useState({})
  const [avatar, setAvatar] = useState('/userHead.png')
  useEffect(() => {
    if (aid) {
      fetch(`http://localhost:3005/api/article/articleContent/${aid}`)
        .then(response => response.json())
        .then(data => {
          if (data.status === 'success') {
            setContent(data.content[0])

            if (data.content[0].avatar_file) {
              setAvatar(`http://localhost:3005/upload/${data.content[0].avatar_file}`);
            }
          }
        }).catch(error => console.log(error.message))
    }
  }, [aid])
  return (
    <>
      {' '}
      <div className={[scss.pageCtrl].join()}>
        <div className={scss.ctrler}>
          <div className={scss.imageContainer}>
            <Image
              className={scss.userImg}
              src={avatar}
              alt=""
              fill
              sizes="200px"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
        <div>
          <span className={[scss.ctrlText].join()}>{content.author_nickname}</span>
        </div>
        <hr style={{ width: '100%' }} />
        <div>
          <span className={[scss.identityText].join()}>一般會員</span>
        </div>
      </div>
    </>
  );
}
