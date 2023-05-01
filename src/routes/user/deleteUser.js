const { User } = require('../../db/sequelize')
const auth = require('../../auth/auth')
const user = require('../../models/user/user')
  
module.exports = (app) => {
  app.delete('/api/users/:id', auth, (req, res) => {
    User.findByPk(req.params.id).then(user => {
      if(user === null) { // verifie si l'utilisateur existe
        const message = `L'utilisateur demandé n'existe pas. Vous pouvez essayer un autre idendifiant.`
        return res.status(404).json({message}) 
      }
      const userDeleted = user;
      return User.destroy({
        where: { id: user.id }
      })
      .then(_ => {
        const message = `L'utilisateur avec l'identifiant n°${userDeleted.id} a bien été supprimé.`
        res.json({message, data: userDeleted })
      })
    })
    .catch(error => {   // en cas d'erreur
      const message = `L'utilisateur n'a pas pu être supprimé. Ressayez SVP.`
      res.status(500).json({ message, data: error })
     })
  })
}
