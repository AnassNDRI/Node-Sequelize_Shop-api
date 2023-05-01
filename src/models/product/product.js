

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
        tvaProduct: {
            type: DataTypes.INTEGER,
           /* allowNull: false,
            validate : {
                notEmpty: { msg: `Le nom d'un produit ne peut pas être vide`},
                notNull: {msg: `Le nom est une propriété requise.`}
            }  */
            Reference : {
                model: 'Tvas',
                key: 'id'
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
            type: DataTypes.INTEGER,
            Reference : {
                model: 'Categorys',
                key: 'id'
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
        productAcrif: {
            type: DataTypes.TINYINT,
        },


    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    })
}

