import React,{Component} from 'react';
import BookList from "./components/BookList"
import AddBook from "./components/AddBook";
//import AddAuthor from "./components/AddAuthor";
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "react-apollo"

const client = new ApolloClient({
  uri:"http://localhost:4000/graphql"
})
class App extends Component {
  render(){
    return (
      <ApolloProvider  client={client}>
        <div id="main">
          
          <BookList/>
          <AddBook/>
          
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
