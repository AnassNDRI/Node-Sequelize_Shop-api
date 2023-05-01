
  module.exports = (sequelize, DataTypes) => {
    return sequelize.define('AddressType', {
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
        type: DataTypes.TINYINT
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
}
