module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Tva', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      tvaPct: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      tvaDesign: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }