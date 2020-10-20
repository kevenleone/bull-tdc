import ClayButton from '@clayui/button';
import ClayForm, { ClayInput } from '@clayui/form';
import ClayLayout from '@clayui/layout';
import React from 'react';

export default function _SignIn({ setPageType }) {
  return (
    <div>
      <h1>Sign In</h1>
      <ClayForm className="mt-5">
        <ClayForm.Group>
          <label htmlFor="email">Email</label>
          <ClayInput name="email" type="text" />
        </ClayForm.Group>
        <ClayForm.Group>
          <label htmlFor="password">Password</label>
          <ClayInput name="password" type="password" />
        </ClayForm.Group>
        <ClayLayout.Row>
          <ClayLayout.Col xl={12}>
            <ClayButton className="btn-block">Sign In</ClayButton>
          </ClayLayout.Col>
        </ClayLayout.Row>
        <ClayLayout.Row className="signin__navigation_buttons">
          <ClayLayout.Col>
            <ClayButton onClick={() => setPageType('signUp')} displayType="unstyled" className="btn-link">
              Create Account
            </ClayButton>
          </ClayLayout.Col>
          <ClayLayout.Col style={{ textAlign: 'end' }}>
            <ClayButton onClick={() => setPageType('recovery')} displayType="unstyled" className="btn-link">
              Forgot Password
            </ClayButton>
          </ClayLayout.Col>
        </ClayLayout.Row>
      </ClayForm>
    </div>
  );
}
