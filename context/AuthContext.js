import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      console.log('Token from localStorage:', token); // 輸出 token
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          console.log('Decoded Token:', decodedToken); // 輸出解碼後的 token
          const expirationDate = new Date(decodedToken.exp * 1000);

          if (expirationDate < new Date()) {
            console.log('Token expired');
            localStorage.removeItem('token');
            setUser(null);
          } else {
            setUser(decodedToken);
          }
        } catch (error) {
          console.error('解碼 JWT 失敗:', error);
          localStorage.removeItem('token');
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    checkToken(); // 初始化檢查
  }, []);

  const login = (token) => {
    try {
      localStorage.setItem('token', token);
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
      console.log('Login function completed successfully');
    } catch (error) {
      console.error('Error in login function:', error);
    }
  };

  const logout = () => {
    // 移除 token
    localStorage.removeItem('token');

    // 取得狗狗資料的鍵名列表
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith('dogData_')) {
        // 移除與狗狗資料相關的項目
        localStorage.removeItem(key);
      }
    });

    // 清除用戶資料
    setUser(null);
  };

  console.log('AuthContext User:', user); // 輸出 AuthContext 的 user
  console.log('AuthContext Loading:', loading); // 輸出 AuthContext 的 loading

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };