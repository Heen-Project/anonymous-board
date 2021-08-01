import { gql } from '@apollo/client'

export default gql`{
    posts {
        id
        title
    }
}`