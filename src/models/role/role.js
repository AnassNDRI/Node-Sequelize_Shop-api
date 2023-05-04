// const User = require('../user/user')
// const Role = require('../../db/mock-role')

// module.exports = (sequelize, DataTypes) => {
//   const Role = sequelize.define('Role', {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     roleName: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     roleNameActif: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       defaultValue: true,
//     }
//   }, {
//     timestamps: true,
//     createdAt: 'created',
//     updatedAt: false
//   });

//   Role.hasMany(User, { foreignKey: 'roleId' });
//   User.belongsTo(Role, { foreignKey: 'roleId' });

//   return Role;
// }
