const { ValidationError, UniqueConstraintError } = require('sequelize')
const { Tva } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
  app.post('/api/tvas', auth, (req, res) => {
    Tva.create(req.body)
      .then(tva => {
        const message = `La tva ${req.body.tvaDesign} a bien été crée.`
        res.json({ message, data: tva })
      })
      .catch(error => {   // en cas d'erreur
        if(error instanceof ValidationError) {
          return  res.status(400).json({ message: error.message, data: error }) // va lever les msg d'erreur du validateur
        }
        if(error instanceof UniqueConstraintError) {
          return  res.status(400).json({ message: error.message, data: error }) // va lever les msg d'erreur du validateur
        }
        const message = `L'adresse n'a pas pu être ajoutée. Ressayez SVP.`
        res.status(500).json({ message, data: error })
       })
  })
}