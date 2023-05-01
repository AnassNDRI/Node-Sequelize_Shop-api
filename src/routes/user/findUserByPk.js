const {  User } = require('../../db/sequelize')
const auth = require('../../auth/auth')
const user = require('../../models/user/user')
  
module.exports = (app) => { 
  app.get('/api/users/:id', auth, (req, res) => {  
    User.findByPk(req.params.id)
      .then(user => {

        if(user === null) {
          const message = `Le user demandé n'existe pas. Vous pouvez essayer un autre idendifiant.`
          return res.status(404).json({message})
        }
        const message = `Un user a bien été trouvé.`
        res.json({ message, data: user })
      })
      .catch(error => {   // en cas d'erreur
        const message = `Le user n'a pas pu être récupéré. Ressayez dans quelque instants.`
        res.status(500).json({ message, data: error })
       })
  })
}