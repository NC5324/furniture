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
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    thumbnail: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.REAL(10, 2)
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
        type: DataTypes.INTEGER
    },
    level: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'category',
    timestamps: false
})

const Review = db.define('review', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(20)
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    author: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'review',
    createdAt: 'postedOn',
    updatedAt: false
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

Furniture.hasMany(Review)
Review.belongsTo(Furniture)

Furniture.belongsToMany(Category, {
    through: CategoryFurniture
})
Category.belongsToMany(Furniture, {
    through: CategoryFurniture
})

Furniture.sync()
Category.sync()
Review.sync()
CategoryFurniture.sync()


export { Furniture, Category, Review }
