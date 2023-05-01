const { PaymentMethod } = require('../../db/sequelize')
const { ValidationError, UniqueConstraintError  } = require('sequelize')
const auth = require('../../auth/auth')
  
module.exports = (app) => {
  app.put('/api/paymentMethods/:id', auth, (req, res) => {
    const id = req.params.id
    PaymentMethod.update(req.body, {
      where: { id: id } 
    })
    .then(_ => {
      return PaymentMethod.findByPk(id).then(paymentMethod => { // return nous permet de supprimer la duplication de code
                                                   // au niveau du catch de "findyPK"
        if(paymentMethod === null) {
          const message = `Le poroduct demandé n'existe pas. Vous pouvez essayer un autre idendifiant.`
          return res.status(404).json({message}) // erreur au cas où l'utlisateur voudra modifier un paymentMethod avec
          // un identifiant inexistant dans DB
        }
        const message = `Le moyen de paiemnt ${paymentMethod.payMethodName} a bien été modifié.`
        res.json({message, data: paymentMethod })
      })
      // .catch(error => {   // en cas d'erreur                                  ===> remplacer par "return"
      //   const message = `Le paymentMethod n'a pas pu être modifié. Ressayez SVP.`
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
      const message = `Le moyen de paiement n'a pas pu être modifié. Ressayez SVP.`
      res.status(500).json({ message, data: error })
     })
  })
  
}