import React,{Component} from 'react';
import {graphql} from "react-apollo";
import {AddAuthorMutation} from "../queries/queries";

class AddAuthor extends Component{
    constructor(props){
        super(props)
        this.state={
            a_name:"",
            age:0
        }    
    }
    submitForm(e){
        e.preventDefault();
        this.props.addAuthorMutation({    //formdan gelen değer submit ediliyor
            variables:{
                a_name:this.state.a_name,
                age:this.state.age
            }
        }) 
        console.log(this.props);
    }

    render(){
        return(
            <div>
                <h3 >Add Author</h3>
                    <form id="add-author"onSubmit={this.submitForm.bind(this)}>
                        <div className="field">
                            <label >Author Name:</label>
                            <input  type="text" onChange={(e)=>this.setState({a_name:e.target.value})}/>
                        </div>

                        <div className="field">
                            <label >Age:</label>
                            <input type="text" onChange={(e)=>this.setState({age:e.target.value})}/>
                        </div>
                        <button className="my-button">+</button>

                    </form>
            </div>
        );
    }
}
export default graphql(AddAuthorMutation)(AddAuthor);