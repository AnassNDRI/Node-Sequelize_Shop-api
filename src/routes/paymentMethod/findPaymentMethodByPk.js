const { PaymentMethod } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
  app.get('/api/paymentMethods/detail/:id', auth, (req, res) => {
    PaymentMethod.findByPk(req.params.id)
      .then(paymentMethod => {

        if(paymentMethod === null) {
          const message = `Le moyen de paiement demandé n'existe pas. Vous pouvez essayer un autre idendifiant.`
          return res.status(404).json({message})
        }
        const message = `Un moyen de paiement a bien été trouvé.`
        res.json({ message, data: paymentMethod })
      })
      .catch(error => {   // en cas d'erreur
        const message = `Le moyen de paiement n'a pas pu être récupéré. Ressayez dans quelque instants.`
        res.status(500).json({ message, data: error })
       })
  })
}