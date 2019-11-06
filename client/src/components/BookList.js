import React,{Component} from 'react';
import BookDetails from "./BookDetails";
import {graphql} from "react-apollo";
import {getBooksQuery} from "../queries/queries"


class BookList extends Component {
  constructor(props){
    super(props);
    this.state={
      selected:null
    }
  }
  displayBooks(){
    var data=this.props.data;
    if(data.loading){
      console.log("Loading...");
      return(
        <div>
          <h4>Loading....</h4>
        </div>
      ) 
    }
    else{
      console.log(data);
      return data.books.map(book=>{
        
        return(          
          <div className=" btn btn-warning" style={{width:"12rem",marginBottom:"10px"}} onClick={(e)=>{this.setState({selected:book.id})}}>
            <div className="card-body">
              
              <p className="card-text" key={book.id} >{book.name}</p>
              
            </div>
          </div>
          
        )
      })
    }
  }
  render(){
    
    return (
      <div>
        <h1 style={{color:"navy",backgroundColor:"#1db9ff", width:"70%",marginBottom:"0px",textAlign:"center"}}>Book List</h1>
        <ul className="book-list" style={{width:"70%",backgroundColor:"#1db9ff"}} >
            {this.displayBooks()}
        </ul>
        <BookDetails bookId={this.state.selected}/>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
