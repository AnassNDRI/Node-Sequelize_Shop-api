module.exports = (sequelize, DataTypes) => {
    return sequelize.define('PaymentMethod', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      payMethodName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      payMethodActif: {
        type: DataTypes.TINYINT,
        allowNull: false
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }