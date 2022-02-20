module.exports = 
{
    
    //"URI": "mongodb://localhost/login",
    //"URI": "mongodb://127.0.0.1:27017",
    "URI": "mongodb+srv://admin:7IFGRZMfUNXbPhEi@cluster0.37bet.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    "Secret": 'SomeSecret'


    ////mongodb atlas
    //admin
    //7IFGRZMfUNXbPhEi


/*    
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:<password>@cluster0.37bet.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/
}