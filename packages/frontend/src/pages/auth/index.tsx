import { ClayButtonWithIcon } from '@clayui/button';
import ClayLayout from '@clayui/layout';
import Head from 'next/head';
import React, { useState } from 'react';

import NavigationBar from '../../components/NavigationBar';
import Recovery from './_Recovery';
import SignIn from './_SignIn';
import SignUp from './_SignUp';

export default function index() {
  const defaultPage = 'signIn';
  const [pageType, setPageType] = useState(defaultPage);

  return (
    <div className="sign__in">
      <Head>
        <title>Auth</title>
      </Head>
      <NavigationBar />
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
                {pageType === 'signIn' && <SignIn setPageType={setPageType} />}
                {pageType === 'signUp' && <SignUp setPageType={setPageType} />}
                {pageType === 'recovery' && <Recovery setPageType={setPageType} />}

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
}
