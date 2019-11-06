import {gql} from "apollo-boost";

const getAuthorsQuery =gql`
    {
        authors{
            name
            id
        }
    }
`
const getBooksQuery =gql`
    {
        books{
          name
          id
        }
    }
`
const AddBookMutation=gql`
    mutation($name:String!,$genre:String!,$authorId:ID!){
        addBook(name:$name,genre:$genre,authorId:$authorId){
            name
            id
        }
    }
`

const AddAuthorMutation=gql`
    mutation($a_name:String!,$age:int!){
        addAuthor(a_name:$a_name,age:$age){
            a_name
            age
        }
    }
`

const getBookQuery=gql`
    
        query($id:ID){
            book(id:$id){
                id
                name
                genre
                author{
                    id
                    name
                    age
                    books{
                        name
                        id
                    }
                }
            }
        }
    
`
export {getAuthorsQuery,getBooksQuery,AddBookMutation,AddAuthorMutation,getBookQuery};