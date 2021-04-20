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
    name: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    tableName: 'category',
    timestamps: false
})

Furniture.sync()
Category.sync()

export { Furniture, Category }
