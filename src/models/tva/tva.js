// const Product = require('../product/product');
// const Tva = require('../../db/mock-tva');

// module.exports = (sequelize, DataTypes) => {
//   const Tva = sequelize.define('Tva', {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     tvaPct: {
//       type: DataTypes.INTEGER,
//       allowNull: false
//     },
//     tvaDesign: {
//       type: DataTypes.STRING,
//       allowNull: false
//     }
//   }, {
//     timestamps: true,
//     createdAt: 'created',
//     updatedAt: false
//   });

//   Tva.hasMany(Product, { foreignKey: 'tvaId' });
//   Product.belongsTo(Tva, { foreignKey: 'tvaId' });

//   return Tva;
// };
