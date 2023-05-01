module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Address', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {     /////////////////////
        type: DataTypes.INTEGER,
        allowNull: false
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
        allowNull: false
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
      }
      
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }
