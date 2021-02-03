export default (sequelize, DataTypes) => {
    const Posts = sequelize.define('posts', {
        userId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        photo: {
            type: DataTypes.TEXT,
        },       
    });

    Posts.associate = (models) => {
        models.users.hasMany(Posts);

        Posts.belongsTo(models.users, {
            foreignKey: 'userId',
            onDelete: 'cascade',
        });
    };

    return Posts;
};
