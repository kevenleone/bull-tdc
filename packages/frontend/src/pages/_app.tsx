import '../../styles/globals.scss';
import '@clayui/css/lib/css/atlas.css';

import { ClayIconSpriteContext } from '@clayui/icon';
import React from 'react';

import Layout from '../components/Layout';

const spritemap = require('../assets/spritemap.svg');

function MyApp({ Component, pageProps }) {
  return (
    <ClayIconSpriteContext.Provider value={spritemap}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClayIconSpriteContext.Provider>
  );
}

export default MyApp;
