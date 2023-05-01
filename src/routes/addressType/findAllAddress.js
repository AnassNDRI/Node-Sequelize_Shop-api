const addressTypes = require('../../db/mock-addressType')
const { AddressType } = require('../../db/sequelize')
const { Op } = require('sequelize') // Operateur de sequelize qui permet de faire recherche sql paramètrée
const auth = require('../../auth/auth')
  
module.exports = (app) => {
  app.get('/api/addressTypes', auth, (req, res) => {
                                                      
    //  ce bloc "if" permet de verifier si l'utilisateur souhaite la list ou faire une recherche filtrée
    if(req.query.addressName) { // ce code permet d'indiquer à express que l'on souhaite d'extrait le paramètre de recherche dans l'url
      const addressName = req.query.addressName
      const limit = parseInt(req.query.limit) || 5 // prend en priorité la limite du client sinon limit à 5

        if (addressName.length <2 ) {    // On oblige l'utilisateur à faire la  recherche avec au moins 2 lettres.
          const message = 'La recherche doit contenir au moins 2 caractères.'
          return res.status(400).json({ message })
        } 
        return AddressType.findAndCountAll({ // ====> findAndCountAll --> nombre limité de resultat et le nombre total si pas de limit
            where: { // SQL requête paramétrée
                addressName: { // ici ce "name" est la propriété du modèle pokémon
                [Op.like]: `%${addressName}%` // ici ce "name" est le critère de la recherche
              }
            },
            order:  [['addressName', 'DESC']],
            limit: limit, // cette "limit" est le nombre determiné au depart

        }) // se perpose sur la methode findAll de Sequelize pour faire des tris
        .then(({count, rows}) => { 
          const message = `Il n'y a ${count} produts qui correspond au terme de la recherche ${addressName}`
          res.json({ message, data: rows })
        })
    } else { 
      ///
    AddressType.findAll(({order:  [['addressName', 'DESC']] })) // Promesse // return une liste de addressTypes present dans la db trier par ordre alphabetique decroissante
    .then(addressTypes => {
      const message = `La liste des types d'adresse a bien été récupérée.`
      res.json({ message, data: addressTypes }) // return la reponse direcetement dans la methode res.json fourni par Express()
    })
    .catch(error => {   // en cas d'erreur
     const message = `La liste des types d'adresse n'a pas pu être récupérée. Ressayez dans quelque instants.`
     res.status(500).json({ message, data: error })
    })
    }
    
  })
}