module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            unique: {      // CONTRAINTE
                msg: `Ce nom est déjà pris.`
            }
            // validate : {
            //   notEmpty: { msg: `Le nom ne peut pas être vide`},
            //   notNull: {msg: `Le nom est une propriété requise.`}
            // }
        },
        password: {
            type: DataTypes.STRING,

        }
    })
}
