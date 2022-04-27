const router=require('express').Router();
let Admin=require('../models/admin.model');
let Livreur=require('../models/livreur.model');
const { route } = require('./clients');

router.route("/login").post(async(req,res)=>{

    let username=req.body.username
    let pass=req.body.pass

   const  admin=await Admin.find({"username":username}) 
   
   if(admin){
      
      if(admin.password==pass) res.status(200).send(admin._id)
      else res.status(404).send({message:"mot de passe incorrecte"})
    
   }else res.status(404).send({message:"Nom utilisateur introuvable"})

})

router.route("/addLivreur").post(async(req,res)=>{
    
    let name=req.body.name
    let username=req.body.username
    let password=req.body.password

    let newLivreur=new Livreur({
        name,
        username,
        password
    })

    newLivreur.save()
    .then(()=>res.json("Livreur bien ajouté"))
    .cath(err=>res.status(404).json("ERROR "+err))    

})

router.route("/deleteLivreur/:id").delete(async(req,res)=>{

    let id=req.params.id
    
    Livreur.findByIdAndDelete(id)
    .then(()=>res.json("Livreur deleted successfully"))
    .catch(err=>res.status(404).send("Erruer "+err))

})


module.exports=router
