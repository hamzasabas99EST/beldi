
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const AdminShema=Schema({
   name:{type:String,required:true},
   username:{type:String,required:true},
   password:{type:String,required:true},
   restaurant:{type: Schema.ObjectId,ref:'Restauraunt'},
   
});

const Admin=mongoose.model('Admin',AdminShema);
module.exports=Admin;