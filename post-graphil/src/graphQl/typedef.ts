import { gql } from "postgraphile"

export const typeDef = gql`

input User {
    
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
