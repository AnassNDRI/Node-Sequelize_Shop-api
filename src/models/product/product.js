const Category = require('../category/category');
const Tva = require('../tva/tva');

const valideBrand = ["Sumsung", "Iphone", "Bosh", "Siemens", "Sony", "Panasoanic",
                     "LG", "Acer", "HP", "Isus", "Lenovo", "Msi", "Toshiba", "DELL",
                     "Huawei", "Xiaomi", "Whirlpool"  ];

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
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
            validate : {
                isFloat: { msg: 'Utiliser uniquement des nombres entiers pour les prix.'},
                min: {
                    args: [0],
                    msg: `Le prix doit être supérieur ou égal à 0.`
                },
                max: {
                    args: [9999999],
                    msg: `Le prix doit être inférieur ou égal à 9999999.`
                },
                notNull: {msg: 'Le prix est une propriété requise.'}
            }
        },
        tvaId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // references: {
            // model: Tva,
            // key: 'id'
            // }
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isBrandValid(value) {
                    if(!value) {
                        throw new Error(`Un produit doit au moins avoir une marque.`);
                    }
                    value.split(',').forEach(brand => {
                        if(!valideBrand.includes(brand)) {
                            throw new Error(`La marque d'un produit doit appartenir à la liste suivante: ${valideBrand}`);
                        }
                    });
                }
            }
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        //     references: {
        //     model: Category,
        //     key: 'id'
        // }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate : {
                notEmpty: { msg: `La description d'un produit ne peut pas être vide`},
                notNull: {msg: `La description est une propriété requise.`}
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate : {
                notNull: {msg: `L'image est une propriété requise.`}
            }
        },
        productAcrif: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: true
        }
    }, {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    });

    // Tva.hasMany(Product, { foreignKey: 'tvaId' });
    // Product.belongsTo(Tva, { foreignKey: 'tvaId' });
    // Category.hasMany(Product, { foreignKey: 'categoryId' });
    // Product.belongsTo(Category, { foreignKey: 'categoryId' });

    return Product;
};
