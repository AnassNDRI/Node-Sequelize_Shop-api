const User = require("../../db/mock-user");
const Address = require("../address/address");
const Role = require("../role/role");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6, 80],
        },
      },
      dateBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
          isOldEnough: function (value) {
            const date18YearsAgo = new Date();
            date18YearsAgo.setFullYear(date18YearsAgo.getFullYear() - 18);
            if (new Date(value) > date18YearsAgo) {
              throw new Error("L'utilisateur doit avoir au moins 18 ans");
            }
          },
        },
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //   model: Role,
        //   key: "id",
        // },
      },
      userTel: {
        type: DataTypes.STRING(17),
        validate: {
          validatePhone: function(value) {
            if (!/^\+41\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/.test(value)) {
              throw new Error('Le numéro de téléphone doit être au format +41 xx xxx xx xx');
            }
          }
        }
      },      
      userActif: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: true
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );

//   User.belongsTo(Role, { foreignKey: "roleId" });
//   Role.hasMany(User, { foreignKey: "roleId" });

  return User;
};
