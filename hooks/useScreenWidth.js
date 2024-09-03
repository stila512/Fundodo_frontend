import { useState, useEffect } from 'react';

const useScreenWidth = () => {
  if (typeof window === 'undefined') return;

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenWidth;
};

export default useScreenWidth;