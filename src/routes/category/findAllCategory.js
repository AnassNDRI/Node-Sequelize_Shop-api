const categorys = require('../../db/mock-category')
const { Category } = require('../../db/sequelize')
const { Op } = require('sequelize') // Operateur de sequelize qui permet de faire recherche sql paramètrée
const auth = require('../../auth/auth')
  
module.exports = (app) => {
  app.get('/api/categorys/list', (req, res) => {
    
    //  ce bloc "if" permet de verifier si l'utilisateur souhaite la list ou faire une recherche filtrée
    if(req.query.categoryName) { // ce code permet d'indiquer à express que l'on souhaite d'extrait le paramètre de recherche dans l'url
      const categoryName = req.query.categoryName
      const limit = parseInt(req.query.limit) || 5 // prend en priorité la limite du client sinon limit à 5

        if (categoryName.length <2 ) {    // On oblige l'utilisateur à faire la  recherche avec au moins 2 lettres.
          const message = 'La recherche doit contenir au moins 2 caractères.'
          return res.status(400).json({ message })
        } 
        return Category.findAndCountAll({ // ====> findAndCountAll --> nombre limité de resultat et le nombre total si pas de limit
            where: { // SQL requête paramétrée
                categoryName: { // ici ce "name" est la propriété du modèle pokémon
                [Op.like]: `%${categoryName}%` // ici ce "name" est le critère de la recherche
              }
            },
            order:  [['categoryName', 'DESC']],
            limit: limit, // cette "limit" est le nombre determiné au depart

        }) // se perpose sur la methode findAll de Sequelize pour faire des tris
        .then(({count, rows}) => { 
          const message = `Il n'y a ${count} produts qui correspond au terme de la recherche ${categoryName}`
          res.json({ message, data: rows })
        })
    } else { 
      ///
    Category.findAll(({order:  [['categoryName', 'DESC']] })) // Promesse // return une liste de products present dans la db trier par ordre alphabetique decroissante
    .then(categorys => {
      const message = 'La liste des produits a bien été récupérée.'
      res.json({ message, data: categorys }) // return la reponse direcetement dans la methode res.json fourni par Express()
    })
    .catch(error => {   // en cas d'erreur
     const message = `La liste des produits n'a pas pu être récupérée. Ressayez dans quelque instants.`
     res.status(500).json({ message, data: error })
    })
    }
    
  })
}