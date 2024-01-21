import { gql } from "postgraphile"

export const typeDef = gql`

type User {
    id: Int
    username: String
    email: String!
    password: String!
    isAdmin: Boolean
}
input LoginUserInput {
  email: String!
  password: String!
}

type LoginUserPayload {
  token: String
  user: User
}

type Mutation {
    loginUser(input: LoginUserInput!): LoginUserPayload
  }
`
