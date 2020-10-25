import { gql } from '@apollo/client';

export const RecoveryMutation = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export const SignInMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const SignUpMutation = gql`
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
    }
  }
`;
