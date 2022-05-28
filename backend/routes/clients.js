const router=require('express').Router();
const bcrypt=require("bcrypt"); 
let Client=require('../models/client.model');
//let emailConf=require("../helpers/EmailConfiguration")
let nodemailer=require('nodemailer');
let Restaurant = require('../models/restaurant.model')
let Plat = require('../models/plat.model')



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
       .then(()=>res.json('Your account has been created successfully'))
       .catch(err=>res.status(400).json('Error'+err));
})


router.route('/logEmailPwd').post(async(req,res)=>{

    let email=req.body.email
    let pwd=req.body.pass
    let client=await Client.findOne({'email':email})

    if(client){
        
        let check= await bcrypt.compare(pwd,client.password)
    
        if(check) res.json(client._id)

        else res.status(404).send({message:"Incorrect  Password"})

    }else 
        res.status(404).send({message:"Incorrect Username "})
  

})

router.route('/logIn').post(async(req,res)=>{
    
    let email=req.body.email
    let client =await Client.findOne({"email":email})
    
    if(client) res.json(client)
    else  res.status(404).send({message:"mot de passe "})
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
        subject:'Reset Account',
        html:'Thank you for choosing us, here is your confirmation code <h1>'+code_activation+'</h1>'
        
      }
      transporter.sendMail(mailOption,function(error,info){
        if(error){
          res.json("Your Email doesn't exist")
        }else res.json({code:code_activation,message:"Please check your email"})
      })
     
    }
  

      
})

router.route('/UpdatePwd').post(async(req,res)=>{

    let email=req.body.email
    let pass=await bcrypt.hash(req.body.pass,15);
    Client.findOneAndUpdate({'email':email},{'password':pass})
    .then(()=>res.json("Your password has been updated successfully"))
    .catch(err=>res.json("Something went wrong !!!"))


})

router.route("/getClient/:id").get(async(req,res)=>{
  let id=req.params.id
  Client.findById(id)
  .then(client=>res.json(client))
  .catch(err=>res.status(404).send({message:"Undefiend Username"}))
})


/** get Restaurants*/
router.route("/restaurants").get(async (req, res) => {

  Restaurant.find()
  .then(restaurants=>res.json(restaurants))
  .catch(()=>res.json("error during operation"))

})

router.route("/restaurants/:id").get(async (req, res) => {

  Plat.find({"restaurant":req.params.id}).populate("restaurant")
  .then(plats=>res.json(plats))
  .catch(()=>res.json("error during operation"))

})


module.exports=router
