import React,{Component} from 'react';
//import {gql} from "apollo-boost";
import {graphql,compose} from "react-apollo";
import {getAuthorsQuery,AddBookMutation, getBooksQuery} from "../queries/queries"



class AddBook extends Component {
    constructor(props){
        super(props);
        this.state={
            name:"",
            genre:"",
            authorId:""
        }
    }
    displayAuthors(){
        var data=this.props.getAuthorsQuery;
        console.log(this.props)
        if(!data.loading){
            return data.authors.map(author=>{
                return(
                    <option key={author.id} value={author.id}>{author.name}</option>
                )
            })
        }
        else{
            return(
                <option>Loading...</option>
            )
        }
    }
    submitForm(e){
        e.preventDefault();
        this.props.addBookMutation({    //formdan gelen değer submit ediliyor
            variables:{
                name:this.state.name,
                genre:this.state.genre,
                authorId:this.state.authorId
            },
            refetchQueries:[{query:getBooksQuery}]
        }) 
    }
    render(){
      
      return (
        <div>
            <h3 style={{color:"navy",marginLeft:"22rem"}}>Add Book</h3>
            <form id="add-book"onSubmit={this.submitForm.bind(this)}>
                <div className="form-items">
                    <div className="field">
                        <label style={{marginLeft:"15rem",borderRadius:"5px"}}>Book Name:</label>
                        <input style={{borderRadius:"5px"}} type="text" onChange={(e)=>this.setState({name:e.target.value})}/>
                    </div>

                    <div className="field">
                        <label style={{marginLeft:"280px"}}>Genre:</label>
                        <input style={{borderRadius:"5px"}} type="text" onChange={(e)=>this.setState({genre:e.target.value})}/>
                    </div>

                    <div className="field">
                        <label style={{marginLeft:"274px"}}>Author:</label>
                        <select style={{borderRadius:"5px"}} onChange={(e)=>this.setState({authorId:e.target.value})}>
                            <option>Select Author</option>
                            {this.displayAuthors()}
                        </select>
                        <button className="my-button">+</button>
                    </div>
                </div>
                
            </form>
        </div>
      );
    }
  }

  export default compose(
      graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),
      graphql(AddBookMutation,{name:"addBookMutation"})
  )(AddBook);