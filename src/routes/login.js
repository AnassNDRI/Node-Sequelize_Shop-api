const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')
  
module.exports = (app) => {
  app.post('/api/login', (req, res) => {
  
    User.findOne({ where: { email: req.body.email } }).then(user => {

      if(!user) {                           // verifiacation de l'existance de l'utilisateur dans la BD          
        const message = `L'utilisateur n'existe pas. `
        return res.status(400).json({message})
      }

      bcrypt.compare(req.body.password, user.password).then(isPasswordValid => { // Traitement asynchrone retourné par la methode "Compare"
        if(!isPasswordValid) { // verification de l'INVALIDITE des identifiants et mot de passe érronés
          const message = `Le mot de passe ou l'identfiant est incorrect `;
          return res.status(401).json({message}) // 401 => existe mais  pas droit d'accession
        }

        // Mise en place du jwt
        const token = jwt.sign( // instruction importante ==> génération du module jwt avec la methode sign
          { userId: user.id},   // ==> identifiants de l'utilisatuer
          privateKey,           // ==> La clef secréte
          { expiresIn: '24h' }  // ==> Durée de validité
        )

        const message = `L'utilisateur a été connecté avec succès`;
        return res.json({ message, data: user, token }) // retourne message de succès avec les données plus un "TOKEN"
      })
    })
    .catch(error => {               // echec d'appel reseau
      const message = `L'utilisateur n'a pu être connecté. Ressayer dans un instant.`;
        return res.json({ message, data: error })
    })
  })
}