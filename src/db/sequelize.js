const { Sequelize, DataTypes } = require('sequelize') // affectation destructurée avec les {}
const ProductModel = require('../models/product')
const UserModel = require('../models/user/user')
const products = require('./mock-product')
const bcrypt = require ('bcrypt')

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
const Product = ProductModel(sequelize, DataTypes)  // instanciation de notre model product
const User = UserModel(sequelize, DataTypes)  // instanciation de notre model user

const initDb = () => {
    return sequelize.sync({force: true}).then(_ => {
        console.log('INIT DB')
        products.map(product => {
            Product.create({
                name: product.name,
                codeBarre: product.codeBarre,
                prize: product.prize,
                brand: product.brand,
                category: product.category,
                description: product.description,
                picture: product.picture,
            }).then(product => console.log(product.toJSON()))
        })

        // creation de notre utilisateur au demarrage de l'application
        // cryptage du mot du password
        bcrypt.hash('topsecret', 10)
            .then(hash => User.create({ username: 'topsecret', password: hash }))
            .then(user => console.log(user.toJSON()))

        console.log('La base de donnée a bien été initialisée !')
    })
}

module.exports = {
    initDb, Product, User
}