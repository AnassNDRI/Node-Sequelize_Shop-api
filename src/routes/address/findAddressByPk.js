const { Address } = require('../../db/sequelize')
const auth = require('../../auth/auth')
                                               
module.exports = (app) => {
  app.get('/api/address/:id', auth, (req, res) => {
    Address.findByPk(req.params.id)
      .then(address => {

        if(address === null) {
          const message = `L'adresse demandé n'existe pas. Vous pouvez essayer un autre idendifiant.`
          return res.status(404).json({message})
        }
        const message = `Une adresse a bien été trouvée.`
        res.json({ message, data: address })
      })
      .catch(error => {   // en cas d'erreur
        const message = `L'addresse n'a pas pu être récupérée. Ressayez dans quelque instants.`
        res.status(500).json({ message, data: error })
       })
  })
}