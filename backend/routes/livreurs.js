const router = require('express').Router();
let Commande = require("../models/commande.model")
let Livreur = require("../models/livreur.model")
let Lignescommande = require("../models/ligne_commande.model")
const bcrypt = require("bcrypt");
const Restaurant = require('../models/restaurant.model');


router.route("/updateCoords/:id").post(async (req, res) => {

    let { lat,long,city } = req.body

    Livreur.findByIdAndUpdate(req.params.id, {
        latitudeL: lat,
        longitudeL: long,
        "city":city
    })
    .then(() => res.json("YEs Yes YEs"))
    

})

router.route("/login").post(async (req, res) => {
    let { username, pass } = req.body
    let livreur = await Livreur.findOne({ "username": username })

    if (livreur) {
        let check = await bcrypt.compare(pass, livreur.password)

        if (check) res.json(livreur._id)

        else res.status(404).send({ message: "Incorrect  Password" })
    }
    else res.status(404).send({ message: "your username incorrect" })
})

router.route("/Commandes/:id").get(async (req, res) => {
    let id = req.params.id
    let livreur = await Livreur.findById(id)
    let commandes = await Commande.find({ "livreur": id })
        .populate("client")


    if (livreur) res.json({ "livreur": livreur, commandes })

})

router.route("/getDetailsCommande/:id").get(async (req, res) => {
    let id = req.params.id


    let ligne = await Lignescommande.find({ "commande": id })
        .populate("plat", "name")
        .populate("restaurant", "name")

    await updateCommande(id)
    res.json({ ligne })


})

router.route("/updateLigne/:id").post(async (req, res) => {

    let lc = await Lignescommande.findByIdAndUpdate(req.params.id, { isReady: true }, { new: true })

    if (lc.commande != null) {
        await updateCommande(lc.commande)
        res.json(lc.isReady)
    }
})

const updateCommande = async (id) => {
    let total = await Lignescommande.count().where({ "commande": id })
    let count = await Lignescommande.count().where({ "commande": id }).where({ "isReady": true })
    let commande = await Commande.findById(id)

    if (count == 1) {
        commande.status = "processing"
    } else
        if (count == total) commande.status = "on the road"

    commande.save();


}

router.route("/livred/:id").post(async (req, res) => {

    Commande.findByIdAndUpdate(req.params.id, { status: "livred" }, { new: true })
    .then(res=>res.json("updated"))
    .catch(err=>res.status(404).send("not updated"))

   
})


/**  Restaurants plats et categories*/
router.route("/restaurants/:city").get(async (req, res) => {

    Restaurant.find({ city: req.params.city })
      .then(restaurants => res.json(restaurants))
      .catch(() => res.json("error during operation"))
  
  })
  

module.exports = router
