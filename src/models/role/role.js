module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Role', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      roleName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      roleNameActif: {
        type: DataTypes.TINYINT,
        allowNull: false
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }

