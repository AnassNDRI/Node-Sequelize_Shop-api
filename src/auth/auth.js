const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')
  
module.exports = (req, res, next) => {
  const authorizationHeader = req.headers.authorization // recuperation de l'entete HTTP  native ==> "authorization"
  
  if(!authorizationHeader) { // verification de la fourniture du jeton jwt, sinon message d'erreur
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`
    return res.status(401).json({ message })
  }
    
    const token = authorizationHeader.split(' ')[1] // recuperation du jeton fourni par l'utilisateur  
                                                         // split(' ')[1] ==> en enlevant le nom arbitraire Bearer<JWT> 
                                                         // pour avoir la valeur du jeton uniquement
    const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => { // ensuite verifiaction de la validité du jeton
    if(error) {
      const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`
      return res.status(401).json({ message, data: error })
    }
  
    const userId = decodedToken.userId  // verification si le jeton appartient bien à l'utilisateur
    if (req.body.userId && req.body.userId !== userId) {
      const message = `L'identifiant de l'utilisateur est invalide.`
      res.status(401).json({ message })
    } else {
      next()  // ==> on donne accès à l'utilisateur à la ressource
    }
  })
}