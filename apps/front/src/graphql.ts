import { gql } from '@apollo/client';

export const AUTHENTICATE_MUTATION = gql`
  mutation AuthenticateMutation($input: AuthenticateInput!) {
    authenticate(input: $input) {
      jwtToken
    }
  }
`;