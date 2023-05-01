const { AdressType } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
  app.delete('/api/addressTypes/:id', auth, (req, res) => {
    AdressType.findByPk(req.params.id).then(addressType => {
      if(addressType === null) { // verifie si le type d'adresse existe
        const message = `Le type d'adresse demandé n'existe pas. Vous pouvez essayer un autre idendifiant.`
        return res.status(404).json({message}) 
      }
      const addressTypeDeleted = addressType;
      return AddressType.destroy({
        where: { id: addressType.id }
      })
      .then(_ => {
        const message = `Le type d'adresse avec l'identifiant n°${addressTypeDeleted.id} a bien été supprimé.`
        res.json({message, data: addressTypeDeleted })
      })
    })
    .catch(error => {   // en cas d'erreur
      const message = `Le type d'adresse n'a pas pu être supprimé. Ressayez SVP.`
      res.status(500).json({ message, data: error })
     })
  })
}
