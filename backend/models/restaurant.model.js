
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const RestaurantShema=Schema({
   name:{type:String,required:true},
   adresse:{type:String,required:true},
   tele:{type:String,required:true},
 
});

const Restaurant=mongoose.model('Restaurant',RestaurantShema);
module.exports=Restaurant;