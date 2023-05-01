const tvas = require('../../db/mock-tva')
const { Tva } = require('../../db/sequelize')
const { Op } = require('sequelize') // Operateur de sequelize qui permet de faire recherche sql paramètrée
const auth = require('../../auth/auth')
  
module.exports = (app) => {
  app.get('/api/tvas/list', (req, res) => {
    
    //  ce bloc "if" permet de verifier si l'utilisateur souhaite la list ou faire une recherche filtrée
    if(req.query.tvaDesign) { // ce code permet d'indiquer à express que l'on souhaite d'extrait le paramètre de recherche dans l'url
      const tvaDesign = req.query.tvaDesign
      const limit = parseInt(req.query.limit) || 5 // prend en priorité la limite du client sinon limit à 5

        if (tvaDesign.length <2 ) {    // On oblige l'utilisateur à faire la  recherche avec au moins 2 lettres.
          const message = 'La recherche doit contenir au moins 2 caractères.'
          return res.status(400).json({ message })
        } 
        return Tva.findAndCountAll({ // ====> findAndCountAll --> nombre limité de resultat et le nombre total si pas de limit
            where: { // SQL requête paramétrée
                tvaDesign: { // ici ce "name" est la propriété du modèle pokémon
                [Op.like]: `%${tvaDesign}%` // ici ce "name" est le critère de la recherche
              }
            },
            order:  [['tvaDesign', 'DESC']],
            limit: limit, // cette "limit" est le nombre determiné au depart

        }) // se perpose sur la methode findAll de Sequelize pour faire des tris
        .then(({count, rows}) => { 
          const message = `Il n'y a ${count} produts qui correspond au terme de la recherche ${tvaDesign}`
          res.json({ message, data: rows })
        })
    } else { 
      ///
    Tva.findAll(({order:  [['tvaDesign', 'DESC']] })) // Promesse // return une liste de tvas present dans la db trier par ordre alphabetique decroissante
    .then(tvas => {
      const message = 'La liste des tvas a bien été récupérée.'
      res.json({ message, data: tvas }) // return la reponse direcetement dans la methode res.json fourni par Express()
    })
    .catch(error => {   // en cas d'erreur
     const message = `La liste des tvas n'a pas pu être récupérée. Ressayez dans quelque instants.`
     res.status(500).json({ message, data: error })
    })
    }
    
  })
}