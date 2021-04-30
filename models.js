import { DataTypes } from 'sequelize'
import db from './connection'

const Furniture = db.define('furniture', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    thumbnail: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price: {
        type: DataTypes.REAL(10, 2),
        allowNull: true
    }
}, {
    tableName: 'furniture',
    timestamps: false
})

const Category = db.define('category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    level: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'category',
    timestamps: false
})

const CategoryFurniture = db.define('CategoryFurniture', {
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Category,
            key: 'id'
        },
        field: 'category_id'
    },
    furnitureId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Furniture,
            key: 'id'
        },
        field: 'furniture_id'
    }
}, {
    tableName: 'category_furniture',
    timestamps: false
})

Furniture.belongsToMany(Category, {
    through: CategoryFurniture
})
Category.belongsToMany(Furniture, {
    through: CategoryFurniture
})

Furniture.sync({
    alter: true
})
Category.sync()
CategoryFurniture.sync()


export { Furniture, Category }
