import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUsersTableInput!) {
    createUsersTable(input: $input ) {
      clientMutationId
    }
  }
`;

export const LOGIN_WITH_JWT = gql`
  mutation Authenticate($input: AuthenticateInput!) {
    authenticate(input: $input) {
      jwtToken
      __typename

    }
  }
`;



