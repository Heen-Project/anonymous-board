import { gql } from '@apollo/client'

export default gql`query {
    user {
        id
        email
    }
}`