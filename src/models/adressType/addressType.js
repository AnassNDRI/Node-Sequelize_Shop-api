/*
const Address = require('../address/address')
const AddressType = require('../../db/mock-addressType')

module.exports = (sequelize, DataTypes) => {
    const AddressType = sequelize.define('AddressType', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      addressName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      addressActif: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })

    AddressType.hasMany(Address, { foreignKey: 'addressTypeId' })
    Address.belongsTo(AddressType, { foreignKey: 'addressTypeId' })

    return AddressType
}

*/