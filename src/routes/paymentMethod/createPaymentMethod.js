const { ValidationError, UniqueConstraintError } = require('sequelize')
const { PaymentMethod } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
  app.post('/api/paymentMethods', auth, (req, res) => {
    PaymentMethod.create(req.body) 
      .then(paymentMethod => {
        const message = `Le moyenn de paiement ${req.body.payMethodName} a bien été crée.`
        res.json({ message, data: paymentMethod })
      })
      .catch(error => {   // en cas d'erreur
        if(error instanceof ValidationError) {
          return  res.status(400).json({ message: error.message, data: error }) // va lever les msg d'erreur du validateur
        }
        if(error instanceof UniqueConstraintError) {
          return  res.status(400).json({ message: error.message, data: error }) // va lever les msg d'erreur du validateur
        }
        const message = `Le moyenn de paiement n'a pas pu être ajouté. Ressayez SVP.`
        res.status(500).json({ message, data: error })
       })
  })
}