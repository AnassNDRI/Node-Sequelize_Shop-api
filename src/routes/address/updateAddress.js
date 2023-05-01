const { Address } = require('../../db/sequelize')
const { ValidationError, UniqueConstraintError  } = require('sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
  app.put('/api/address/:id', auth, (req, res) => {
    const id = req.params.id
    Address.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Address.findByPk(id).then(address => { // return nous permet de supprimer la duplication de code
                                                   // au niveau du catch de "findyPK"
        if(address === null) {
          const message = `L'adresse demandée n'existe pas. Vous pouvez essayer un autre idendifiant.`
          return res.status(404).json({message}) // erreur au cas où l'utlisateur voudra modifier une adresse avec
          // un identifiant inexistant dans DB
        }
        const message = `L'adresse ${address.road} a bien été modifiée.`
        res.json({message, data: address })
      })
      // .catch(error => {   // en cas d'erreur                                  ===> remplacer par "return"
      //   const message = `L'adresse n'a pas pu être modifiée. Ressayez SVP.`
      //   res.status(500).json({ message, data: error })
      //  })
    })
    .catch(error => {   // en cas d'erreur
      if(error instanceof ValidationError) {
        return  res.status(400).json({ message: error.message, data: error }) // va lever les msg d'erreur du validateur
      }
      if(error instanceof UniqueConstraintError) {
        return  res.status(400).json({ message: error.message, data: error }) // va lever les msg d'erreur du validateur
      }
      const message = `L'adresse n'a pas pu être modifiée. Ressayez SVP.`
      res.status(500).json({ message, data: error })
     })
  })
  
}