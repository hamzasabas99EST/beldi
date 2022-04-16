
const express = require('express');
const cors = require('cors');
const app = express()
const mongoose=require('mongoose');


app.use(express.json());
app.use(cors());


//Connection avec base de données 

mongoose.connect('mongodb+srv://beldi:beldi@cluster0.arvwc.mongodb.net/beldi?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const connection=mongoose.connection;
connection.once('open',()=>{
  console.log("Mongo db is seccessfully");
})

/*app.post('/add',async(req,res)=>{
    let name=req.body.name
    const newClient=new Client({
        name
    });
    newClient.save()
    .then(()=>res.json('Client addd'))
    .catch(err=>res.status(400).json('Error'+err));
});

app.get('/',async(req,res)=>{
    Client.find()
    .then(clients=>res.json(clients))
})*/

const ClientRouter=require('./routes/clients');
app.use('/clients',ClientRouter);


const port = 9000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })