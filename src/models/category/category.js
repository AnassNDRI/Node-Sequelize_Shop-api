
  module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Category', {
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
        type: DataTypes.TINYINT,
        allowNull: false
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
}

