import React,{Component} from "react";
import {graphql} from "react-apollo";
import {getBookQuery} from "../queries/queries"

class BookDetails extends Component{
    displayBookDetails(){
        const {book}=this.props.data;
        if(book){
            return(
                <div>
                    <div className="card text-white bg-primary mb-3" style={{maxWidth:"18rem",margin:"auto" }}>
                        <div className="card-header" style={{textAlign:"center"}}>{book.name}</div>
                        <div className="card-body">
                            <h5 className="card-title">Genre:{book.genre}</h5>
                            <p className="card-text">Author:{book.author.name}</p>
                            <h5 className="card-title">All Book of This Author</h5>
                            <p className="card-text">
                                <ul>
                                    {
                                        book.author.books.map(item=>{
                                            return <li key={item.id}>{item.name}</li>
                                        })
                                    }
                                </ul>
                            </p>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div>No Book Selected </div>
            )
        }
        
    }
    render(){
        
        return(
                <div className="book-detail" style={{width:"30%",backgroundColor:"#80ff00"}}>
                    <h2 style={{color:"navy",marginTop:"100px",textAlign:"center"}}>Details of Book</h2>
                    {this.displayBookDetails()} 
                </div>
            )
        
    }
}

export default graphql(getBookQuery,{
    options:(props)=>{
        return{
            variables:{
                id:props.bookId//booklistten gelen bookId değerini getBookQuery e parametre olarak gönderme
            }
        }
    }
})(BookDetails);