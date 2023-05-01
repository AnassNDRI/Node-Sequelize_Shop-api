const { Role } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
  app.get('/api/roles/:id',  (req, res) => {
    Role.findByPk(req.params.id)
      .then(role => {

        if(role === null) {
          const message = `Le role demandé n'existe pas. Vous pouvez essayer un autre idendifiant.`
          return res.status(404).json({message})
        }
        const message = `Un role a bien été trouvé.`
        res.json({ message, data: role })
      })
      .catch(error => {   // en cas d'erreur
        const message = `Le role n'a pas pu être récupéré. Ressayez dans quelque instants.`
        res.status(500).json({ message, data: error })
       })
  })
}