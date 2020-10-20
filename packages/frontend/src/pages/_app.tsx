import '../../styles/globals.scss';
import '@clayui/css/lib/css/atlas.css';

import { ClayIconSpriteContext } from '@clayui/icon';
import React from 'react';

const spritemap = require('../assets/spritemap.svg');

function MyApp({ Component, pageProps }) {
    return (
        <ClayIconSpriteContext.Provider value={spritemap}>
            <Component {...pageProps} />
        </ClayIconSpriteContext.Provider>
    );
}

export default MyApp;
