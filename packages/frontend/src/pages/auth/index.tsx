import { ClayButtonWithIcon } from '@clayui/button';
import ClayLayout from '@clayui/layout';
import Head from 'next/head';
import React, { useState } from 'react';

import Recovery from './_Recovery';
import SignIn from './_SignIn';
import SignUp from './_SignUp';

const Auth: React.FC = () => {
  const defaultPage = 'SignIn';
  const [pageType, setPageType] = useState(defaultPage);

  return (
    <div className="sign__in">
      <Head>
        <title>Liferay | {pageType}</title>
      </Head>
      <ClayLayout.Row justify="start" className="signin__row">
        <ClayLayout.Col size={6} className="signin__col signin__main">
          <ClayLayout.ContainerFluid view>
            <ClayLayout.Row justify="center">
              <ClayLayout.Col xl={8} lg={10}>
                <ClayButtonWithIcon
                  onClick={() => setPageType(defaultPage)}
                  symbol="angle-left"
                  displayType="unstyled"
                  className="signin__btn-back"
                />
                {pageType === 'SignIn' && <SignIn setPageType={setPageType} />}
                {pageType === 'SignUp' && <SignUp setPageType={setPageType} />}
                {pageType === 'Recovery' && (
                  <Recovery setPageType={setPageType} />
                )}

                <div className="signin__footer">
                  <p>Copyright 2020. All Rights Reserverd.</p>
                  <p>Terms of Use | Privacy Policies</p>
                </div>
              </ClayLayout.Col>
            </ClayLayout.Row>
          </ClayLayout.ContainerFluid>
        </ClayLayout.Col>
        <ClayLayout.Col className="signin__col signin__background"></ClayLayout.Col>
      </ClayLayout.Row>
    </div>
  );
};

export default Auth;
