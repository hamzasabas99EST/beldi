const router = require('express').Router();
let Commande = require("../models/commande.model")
let Livreur = require("../models/livreur.model")
let Lignescommande = require("../models/ligne_commande.model")
const bcrypt = require("bcrypt");
const Restaurant = require('../models/restaurant.model');

//Gestion Compte
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



//Update Coords and city
router.route("/updateCoords/:id").post(async (req, res) => {

    let { lat, long, city } = req.body

    Livreur.findByIdAndUpdate(req.params.id, {
        latitudeL: lat,
        longitudeL: long,
        "city": city
    })
        .then(() => res.json("YEs Yes YEs"))


})

//Get data of livreur

router.route("/get/:id").get(async (req, res) => {
    Livreur.findById(req.params.id)
        .then(livreur => res.json(livreur))
        .catch(error => res.send("bad"))
})


//Afficher les commande effectué au livreur

router.route("/Commandes/:id").get(async (req, res) => {
    let id = req.params.id
    let livreur = await Livreur.findById(id)
    let commandes = await Commande.find({ "livreur": id })
        .where({
            'date_commande': {
                $gte: new Date(new Date().setHours(00, 00, 00)),
                $lte: new Date(new Date().setHours(23, 59, 59))
            },
        })
        .populate("client")


    if (livreur) res.json({ "livreur": livreur, commandes })

})


//Display details of order
router.route("/getDetailsCommande/:id").get(async (req, res) => {
    let id = req.params.id


    let ligne = await Lignescommande.find({ "commande": id })
        .populate("plat", "name")
        .populate("restaurant", "name")

    const Total = ligne.reduce((accumulator, item) => {
        return accumulator + item.subTotal;
    }, 0);

    await updateCommande(id)
    res.json({ ligne, Total })


})

//Update status of details
router.route("/updateLigne/:id").post(async (req, res) => {

    let lc = await Lignescommande.findByIdAndUpdate(req.params.id, { isReady: true }, { new: true })

    if (lc.commande != null) {
        await updateCommande(lc.commande)
        res.json(lc.isReady)
    }
})


//Update status of commande
const updateCommande = async (id) => {
    let total = await Lignescommande.count().where({ "commande": id })
    let count = await Lignescommande.count().where({ "commande": id }).where({ "isReady": true })
    let commande = await Commande.findById(id)

    if (commande.status == "taken") {
        if (count == 1) {
            commande.status = "processing"
        } else
            if (count == total) commande.status = "on the road"
        commande.save();
    }


}


//Payed and checked
router.route("/payed/:id").post(async (req, res) => {

    let commande = await Commande.findById(req.params.id)
    commande.status = "payed";
    if (commande.save()) res.json("updated")
    else res.status(404).send("nn")


})


/**  Restaurants plats et categories*/
router.route("/restaurants/:id").get(async (req, res) => {
    let id = req.params.id
    let livreur = await Livreur.findById(id)
    if (livreur) {
        Restaurant.find({ city: livreur.city })
            .then(restaurants => res.json(restaurants))
            .catch(() => res.json("error during operation"))


    }
})


//Display history of orders

router.route('/delivries/:id').get(async (req, res) => {
    let id = req.params.id
    Commande.find({ "livreur": id })
        .sort({ "date_commande": -1 })
        .then(commandes => res.json(commandes))
        .catch(err => res.status(404).json("error"))
})

//Display history of details orders

router.route('/delivries/details/:id').get(async (req, res) => {
    let id = req.params.id
    Lignescommande.find({ "commande": id })
        .populate("restaurant", "name")
        .populate("plat", "name")
        .then(lc => res.json(lc))
        .catch(err => res.status(404).json("error"))
})


module.exports = router
