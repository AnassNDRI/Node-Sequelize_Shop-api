const { Address } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {  
  app.delete('/api/address/:id', auth, (req, res) => {
    Address.findByPk(req.params.id).then(address => {
      if(address === null) { // verifie si l'adresse existe
        const message = `L'adresse demandée n'existe pas. Vous pouvez essayer un autre idendifiant.`
        return res.status(404).json({message}) 
      }
      const addressDeleted = address;
      return Address.destroy({
        where: { id: address.id }
      })
      .then(_ => {
        const message = `L'adresse avec l'identifiant n°${addressDeleted.id} a bien été supprimée.`
        res.json({message, data: addressDeleted })
      })
    })
    .catch(error => {   // en cas d'erreur
      const message = `L'adresse n'a pas pu être supprimée. Ressayez SVP.`
      res.status(500).json({ message, data: error })
     })
  })
}
