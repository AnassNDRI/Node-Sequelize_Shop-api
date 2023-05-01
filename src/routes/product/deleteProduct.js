const { Product } = require('../../db/sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
  app.delete('/api/products/delete/:id', auth, (req, res) => {
    Product.findByPk(req.params.id).then(product => {
      if(product === null) { // verifie si le product existe
        const message = `Le product demandé n'existe pas. Vous pouvez essayer un autre idendifiant.`
        return res.status(404).json({message}) 
      }
      const productDeleted = product;
      return Product.destroy({
        where: { id: product.id }
      })
      .then(_ => {
        const message = `Le product avec l'identifiant n°${productDeleted.id} a bien été supprimé.`
        res.json({message, data: productDeleted })
      })
    })
    .catch(error => {   // en cas d'erreur
      const message = `Le product n'a pas pu être supprimé. Ressayez SVP.`
      res.status(500).json({ message, data: error })
     })
  })
}
