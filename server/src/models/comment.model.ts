export default (sequelize, DataTypes) => {
    const Comments = sequelize.define('comments', {
        postId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    });

    Comments.associate = (models) => {
        models.posts.hasMany(Comments);

        Comments.belongsTo(models.posts, {
            foreignKey: 'postId',
            onDelete: 'cascade',
        });

        models.users.hasMany(Comments);

        Comments.belongsTo(models.users, {
            foreignKey: 'userId',
            onDelete: 'cascade',
        });
    };

    return Comments;
};
