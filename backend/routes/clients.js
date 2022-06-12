const router = require('express').Router();
const bcrypt = require("bcrypt");
let Client = require('../models/client.model');
let nodemailer = require('nodemailer');
let Restaurant = require('../models/restaurant.model')
let Plat = require('../models/plat.model')
let Commande = require('../models/commande.model')
let lCommande = require("../models/ligne_commande.model")
let Categorie = require("../models/categorie.model");
const Ligne_Commande = require('../models/ligne_commande.model');



//Gestion Compte

router.route('/add').post(async (req, res) => {

  let password = await bcrypt.hash(req.body.pass, 15);
  let name = req.body.name
  let email = req.body.email
  let city = req.body.city
  const newClient = new Client({
    name,
    email,
    password,
    city
  });
  newClient.save()
    .then(() => res.json('Your account has been created successfully'))
    .catch(err => res.status(400).json('Your account has been not created due some issues please try again'));
})


router.route('/logEmailPwd').post(async (req, res) => {

  let email = req.body.email
  let pwd = req.body.pass
  let client = await Client.findOne({ 'email': email })

  if (client) {

    let check = await bcrypt.compare(pwd, client.password)

    if (check) res.json(client._id)

    else res.status(404).send({ message: "Incorrect  Password" })

  } else
    res.status(404).send({ message: "Incorrect Username " })


})

router.route('/logIn').post(async (req, res) => {

  let email = req.body.email
  let client = await Client.findOne({ "email": email })

  if (client) res.json(client._id)
  else res.status(404).send({ message: "mot de passe " })
})


router.route('/CodeConfirmation').post(async (req, res) => {
  // let transporter=emailConf.transporter;
  const random_string = "0123456789";
  let code_activation = ""
  for (let i = 0; i < 6; i++) {
    code_activation = code_activation.concat(random_string.charAt(Math.floor(Math.random() * random_string.length)))
  }

  // res.json(transporter);

  transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    tls: {
      rejectUnauthorized: false
    },
    auth: {
      user: 'beldi.ensas@gmail.com',
      pass: 'MINIprojet2022 '
    }
  });

  let email = req.body.email
  const client = await Client.findOne({ "email": email })

  if (!client) res.status(404).send({ message: "Client Introuvable" })
  else {
    var mailOption = await {
      from: 'beldi.ensas@gmail.com',
      to: client.email,
      subject: 'Reset Account',
      html: 'Thank you for choosing us, here is your confirmation code <h1>' + code_activation + '</h1>'

    }
    transporter.sendMail(mailOption, function (error, info) {
      if (error) {
        res.json("Your Email doesn't exist")
      } else res.json({ code: code_activation, message: "Please check your email" })
    })

  }



})

router.route('/UpdatePwd').post(async (req, res) => {

  let email = req.body.email
  let pass = await bcrypt.hash(req.body.pass, 15);
  Client.findOneAndUpdate({ 'email': email }, { 'password': pass })
    .then(() => res.json("Your password has been updated successfully"))
    .catch(err => res.json("Something went wrong !!!"))


})

router.route("/getClient/:id").get(async (req, res) => {
  let id = req.params.id
  Client.findById(id)
    .then(client => res.json(client))
    .catch(err => res.status(404).send({ message: "Undefiend Username" }))
})

//Fin Gestion compte


/**  Restaurants plats et categories*/
router.route("/restaurants/:city").get(async (req, res) => {

  Restaurant.find({ city: req.params.city })
    .then(restaurants => res.json(restaurants))
    .catch(() => res.json("error during operation"))

})

router.route("/restaurants/plats/:id").get(async (req, res) => {

  Plat.find({ "restaurant": req.params.id }).populate("restaurant")
    .then(plats => res.json(plats))
    .catch(() => res.json("error during operation"))

})

router.route("/restaurants/get/categories").get((req, res) => {

  Categorie.find()
    .then(categories => res.json(categories))
    .catch(err => res.status(404).send("error"))

})

//Fin Section


//Gestion Commande

router.route("/commande/add/:id").post(async (req, res) => {

  //process.env="Europe/Paris"
  let date_commande = Date.now().toString()
  // res.json(date_commande)
  let client = req.params.id
  let newCommande = new Commande(
    {
      date_commande,
      client
    }
  )

  let ligne = req.body;


  if (newCommande.save()) {

    let commande = newCommande._id

    lCommande.insertMany(ligne.map(element => {
      return {
        "restaurant": element.restau,
        "plat": element.id,
        commande,
        "quantite": element.quantite,
        "subTotal": element.quantite * element.price
      }
    }))
      .then(() => res.json("data added"))


  }



})

router.route("/updateClientLocation/:id").post(async (req, res) => {
  let id = req.params.id
  let current = req.body


  Client.findOneAndUpdate({ '_id': id }, {
    "latitude": current.latitude,
    "longitude": current.longitude
  }, { new: true })
    .then(client => res.json({ "latitude": client.latitude, "longitude": client.longitude }))
    .catch(err => res.status(404).send("Something went wrong !!!"))


})

router.route("/commande/get/:id/:date").get(async (req, res) => {

  let id = req.params.id
  let date = req.params.date

  const commande = await Commande.findOne({
    'client': id,
    'date_commande': {
      $gte: new Date(new Date(date).setHours(00, 00, 00)),
      $lte: new Date(new Date(date).setHours(23, 59, 59))
    },

  })
    .where("status")
    .sort('date_commande')
    .populate("client",["latitude","longitude"])
    .populate("livreur",["latitudeL","longitudeL","name"])

  if (commande != null) res.json(commande)
  else res.status(404).send({ message: "no commande today" })



  //console.log(new Date(new Date(date).setHours(23, 59, 59)))

})

router.route("/commande/all/:id").get(async (req, res) => {

  Commande.find({ "client": req.params.id })
    .sort({ date_commande: -1 })

    .then(commandes => res.json(commandes))
    .catch(err => res.status(404).json(err))

})

router.route("/commande/details/:id").get(async (req, res) => {

  Ligne_Commande.find({ "commande": req.params.id })
    .populate("plat", "name")
    .populate("restaurant", "name")
    .then(lc => res.json(lc))
    .catch(err => res.status(404).json(err))

})


//fin Commande

module.exports = router
