const router=require('express').Router();
const bcrypt=require("bcrypt"); 
let Client=require('../models/client.model');
//let emailConf=require("../helpers/EmailConfiguration")
let nodemailer=require('nodemailer');



router.route('/add').post(async(req,res)=>{
        
       let password=await bcrypt.hash(req.body.pass,15);
       let name=req.body.name
       let email=req.body.email
       const newClient=new Client({
           name,
           email,
           password
       });
       newClient.save()
       .then(()=>res.json('Client added'))
       .catch(err=>res.status(400).json('Error'+err));
})


router.route('/logEmailPwd').post(async(req,res)=>{

    let email=req.body.email
    let pwd=req.body.pass
    let client=await Client.findOne({'email':email})

    if(client){
        
        let check= await bcrypt.compare(pwd,client.password)
    
        if(check) res.json(client._id)

        else res.status(404).send({message:"mot de passe incorrect "})

    }else 
        res.status(404).send({message:"invalide client "})
  

})

router.route('/logIn').post(async(req,res)=>{
    
    let email=req.body.email
    let client =await Client.findOne({"email":email})
    
    if(client) res.json(client)
    else  res.status(404).send({message:"invalide client "})
})


router.route('/CodeConfirmation').post(async(req,res)=>{
   // let transporter=emailConf.transporter;
    const random_string="0123456789";
    let code_activation=""
    for(let i=0;i<6;i++){
        code_activation =code_activation.concat(random_string.charAt(Math.floor(Math.random() *random_string.length)))
    }

   // res.json(transporter);

   transporter=  nodemailer.createTransport({
    service:'gmail',
    secure: false,
    port: 25,
    tls: {
      rejectUnauthorized: false
     },
    auth:{
      user:'beldi.ensas@gmail.com',
      pass:'MINIprojet2022 '
    }
  }); 

    let email=req.body.email
    const client=await Client.findOne({"email":email})

    if(!client) res.status(404).send({message:"Client Introuvable"})
    else {
      var mailOption=await {
        from:'beldi.ensas@gmail.com',
        to:client.email,
        subject:'Code de confirmation',
        html:'Merci pour Choisir notre application voici votre code du confirmation : <h1>'+code_activation+'</h1>'
        
      }
      transporter.sendMail(mailOption,function(error,info){
        if(error){
          res.json("fin ghadi"+error)
        }else res.json({code:code_activation,message:"Consulter votre email"})
      })
     
    }
  

      
})

router.route('/UpdatePwd').post(async(req,res)=>{

    let email=req.body.email
    let pass=await bcrypt.hash(req.body.pass,15);
    Client.findOneAndUpdate({'email':email},{'password':pass})
    .then(()=>res.json("Mot de passe bien modifié"))
    .catch(err=>res.json("Erreur dans l'operation "))


})

router.route("/getClient/:id").get(async(req,res)=>{
  let id=req.params.id
  Client.findById(id)
  .then(client=>res.json(client))
  .catch(err=>res.status(404).send({message:"Client introuvable"}))
})


module.exports=router
