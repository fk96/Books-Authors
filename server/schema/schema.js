const graphql=require("graphql");
const element=require("lodash");
const Book=require("../models/book");
const Author=require("../models/author");
const {GraphQLObjectType,GraphQLString,GraphQLSchema/*GrapHQLNonNull */,GraphQLID,GraphQLInt,GraphQLList}=graphql;

//fake data


const BookType=new GraphQLObjectType({//Book type ve member fieldlar
    name:"Book",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{//kitabın yazarına ait bilgileri çekme
            type:AuthorType,
            resolve(parent,args){
                //return element.find(authors,{id:parent.authorId});
                return Author.findById(parent.authorId);
            }
        }
    })
});

 const AuthorType=new GraphQLObjectType({//Author type ve member fieldlar
    name:"Author",
    fields:()=>({
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        id:{type:GraphQLID},
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                //return element.filter(books,{authorId:parent.id})
                return Book.find({authorId:parent.id});
            }
        }
    })
});
const RootQuery=new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}} ,
            resolve(parent,args){
                //return element.find(books,{id:args.id});//parametre aldığı aldığı id değerine ait kitabı db de yada fake datada bulup döndürüyor
                return Book.findById(args.id);
                //codes to get data from db or fake data
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}} ,
            resolve(parent,args){
                //return element.find(authors,{id:args.id});//parametre aldığı aldığı id değerine ait yazarı db de yada fake datada bulup döndürüyor
                return Author.findById(args.id);
                //codes to get data from db or fake data
            }
        },
        books:{//bütün kitapları listelemek için kitap türünde array
            type:new GraphQLList(BookType),
            resolve(parent,args){
                //return books
                return Book.find({});
            }
        },
        authors:{//bütün yazarları listelemek için yazar türünde array
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
                //return authors
                return Author.find({});
            }
        }
    }
});
const Mutation=new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:GraphQLString},
                age:{type:GraphQLInt}
            },
            resolve(parent,args){
                let author=new Author({
                    name:args.name,
                    age:args.age
                });
                return author.save();
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:GraphQLString},//veya name:{type:new GraphQLNonNull(GraphQLString)}
                genre:{type:GraphQLString},
                authorId:{type:GraphQLID}
            },
            resolve(parent,args){
                let book=new Book({
                    name:args.name,
                    genre:args.genre,
                    authorId:args.authorId
                });
                return book.save();
            }
        }
    }
})

module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
});


