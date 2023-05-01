const { PaymentMethod } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
  app.delete('/api/paymentMethods/delete/:id', auth, (req, res) => { 
    PaymentMethod.findByPk(req.params.id).then(paymentMethod => {
      if(paymentMethod === null) { // verifie si le paymentMethod existe
        const message = `Le moyen de paiement demandé n'existe pas. Vous pouvez essayer un autre idendifiant.`
        return res.status(404).json({message}) 
      }
      const paymentMethodDeleted = paymentMethod;
      return PaymentMethod.destroy({
        where: { id: paymentMethod.id }
      })
      .then(_ => {
        const message = `Le moyen de paiement avec l'identifiant n°${paymentMethodDeleted.id} a bien été supprimé.`
        res.json({message, data: paymentMethodDeleted })
      })
    })
    .catch(error => {   // en cas d'erreur
      const message = `Le moyen de paiement n'a pas pu être supprimé. Ressayez SVP.`
      res.status(500).json({ message, data: error })
     })
  })
}
