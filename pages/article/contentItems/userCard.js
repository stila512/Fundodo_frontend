import React,{useEffect,useState} from 'react';
import scss from '@/pages/article/contentItems/userCard.module.scss';
import Image from 'next/image';

export default function PageControl({aid}) {
  const [content, setContent] = useState({})
  useEffect(() => {
    if (aid) {
      fetch(`http://localhost:3005/api/article/articleContent/${aid}`)
        .then(response => response.json())
        .then(data => {
          if (data.status === 'success') {
            setContent(data.content[0])
          }
        }).catch(error => console.log(error.message))
    }
  }, [aid])
  return (
    <>
      {' '}
      <div className={[scss.pageCtrl].join()}>
        <div className={scss.ctrler}>
          <Image
            className={scss.userImg}
            src="/logo.png"
            alt=""
            width={200}
            height={200}
            objectFit='cover'
          />
        </div>
        <div>
          <span className={[scss.ctrlText].join()}>{content.author_nickname}</span>
        </div>
        <hr style={{width:'100%'}} />
        <div>
          <span className={[scss.identityText].join()}>一般會員</span>
        </div>
      </div>
    </>
  );
}
