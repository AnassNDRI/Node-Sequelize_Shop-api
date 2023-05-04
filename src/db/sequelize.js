const { Sequelize, DataTypes } = require('sequelize') // affectation destructurée avec les {}
const bcrypt = require ('bcrypt')

const ProductModel = require('../models/product/product')
// const AddressTypeModel = require('../models/adressType/addressType')
// const AddressModel = require('../models/address/address')
const UserModel = require('../models/user/user')
// const CategoryModel = require('../models/category/category')
// const PaymentMethodModel = require('../models/paymentMethod/paymentMethod')
// const RoleModel = require('../models/role/role')
// const TvaModel = require('../models/tva/tva')

const products = require('./mock-product')
const users = require('./mock-user')
// const users = require ('./mock-user')
// const addressTypes = require('./mock-addressType')
// const address = require('./mock-address')
// const categorys = require ('./mock-category')
// const tvas = require ('./mock-tva')
// const roles = require ('./mock-role')
// const paymentMethods = require ('./mock-paymenMethod')


// connexion a la base de données
const sequelize = new Sequelize('myshoparound', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
        timezone: 'Etc/GMT-2',
    },
    logging: false
})

// synchronisation entre nos models et sequelize
const Product = ProductModel(sequelize, DataTypes)                     // instanciation de notre model product
const User = UserModel(sequelize, DataTypes)                          // instanciation de notre model user
// const Category = CategoryModel(sequelize, DataTypes)                 // instanciation de notre model category
// const Address = AddressModel(sequelize, DataTypes)                  // instanciation de notre model address
// const AddressType = AddressTypeModel(sequelize, DataTypes)         // instanciation de notre model addressType
// const Role = RoleModel(sequelize, DataTypes)                      // instanciation de notre model role
// const Tva = TvaModel(sequelize, DataTypes)                       // instanciation de notre model tva
// const PaymentMethod = PaymentMethodModel(sequelize, DataTypes)  // instanciation de notre model paymentMethod

const initDb = () => {
    return sequelize.sync({force: true}).then(_ => {
        console.log('INIT DB')
        products.map(product => {
            Product.create({
                name: product.name,
                prize: product.prize,
                tvaId: product.tvaId,
                brand: product.brand,
                categoryId: product.categoryId,
                description: product.description,
                picture: product.picture,
                productAcrif: product.productAcrif
            }).then(product => console.log(product.toJSON()))
        });

        // creation de notre utilisateur au demarrage de l'application
        // cryptage du mot du password
        users.map(user => {
            bcrypt.hash('topsecret', 10)
            .then( hash =>  User.create({
                username: user.username,
                firstname: user.firstname,
                email: user.email,
                password: hash,
                dateBirth: user.dateBirth,
                roleId: user.roleId,
                userTel: user.userTel,
                userActif: user.userActif  
            })).then(user => console.log(user.toJSON()))  
        });

        console.log('La base de donnée a bien été initialisée !')
    })
}

module.exports = {
    initDb, Product, User, //Category, Address, Tva, AddressType, Role, PaymentMethod
}