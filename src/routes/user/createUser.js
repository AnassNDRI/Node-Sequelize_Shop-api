const { ValidationError, UniqueConstraintError } = require('sequelize')
const { User } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
  app.post('/api/users', auth, (req, res) => {
    User.create(req.body)
      .then(user => {
        const message = `L'utilisateur ${req.body.name} a bien été crée.`
        res.json({ message, data: user })
      })
      .catch(error => {   // en cas d'erreur
        if(error instanceof ValidationError) {
          return  res.status(400).json({ message: error.message, data: error }) // va lever les msg d'erreur du validateur
        }
        if(error instanceof UniqueConstraintError) {
          return  res.status(400).json({ message: error.message, data: error }) // va lever les msg d'erreur du validateur
        }
        const message = `L'utilisateur n'a pas pu être ajouté. Ressayez SVP.`
        res.status(500).json({ message, data: error })
       })
  })
}