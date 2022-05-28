
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Ligne_CommandeSchema=Schema({
   date_Ligne_Commande:{type:Date,required:true},
   username:{type:String,required:true},
   password:{type:String,required:true},
   restaurant:{type: Schema.ObjectId,ref:'Restauraunt'},
   client:{type: Schema.ObjectId,ref:'Client'},
   livreur:{type: Schema.ObjectId,ref:'Client'},
 
});

const Ligne_Commande=mongoose.model('Ligne_Commande',Ligne_CommandeSchema);
module.exports=Ligne_Commande;