import { gql, useMutation } from '@apollo/client';
import ClayButton from '@clayui/button';
import ClayForm, { ClayInput } from '@clayui/form';
import ClayLayout from '@clayui/layout';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { RecoveryMutation } from '../../graphql/schemas';
import { IProps } from './_common';

const Recovery = ({ setPageType }: IProps): React.ReactElement => {
  const [email, setEmail] = useState('');
  const [onRecovery] = useMutation(RecoveryMutation);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await onRecovery({ variables: { email } });
      setPageType('SignIn');
      toast.info(`A recovery password email was sent to ${email} :)`);
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <ClayForm onSubmit={onSubmit} className="mt-5">
        <ClayForm.Group>
          <label htmlFor="email">Email</label>
          <ClayInput
            onChange={({ target: { value } }) => setEmail(value)}
            name="email"
            type="text"
          />
        </ClayForm.Group>
        <ClayLayout.Row>
          <ClayLayout.Col xl={12}>
            <ClayButton
              disabled={!email}
              onClick={onSubmit}
              className="btn-block"
            >
              Send New Password
            </ClayButton>
          </ClayLayout.Col>
        </ClayLayout.Row>
        <ClayLayout.Row className="signin__navigation_buttons">
          <ClayLayout.Col>
            <ClayButton
              onClick={() => setPageType('SignIn')}
              displayType="unstyled"
              className="btn-link"
            >
              Sign In
            </ClayButton>
          </ClayLayout.Col>
          <ClayLayout.Col style={{ textAlign: 'end' }}>
            <ClayButton
              onClick={() => setPageType('SignUp')}
              displayType="unstyled"
              className="btn-link"
            >
              Create Account
            </ClayButton>
          </ClayLayout.Col>
        </ClayLayout.Row>
      </ClayForm>
    </div>
  );
};

export default Recovery;
