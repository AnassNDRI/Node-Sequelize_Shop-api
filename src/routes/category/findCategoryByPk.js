const {Category } = require('../../db/sequelize')
const auth = require('../../auth/auth')
const categorys = require('../../models/category/category')
  
module.exports = (app) => {
  app.get('/api/categorys/detail:id', auth, (req, res) => {
    Category.findByPk(req.params.id)
      .then(category => {

        if(category === null) {
          const message = `La categorie demandée n'existe pas. Vous pouvez essayer un autre idendifiant.`
          return res.status(404).json({message})
        }
        const message = `Une categorie a bien été trouvée.`
        res.json({ message, data: category })
      })
      .catch(error => {   // en cas d'erreur
        const message = `La categorie n'a pas pu être récupérée. Ressayez dans quelque instants.`
        res.status(500).json({ message, data: error })
       })
  })
}