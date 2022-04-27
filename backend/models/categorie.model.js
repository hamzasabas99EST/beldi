
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const CategorieShema=Schema({
   name:{type:String,required:true},
   
});

const Categorie=mongoose.model('Categorie',CategorieShema);
module.exports=Categorie;