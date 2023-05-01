const paymentMethods = require('../../db/mock-paymenMethod')
const { PaymentMethod } = require('../../db/sequelize')
const { Op } = require('sequelize') // Operateur de sequelize qui permet de faire recherche sql paramètrée
const auth = require('../../auth/auth')
  
module.exports = (app) => {
  app.get('/api/paymentMethods/list', (req, res) => { 
    
    //  ce bloc "if" permet de verifier si l'utilisateur souhaite la list ou faire une recherche filtrée
    if(req.query.payMethodName) { // ce code permet d'indiquer à express que l'on souhaite d'extrait le paramètre de recherche dans l'url
      const payMethodName = req.query.payMethodName
      const limit = parseInt(req.query.limit) || 5 // prend en priorité la limite du client sinon limit à 5

        if (payMethodName.length <2 ) {    // On oblige l'utilisateur à faire la  recherche avec au moins 2 lettres.
          const message = 'La recherche doit contenir au moins 2 caractères.'
          return res.status(400).json({ message })
        } 
        return PaymentMethod.findAndCountAll({ // ====> findAndCountAll --> nombre limité de resultat et le nombre total si pas de limit
            where: { // SQL requête paramétrée
                payMethodName: { // ici ce "name" est la propriété du modèle pokémon
                [Op.like]: `%${payMethodName}%` // ici ce "name" est le critère de la recherche
              }
            },
            order:  [['payMethodName', 'DESC']],
            limit: limit, // cette "limit" est le nombre determiné au depart

        }) // se perpose sur la methode findAll de Sequelize pour faire des tris
        .then(({count, rows}) => { 
          const message = `Il n'y a ${count} moyens de paiement qui correspond au terme de la recherche ${payMethodName}`
          res.json({ message, data: rows })
        })
    } else { 
      ///
    PaymentMethod.findAll(({order:  [['payMethodName', 'DESC']] })) // Promesse // return une liste de paymentMethods present dans la db trier par ordre alphabetique decroissante
    .then(paymentMethods => {
      const message = 'La liste des moyens de paiement a bien été récupérée.'
      res.json({ message, data: paymentMethods }) // return la reponse direcetement dans la methode res.json fourni par Express()
    })
    .catch(error => {   // en cas d'erreur
     const message = `La liste des moyens de paiement n'a pas pu être récupérée. Ressayez dans quelque instants.`
     res.status(500).json({ message, data: error })
    })
    }
    
  })
}