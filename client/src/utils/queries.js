import { gql } from '@apollo/client';

export const GET_ME = gql`
    query user {
        user {
            _id
            name
            email
            savedBooks
        }
    }
`