import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query MyQuery {
    allUsersTables {
      nodes {
        email
        nodeId
        isAdmin
        id
        username
        password
      }
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    usersTableByEmail(email: $email) {
      email
      isAdmin
      password
      username
    }
  }
`