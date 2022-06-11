
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ClientSchema=Schema({
   name:{type:String,required:true},
   email:{type:String,required:true},
   password:{type:String,required:true},
   latitude:{type:Number,required:false},
   longitude:{type:Number,required:false},
 
   
});

const Client=mongoose.model('Client',ClientSchema);
module.exports=Client;