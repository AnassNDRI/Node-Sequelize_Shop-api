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

// Ici nos points de terminons


//*************** Pour PRODUCT *************************************/
// const  findAllPokemons = require('./src/routes/findAllProducts')
// findAllProducts(app)
// ou =>
require('./src/routes/product/findAllProducts')(app)
require('./src/routes/product/createProduct')(app)
require('./src/routes/product/deleteProduct')(app)
require('./src/routes/product/findProductByPk')(app)
require('./src/routes/product/updateProduct')(app)
//*************** Pour LOGIN USER *************************************/
require('./src/routes/login')(app)
//*************** Pour USER *************************************/
require('./src/routes/user/findAllUser')(app)
require('./src/routes/user/createUser')(app)
require('./src/routes/user/deleteUser')(app)
require('./src/routes/user/findUserByPk')(app)
require('./src/routes/user/updateUser')(app)
//*************** Pour ADDRESSTYPE *************************************/
require('./src/routes/addressType/findAllAddressType')(app)
require('./src/routes/addressType/createAddressType')(app)
require('./src/routes/addressType/deleteAddressType')(app)
require('./src/routes/addressType/findAddressTypeByPk')(app)
require('./src/routes/addressType/updateAddressType')(app)
//*************** Pour ADDRESS *************************************/
require('./src/routes/address/findAllAddress')(app)
require('./src/routes/address/createAddress')(app)
require('./src/routes/address/deleteAddress')(app)
require('./src/routes/address/findAddressByPk')(app)
require('./src/routes/address/updateAddress')(app)
//*************** Pour CATEGORY *************************************/
require('./src/routes/category/findAllCategory')(app)
require('./src/routes/category/createCategory')(app)
require('./src/routes/category/deleteCategory')(app)
require('./src/routes/category/findCategoryByPk')(app)
require('./src/routes/category/updateCategory')(app)
//*************** Pour ROLE *************************************/
require('./src/routes/role/findAllRole')(app)
require('./src/routes/role/createRole')(app)
require('./src/routes/role/deleteRole')(app)
require('./src/routes/role/findRoleByPk')(app)
require('./src/routes/role/updateRole')(app)
//*************** Pour TVA *************************************/
require('./src/routes/tva/findAllTva')(app)
require('./src/routes/tva/createTva')(app)
require('./src/routes/tva/deleteTva')(app)
require('./src/routes/tva/findTvaByPk')(app)
require('./src/routes/tva/updateTva')(app)
//*************** Pour PAYMENTMETHOD *************************************/
require('./src/routes/paymentMethod/findAllPaymentMethod')(app)
require('./src/routes/paymentMethod/createPaymentMethod')(app)
require('./src/routes/paymentMethod/deletePaymentMethod')(app)
require('./src/routes/paymentMethod/findPaymentMethodByPk')(app)
require('./src/routes/paymentMethod/updatePaymentMethod')(app)



//La gestion des erreurs 404 => page non existante
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
    res.status(404).json({message})
})


// On demmare l'API Rest sur le port 3000 puis on affiche un message de confirmation
app.listen(port, () => console.log(`Anass votre application Node tourne bien sur: http://localhost:${port}`))
