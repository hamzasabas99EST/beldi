
const express = require('express');
const cors = require('cors');
const app = express()
const mongoose = require('mongoose');
const Livreur = require("./models/livreur.model")
const Commande = require("./models/commande.model")
const geodist = require('geodist')
const moment = require('moment')




app.use(express.json());
app.use(cors());


//Connection avec base de données 

mongoose.connect('mongodb+srv://beldi:beldi@cluster0.arvwc.mongodb.net/beldi?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Mongo db is seccessfully");
})


const AdminRouter = require('./routes/admins');
app.use('/admins', AdminRouter);


const ClientRouter = require('./routes/clients');
app.use('/clients', ClientRouter);

const LivreurtRouter = require('./routes/livreurs');
app.use("/livreurs", LivreurtRouter)


/*const checkLivreurs = () => {
  Livreur.count()
    .exec(async (err, count) => {
      let random = Math.floor(Math.random() * count)
      var livreur = await Livreur.findOne().skip(random)
      if (livreur) {
        var nbr_commande = await Commande.count({ "livreur": livreur._id }).where("status").nin(['payed'])
          .where({
            'date_commande': {
              $gte: new Date(new Date().setHours(00, 00, 00)),
              $lte: new Date(new Date().setHours(23, 59, 59))
            },
          })
        if (nbr_commande == 3) {
          livreur.etat = "busy"
        } else livreur.etat = "free"
        livreur.save()

      }

    })


}*/

const affecterCommande = async () => {
  const today = moment().startOf('day')

  let commandes = await Commande.find()
  let random = Math.floor(Math.random() * commandes.length)
  let commande = await Commande.findOne({
    'date_commande': {
      $gte: today.toDate(),
      $lte: moment(today).endOf('day').toDate()
    },
    "status": "waiting"
  }).skip(random).populate("client", ["latitude", "longitude"])



  if (commande) {

    var { latitude, longitude } = await commande.client

    Livreur.count({ "etat": "free" })

      .exec(async (err, count) => {

        let random = Math.floor(Math.random() * count)
        let livreur = await Livreur.findOne().skip(random).where({ "etat": "free" })


        if (livreur.latitudeL) {

          let { latitudeL, longitudeL } = await livreur
          var dist = geodist({ latitude, longitude }, { latitudeL, longitudeL }, { unit: 'km', limit: 15 })

          if (dist) {
            livreur.etat = "busy"
            commande.livreur = livreur._id
            commande.status = "taken"
            livreur.save()
            commande.save()


          }
        } else console.log("no data")



      })

  }

}



setInterval(() => {
  //checkLivreurs()

  affecterCommande()




}, 2000)




const port = 9000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})