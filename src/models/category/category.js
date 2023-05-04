/*

const Product = require('../product/product')
const Category = require('../../db/mock-category')

module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      categoryName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      categoryActif: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })

    Category.hasMany(Product, { foreignKey: 'categoryId' })
    Product.belongsTo(Category, { foreignKey: 'categoryId' })

    return Category
}
*/