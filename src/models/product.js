

const valideBrand = ["Sumsung", "Iphone", "Bosh", "Siemens", "Sony", "Panasoanic",
                     "LG", "Acer", "HP", "Isus", "Lenovo", "Msi", "Toshiba", "DELL",
                     "Huawei", "Xiaomi", "Whirlpool"  ]

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate : {
                notEmpty: { msg: `Le nom d'un produit ne peut pas être vide`},
                notNull: {msg: `Le nom est une propriété requise.`}
            }
        },
        codeBarre: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: {      // CONTRAINTE
                msg: `Ce code barre est déjà pris.`
            },

            validate : { // VALIDATEURS natifs de Sequelize
                isInt: { msg: 'Utiliser uniquement des nombres entiers pour le code barre.'},
                min: {
                    args: [1],
                    msg: `Le code barre doit être supperieur ou égales  à 1.`
                },
                max: {
                    args: [999999999999],
                    msg: `Le code barre doit être inferieurs ou égales à à  999 999 999 999.`
                },
                notNull: {msg: 'Le code barre est une propriété requise.'},
            }
        },
        prize: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate : { // VALIDATEURS natifs de Sequelize
                isFloat: { msg: 'Utiliser uniquement des nombres entiers pour les prix.'},
                min: {
                    args: [0],
                    msg: `Le prix doit être supperieur ou égale à 0.`
                },
                max: {
                    args: [9999999],
                    msg: `Le prix doit être inferieur ou égale  à 9999999.`
                },
                notNull: {msg: 'Le prix est une propriété requise.'}
            }
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false,

                validate: { // VALIDATEURS PERSONNALISES
                isBrandValid(value) {
                    // pas de value null
                    if(!value) {
                        throw new Error( (`Un Produit doit au moins avoir une marque.`)); // permet de lever une erruer dans le perimètre
                    }
                    /* 1 marque maximum
                    if(value.length > 1) {
                        throw new Error( (`Un produit ne peut pas avoir plus de deux (02) marques.`));
                    }
                     */

                    // ittérer sur le tableau validBrand pour comparer la marque saisie par l'utlisateur
                    value.split(',').forEach(brand => {
                        if(!valideBrand.includes(brand)) {
                            throw new Error( (`La marque d'un produi doit appartenir à la liste suivante: ${valideBrand}`));
                        }
                    });

                }
            }
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate : {
                notEmpty: { msg: `La categorie d'un produit ne peut pas être vide`},
                notNull: {msg: `Lea categorie est une propriété requise.`}
            }
        },

        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate : {
                notEmpty: { msg: `La description d'un produit ne peut pas être vide`},
                notNull: {msg: `Le description est une propriété requise.`}
            }
        },

        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate : { // VALIDATEURS natifs de Sequelize
                //isUrl: { msg: `Utiliser uniquement une URL valide pour l'image`},
                notNull: {msg: `L'image est une propriété requise.`}
            }
        },


    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}

