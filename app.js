// On recuper le package express dans notre code
const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

// On crée une instance d'une application express (il s'agit de notre peti serve web sur lequel
// va fonctionner notre API Rest)
const app = express()

// On defini une simple constance "port avec la valeur 3000" sur lequel va demmarrer notre API Rest
const port = 3000

// Combinaison des middlewares:
// (Nb: middle megan native de Express "npm install --save-dev" )
// ajoute une image à notre l'entete de notre url dans la barre de navigation
// un logger de url de nos requêtes
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

sequelize.initDb()

// Ici nos futures points de terminons

// const  findAllPokemons = require('./src/routes/findAllProducts')
// findAllProducts(app)
// ou =>
require('./src/routes/findAllProducts')(app)
require('./src/routes/createProduct')(app)
require('./src/routes/deleteProduct')(app)
require('./src/routes/findProductByPk')(app)
require('./src/routes/updateProduct')(app)
require('./src/routes/login')(app)


//La gestion des erreurs 404 => page non existante
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
    res.status(404).json({message})
})


// On demmare l'API Rest sur le port 3000 puis on affiche un message de confirmation
app.listen(port, () => console.log(`Anass votre application Node tourne bien sur: http://localhost:${port}`))
