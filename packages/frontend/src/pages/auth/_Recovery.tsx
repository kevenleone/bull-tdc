import ClayButton from '@clayui/button';
import ClayForm, { ClayInput } from '@clayui/form';
import ClayLayout from '@clayui/layout';
import React from 'react';

export default function _Recovery({ setPageType }) {
  return (
    <div>
      <h1>Forgot Password</h1>
      <ClayForm className="mt-5">
        <ClayForm.Group>
          <label htmlFor="email">Email</label>
          <ClayInput name="email" type="text" />
        </ClayForm.Group>
        <ClayLayout.Row>
          <ClayLayout.Col xl={12}>
            <ClayButton className="btn-block">Send New Password</ClayButton>
          </ClayLayout.Col>
        </ClayLayout.Row>
        <ClayLayout.Row className="signin__navigation_buttons">
          <ClayLayout.Col>
            <ClayButton onClick={() => setPageType('signIn')} displayType="unstyled" className="btn-link">
              Sign In
            </ClayButton>
          </ClayLayout.Col>
          <ClayLayout.Col style={{ textAlign: 'end' }}>
            <ClayButton onClick={() => setPageType('signUp')} displayType="unstyled" className="btn-link">
              Create Account
            </ClayButton>
          </ClayLayout.Col>
        </ClayLayout.Row>
      </ClayForm>
    </div>
  );
}
