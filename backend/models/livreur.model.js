
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const LivreurSchema=Schema({
   name:{type:String,required:true},
   username:{type:String,required:true},
   password:{type:String,required:true},
   etat:{type: String,default:'free'},
   latitudeL:{type:Number,required:false},
   longitudeL:{type:Number,required:false},
   city:{type:String}
 
});

const Livreur=mongoose.model('Livreur',LivreurSchema);
module.exports=Livreur;