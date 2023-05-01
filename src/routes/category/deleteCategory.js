const { Category } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
  app.delete('/api/categorys/delete/:id', auth, (req, res) => {
    Category.findByPk(req.params.id).then(category => { 
      if(category === null) { // verifie si le category existe
        const message = `La categorie demandée n'existe pas. Vous pouvez essayer un autre idendifiant.`
        return res.status(404).json({message}) 
      }
      const categoryDeleted = category;
      return Category.destroy({
        where: { id: category.id }
      })
      .then(_ => {
        const message = `La categorie avec l'identifiant n°${categoryDeleted.id} a bien été supprimé.`
        res.json({message, data: categoryDeleted })
      })
    })
    .catch(error => {   // en cas d'erreur
      const message = `La categorie n'a pas pu être supprimé. Ressayez SVP.`
      res.status(500).json({ message, data: error })
     })
  })
}
