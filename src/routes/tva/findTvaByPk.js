const { Tva } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
  app.get('/api/tvas/detail/:id', auth, (req, res) => {
    Tva.findByPk(req.params.id)
      .then(tva => {

        if(tva === null) {
          const message = `La tva demandé n'existe pas. Vous pouvez essayer un autre idendifiant.`
          return res.status(404).json({message})
        }
        const message = `Une tva a bien été trouvé.`
        res.json({ message, data: tva })
      })
      .catch(error => {   // en cas d'erreur
        const message = `La tva n'a pas pu être récupéré. Ressayez dans quelque instants.`
        res.status(500).json({ message, data: error })
       })
  })
}