export default (sequelize, DataTypes) => {
    const Likes = sequelize.define('likes', {
        postId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
    });

    Likes.associate = (models) => {
        models.posts.hasMany(Likes);

        Likes.belongsTo(models.posts, {
            foreignKey: 'postId',
            onDelete: 'cascade',
        });

        models.users.hasMany(Likes);

        Likes.belongsTo(models.users, {
            foreignKey: 'userId',
            onDelete: 'cascade',
        });
    };

    return Likes;
};
