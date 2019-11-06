const express=require("express");
const graphqlHTTP=require("express-graphql");
const schema=require("./schema/schema");
const mongoose=require("mongoose");
const cors=require("cors");

const app=express();

app.use(cors());

mongoose.connect("mongodb+srv://fk96:1234@graphql-app-jhlhf.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true});
mongoose.connection.once("open",()=>{
    console.log("connected to mongo db");
});
app.use("/graphql",graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(4000,()=>{
    console.log("Port 4000 is being listened");
});

//connection URI:"mongodb+srv://fk96:1234@graphql-app-jhlhf.mongodb.net/test?retryWrites=true&w=majority"
