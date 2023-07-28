const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Post extends Model {}

Post.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_text: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    },
    {
        sequelize,
        freezeTableName: true, 
        underscored: true, 
        modelName: 'post' 
    }
);


module.exports = Post;