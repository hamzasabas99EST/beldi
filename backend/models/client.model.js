
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const ClientShema=Schema({
   name:{type:String,required:true},
   email:{type:String,required:true},
   password:{type:String,required:true},
   activated:{type:Boolean,default:false}
   
});

const Client=mongoose.model('Client',ClientShema);
module.exports=Client;