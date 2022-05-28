
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const CommandeSchema=Schema({
   date_commande:{type:Date,required:true},
   username:{type:String,required:true},
   password:{type:String,required:true},
   restaurant:{type: Schema.ObjectId,ref:'Restauraunt'},
   client:{type: Schema.ObjectId,ref:'Client'},
   livreur:{type: Schema.ObjectId,ref:'Livreur'},
 
});

const Commande=mongoose.model('Commande',CommandeSchema);
module.exports=Commande;