import '../styles/styles.scss';
import { ReactNode, useEffect } from 'react';
import type { AppLayoutProps } from 'next/app';
import Head from 'next/head';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import theme from '../styles/theme';

const MyApp = ({ Component, pageProps }: AppLayoutProps) => {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  useEffect(() => {
    // remove the server-side injected CSS
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles?.parentElement?.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>My neck of the woods</title>
        <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
      </Head>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
};

export default MyApp;
