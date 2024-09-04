import '@/styles/global/index.scss';
//所有全域樣式
import '@fontsource/zen-maru-gothic'; //only 400
//字型僅於此匯入一次，即可全域使用
// import '@fontsource/zen-maru-gothic/300.css';
// import '@fontsource/zen-maru-gothic/400.css';
// import '@fontsource/zen-maru-gothic/500.css';
// import '@fontsource/zen-maru-gothic/700.css';
// import '@fontsource/zen-maru-gothic/900.css';
import '@fontsource-variable/noto-sans-tc';
import NextTopLoader from 'nextjs-toploader';
import Head from 'next/head';
import { AuthProvider } from '@/context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';


export default function MyApp({ Component, pageProps }) {
  // 使用自訂在頁面層級的版面(layout)
  // const getLayout = Component.getLayout || ((page) => page);
  const Layout = Component.layout;
  const CLIENT_ID = "929304171205-k47mhbj1sh1k19bkfh026kioe89jbhjq.apps.googleusercontent.com";
  if (Layout) {
    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <AuthProvider>
            <Layout>
              <NextTopLoader
                color='#f4d284'
                height={5}
              />
              <Component {...pageProps} />
            </Layout>
          </AuthProvider>
        </GoogleOAuthProvider>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <AuthProvider>
            <NextTopLoader
              color='#f4d284'
              height={5}
            />
            <Component {...pageProps} />
          </AuthProvider>
        </GoogleOAuthProvider >
      </>
    );
  }
}
