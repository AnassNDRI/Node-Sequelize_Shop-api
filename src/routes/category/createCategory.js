const { ValidationError, UniqueConstraintError } = require('sequelize')
const { Category } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
  app.post('/api/categorys', auth, (req, res) => {
    Category.create(req.body)                            
      .then(category => {
        const message = `Le category ${req.body.categoryName} a bien été crée.`
        res.json({ message, data: category })
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