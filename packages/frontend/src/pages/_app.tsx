import '../../styles/globals.scss';
import '@clayui/css/lib/css/atlas.css';

import { ApolloProvider } from '@apollo/client';
import { ClayIconSpriteContext } from '@clayui/icon';
import React from 'react';

import ApolloClient from '../../ApolloClient';
import Layout from '../components/Layout';

const spritemap = require('../assets/spritemap.svg');

function MyApp({ Component, pageProps }) {
  return (
    <ClayIconSpriteContext.Provider value={spritemap}>
      <ApolloProvider client={ApolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </ClayIconSpriteContext.Provider>
  );
}

export default MyApp;
