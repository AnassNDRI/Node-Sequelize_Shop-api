const { Role } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => { 
  app.delete('/api/roles/delete/:id', auth, (req, res) => {
    Role.findByPk(req.params.id).then(role => {
      if(role === null) { // verifie si le role existe
        const message = `Le role demandé n'existe pas. Vous pouvez essayer un autre idendifiant.`
        return res.status(404).json({message}) 
      }
      const roleDeleted = role;
      return Role.destroy({
        where: { id: role.id }
      })
      .then(_ => {
        const message = `Le role avec l'identifiant n°${roleDeleted.id} a bien été supprimé.`
        res.json({message, data: roleDeleted })
      })
    })
    .catch(error => {   // en cas d'erreur
      const message = `Le role n'a pas pu être supprimé. Ressayez SVP.`
      res.status(500).json({ message, data: error })
     })
  })
}
