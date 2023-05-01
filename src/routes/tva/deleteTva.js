const { Tva } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
  app.delete('/api/tvas/delete/:id', auth, (req, res) => {
    Tva.findByPk(req.params.id).then(tva => {
      if(tva === null) { // verifie si le tva existe
        const message = `La tva demandée n'existe pas. Vous pouvez essayer un autre idendifiant.`
        return res.status(404).json({message}) 
      }
      const tvaDeleted = tva;
      return Tva.destroy({
        where: { id: tva.id }
      })
      .then(_ => {
        const message = `La tva avec l'identifiant n°${tvaDeleted.id} a bien été supprimée.`
        res.json({message, data: tvaDeleted })
      })
    })
    .catch(error => {   // en cas d'erreur
      const message = `La tva n'a pas pu être supprimée. Ressayez SVP.`
      res.status(500).json({ message, data: error })
     })
  })
}
