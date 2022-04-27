
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const LivreurShema=Schema({
   name:{type:String,required:true},
   username:{type:String,required:true},
   password:{type:String,required:true},
   restaurant:{type: Schema.ObjectId,ref:'Restauraunt'},
 
});

const Livreur=mongoose.model('Livreur',LivreurShema);
module.exports=Livreur;