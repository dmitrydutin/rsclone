export default (sequelize, DataTypes) => {
    const Messages = sequelize.define('messages', {
        dialogId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        text: {
            type: DataTypes.TEXT,
        },
        photo: {
            type: DataTypes.TEXT,
        },
    });

    Messages.associate = (models) => {
        models.dialogs.hasMany(Messages);

        Messages.belongsTo(models.dialogs, {
            foreignKey: 'dialogId',
            onDelete: 'cascade',
        });

        models.users.hasMany(Messages);

        Messages.belongsTo(models.users, {
            foreignKey: 'userId',
            onDelete: 'cascade',
        });
    };

    return Messages;
};
