const { Product } = require('../db/sequelize')
const auth = require('../auth/auth')
  
module.exports = (app) => {
  app.get('/api/products/:id', auth, (req, res) => {
    Product.findByPk(req.params.id)
      .then(product => {

        if(product === null) {
          const message = `Le product demandé n'existe pas. Vous pouvez essayer un autre idendifiant.`
          return res.status(404).json({message})
        }
        const message = `Un product a bien été trouvé.`
        res.json({ message, data: product })
      })
      .catch(error => {   // en cas d'erreur
        const message = `Le product n'a pas pu être récupéré. Ressayez dans quelque instants.`
        res.status(500).json({ message, data: error })
       })
  })
}