import scss from '@/pages/article/contentItems/replyBlock.module.scss';
import Image from 'next/image';
import { BsThreeDotsVertical } from "react-icons/bs";

export default function ReplyBlock({user, reply }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    })
  }
  const canEdit = () => {
    if (!user) return false;
    return user.userId === reply.userid || (user.userLevel && user.userLevel > 2);
  }
  return (
    <>
      <div className={scss.replyBlock}>
        <div className={scss.contentCreater}>
          <div className={[scss.userData].join()}>
            <Image
              className={[scss.userIcon].join()}
              src="/userHead.png"
              alt=""
              width={40}
              height={40}
            />
            <div className={[scss.nicknameArea].join()}>
              <p className={[scss.nickName].join()}>{reply.author_nickname}</p>
              <p className={[scss.creatTime].join()}>{formatDate(reply.create_at)}</p>
            </div>
          </div>
          <div>          
          {canEdit() && (
            <a href={`/article/editReply?rid=${reply.id}`}>
              <BsThreeDotsVertical />
            </a>
          )}
          </div>
        </div>
        <hr style={{ width: '100%' }} />
        <div className={scss.mainContent}>
          <div dangerouslySetInnerHTML={{ __html: reply.content }} />
        </div>
      </div>
    </>
  )
}
