const { ValidationError, UniqueConstraintError } = require('sequelize')
const { AddressType } = require('../../db/sequelize')
const auth = require('../../auth/auth')
                                 
module.exports = (app) => {
  app.post('/api/addressTypes', auth, (req, res) => {
    AddressType.create(req.body)
      .then(addressType => {
        const message = `Le type d'adresse ${req.body.addressName} a bien été crée.`
        res.json({ message, data: addressType })
      })
      .catch(error => {   // en cas d'erreur
        if(error instanceof ValidationError) {
          return  res.status(400).json({ message: error.message, data: error }) // va lever les msg d'erreur du validateur
        }
        if(error instanceof UniqueConstraintError) {
          return  res.status(400).json({ message: error.message, data: error }) // va lever les msg d'erreur du validateur
        }
        const message = `Le type d'adresse n'a pas pu être ajouté. Ressayez SVP.`
        res.status(500).json({ message, data: error })
       })
  })
}