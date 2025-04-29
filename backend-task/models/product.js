const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    stock:{
        type: DataTypes.INTEGER,
        allowNull: true, 
    }
});

module.exports = Product;
