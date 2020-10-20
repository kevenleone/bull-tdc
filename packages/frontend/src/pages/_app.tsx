import '../../styles/globals.scss';
import '@clayui/css/lib/css/atlas.css';

import { ClayIconSpriteContext } from '@clayui/icon';
import React from 'react';

const spritemap =
  'https://cdn.jsdelivr.net/npm/@clayui/css/lib/images/icons/icons.svg';

function MyApp ({ Component, pageProps }) {
  return <ClayIconSpriteContext.Provider value={spritemap}>
    <Component {...pageProps} />
  </ClayIconSpriteContext.Provider>
  ;
}

export default MyApp;
