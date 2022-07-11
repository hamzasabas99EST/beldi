const router = require('express').Router();
let Admin = require('../models/admin.model');
let Livreur = require('../models/livreur.model');
let Restaurant = require('../models/restaurant.model')
let Plat =require('../models/plat.model')
let Categorie =require('../models/categorie.model')
let Commande=require('../models/commande.model')
let Client=require('../models/client.model');
const Ligne_Commande = require('../models/ligne_commande.model');


router.route("/login").post(async (req, res) => {

    let username = req.body.username
    let pass = req.body.pass

    const admin = await Admin.find({ "username": username })

    if (admin) {

        if (admin.password == pass) res.status(200).send(admin._id)
        else res.status(404).send({ message: "mot de passe incorrecte" })

    } else res.status(404).send({ message: "Nom utilisateur introuvable" })

})

router.route("/addLivreur").post(async (req, res) => {

    let name = req.body.name
    let username = req.body.username
    let password = req.body.password

    let newLivreur = new Livreur({
        name,
        username,
        password
    })

    newLivreur.save()
        .then(() => res.json("Livreur bien ajouté"))
        .catch(err => res.status(404).json("ERROR " + err))

})

router.route("/deleteLivreur/:id").delete(async (req, res) => {

    let id = req.params.id

    Livreur.findByIdAndDelete(id)
        .then(() => res.json("Livreur deleted successfully"))
        .catch(err => res.status(404).send("Erruer " + err))

})


/*Gestion Restaurant **/

//add Restau
router.route("/addRestau").post(async (req, res) => {
    let name = req.body.name;
    let adresse = req.body.adresse;
    let tele = req.body.tele;
    let photo = req.body.photo;

    let newRestaurant = new Restaurant({
        name,
        adresse,
        tele,
        photo
    })

    newRestaurant.save()
    .then(()=>res.json("Restaurant added"))
    .catch(err=>res.status(404).json("Error during the operation"))

})


//add categorie 

//add plat to Restau
router.route("/addCategorie").post(async (req, res) => {

    let name = req.body.name;
    
    let newCategorie=new Categorie({
        name
    })

    newCategorie.save()
    .then(data=>res.json(data))
    .catch(()=>res.status(404).send("bad"))

})

router.route("/addPlat").post(async (req, res) => {
//add plat to Restau
    let name = req.body.name;
    let price=req.body.price
    let photo=req.body.photo
    let extra=req.body.extra
    let categorie=req.body.categorie
    let restaurant=req.body.restaurant

    let newPlat = new Plat({
        name,
        price,
        photo,
        extra,
        categorie,
        restaurant
    })

    newPlat.save()
    .then(()=>res.json("Plat added"))
    .catch(err=>res.status(404).json("Error during the operation"))

})





/*fin Gestion Restaurant **/

router.route("/getCommandes").get(async (req, res) => {

    Commande.find()
    .populate("livreur","name")
    .populate("client","name")
    .then(commandes=>res.json(commandes))
    .catch(err=>res.json(err))

})


router.route("/getCommandes/Details/:id").get(async (req, res) => {

    Ligne_Commande.findById(req.params.id)
    .populate("restaurant","name")
    .populate("plat","name")
    .then(lc=>res.json(lc))
    .catch(err=>res.json(err))

})








module.exports = router
