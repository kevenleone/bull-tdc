import '../../styles/globals.scss';
import '@clayui/css/lib/css/atlas.css';

import { ApolloProvider } from '@apollo/client';
import { ClayIconSpriteContext } from '@clayui/icon';
import React from 'react';

import { useApollo } from '../../nextApollo';
import Layout from '../components/Layout';

const spritemap = require('../assets/spritemap.svg');

const MyApp = ({ Component, pageProps }): React.ReactElement => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ClayIconSpriteContext.Provider value={spritemap}>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </ClayIconSpriteContext.Provider>
  );
};

export default MyApp;
