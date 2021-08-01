import { gql } from '@apollo/client'

export default gql`query PostQuery($id: ID!){
    post(id: $id){
        id
        title
        comments {
            id
            content
            likes
        }
    }
}`