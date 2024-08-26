import { jwtDecode } from 'jwt-decode';

export default function () {
  const token = localStorage.getItem('token');
  // console.log('已從 localStorage 取出：', token);

  if (!token) {
    console.info('找不到 token 噎 (*/ω＼*)');
    return {
      email: null,
      exp: null,
      iat: null,
      userId: null
    };
  }

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken;

  } catch (error) {
    console.info('token 解譯失敗 ಥ_ಥ');
    // console.error(error);
  }
}