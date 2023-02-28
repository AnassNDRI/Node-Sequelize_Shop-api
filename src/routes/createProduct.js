const { ValidationError, UniqueConstraintError } = require('sequelize')
const { Product } = require('../db/sequelize')
const auth = require('../auth/auth')
  
module.exports = (app) => {
  app.post('/api/products', auth, (req, res) => {
    Product.create(req.body)
      .then(product => {
        const message = `Le product ${req.body.name} a bien été crée.`
        res.json({ message, data: product })
      })
      .catch(error => {   // en cas d'erreur
        if(error instanceof ValidationError) {
          return  res.status(400).json({ message: error.message, data: error }) // va lever les msg d'erreur du validateur
        }
        if(error instanceof UniqueConstraintError) {
          return  res.status(400).json({ message: error.message, data: error }) // va lever les msg d'erreur du validateur
        }
        const message = `Le poroduct n'a pas pu être ajouté. Ressayez SVP.`
        res.status(500).json({ message, data: error })
       })
  })
}