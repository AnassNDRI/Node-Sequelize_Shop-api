const { AddressType } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
  app.get('/api/addressTypes/:id', auth, (req, res) => {
    AddressType.findByPk(req.params.id)
      .then(addressType => {

        if(addressType === null) {
          const message = `Le type d'adresse demandé n'existe pas. Vous pouvez essayer un autre idendifiant.`
          return res.status(404).json({message})
        }
        const message = `Un type d'adresse a bien été trouvé.`
        res.json({ message, data: addressType })
      })
      .catch(error => {   // en cas d'erreur
        const message = `Le type d'adresse n'a pas pu être récupéré. Ressayez dans quelque instants.`
        res.status(500).json({ message, data: error })
       })
  })
}