import React from 'react'
import BackendLayout from '@/components/layout/backend'
import { BackendContext } from '@/context/BackendContext';
import { useRef, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import useAuthRedirect2 from '@/hooks/useAuthRedirect2';


export default function index() {
  const router = useRouter();
  useAuthRedirect2();
  const { user: authUser, loading: authLoading } = useContext(BackendContext);
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchgetMember = (uuid) => {
    const url = `http://localhost:3005/api/member/${uuid}`;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(`錯誤 ${response.status}: ${errorData.message}`);
          });
        }
        return response.json();
      })
      .then(data => {
        if (data.status === 'success') {
          setUser(data.result);
          if (data.result.avatar_file) {
            const avatarUrl = `${BASE_URL}${data.result.avatar_file}`; // 組合完整的圖片 URL
            setAvatar(avatarUrl);
          } else {
            setAvatar(avatarPic); // 如果沒有頭像，設置為預設頭像
          }
        }
        else {
          setError(data.message);
        }
      })
      .catch(error => {
        setError(error.message);
        //setAvatar(avatarPic); // 發生錯誤時也設置為預設頭像
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (authLoading) return;

    if (authUser && authUser.uuid) {
      fetchgetMember(authUser.uuid);
    } else {
      setError('User not authenticated');
    }
  }, [authUser, authLoading]);

  return (
    <BackendLayout></BackendLayout>
  )
}
