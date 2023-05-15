import { AppProps } from 'next/app';
import React from 'react';

import '../app/assets/styles/globals.scss';

import MainProvider from '@/providers/MainProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainProvider>
      <Component {...pageProps} />
    </MainProvider>
  );
}

export default MyApp;
