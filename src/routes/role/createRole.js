const { ValidationError, UniqueConstraintError } = require('sequelize')
const { Role } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
  app.post('/api/roles', auth, (req, res) => { 
    Role.create(req.body)
      .then(role => {
        const message = `Le role ${req.body.roleName} a bien été crée.`
        res.json({ message, data: role })
      })
      .catch(error => {   // en cas d'erreur
        if(error instanceof ValidationError) {
          return  res.status(400).json({ message: error.message, data: error }) // va lever les msg d'erreur du validateur
        }
        if(error instanceof UniqueConstraintError) {
          return  res.status(400).json({ message: error.message, data: error }) // va lever les msg d'erreur du validateur
        }
        const message = `Le n'a pas pu être ajouté. Ressayez SVP.`
        res.status(500).json({ message, data: error })
       })
  })
}