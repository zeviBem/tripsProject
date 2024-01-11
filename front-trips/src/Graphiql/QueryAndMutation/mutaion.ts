import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUsersTableInput!) {
    createUsersTable(input: $input ) {
      clientMutationId
    }
  }
`;


