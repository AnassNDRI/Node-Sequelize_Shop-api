 /* const Address = require('../../db/mock-address')
const AddressType = require('../adressType/addressType')
const User = require('../user/user')

module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define('Address', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: 'id'
        }
      },
      road: {
        type: DataTypes.STRING,
        allowNull: false
      },
      number: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      box: {
        type: DataTypes.STRING,
        allowNull: true
      },
      npa: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false
      },
      addressTypeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: AddressType,
          key: 'id'
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })

    Address.belongsTo(AddressType, { foreignKey: 'addressTypeId' })
    AddressType.hasMany(Address, { foreignKey: 'addressTypeId' })
    Address.belongsTo(User, { foreignKey: 'userId' })
    User.hasMany(Address, { foreignKey: 'userId' })

    return Address
  }
*/