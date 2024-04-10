const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const News = sequelize.define('news', {
    headline: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lead: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageDescription: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
   body: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    //CategoryId
});

module.exports = News ;