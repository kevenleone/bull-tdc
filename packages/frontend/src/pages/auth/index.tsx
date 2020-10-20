import ClayButton from '@clayui/button';
import ClayForm, { ClayInput } from '@clayui/form';
import ClayLayout from '@clayui/layout';
import React from 'react';

import NavigationBar from '../../components/NavigationBar';
import SignIn from './_SignIn';

export default function index () {
  return (
    <div className='sign__in'>
      <NavigationBar />
      <ClayLayout.Row justify="start" className='signin__row'>
        <ClayLayout.Col size={6} className='signin__col signin__main'>
          <ClayLayout.ContainerFluid view>
            <ClayLayout.Row justify="center">
              <ClayLayout.Col xl={8} lg={10}>
                <SignIn />
                <div className='signin__footer'>
                  <p>
                  Copyright  2020. All Rights Reserverd.
                  </p>
                  <p>Terms of Use | Privacy Policies</p>
                </div>
              </ClayLayout.Col>
            </ClayLayout.Row>
          </ClayLayout.ContainerFluid>
        </ClayLayout.Col>
        <ClayLayout.Col
          className='signin__col signin__background'>
        </ClayLayout.Col>
      </ClayLayout.Row>
    </div>
  );
}
