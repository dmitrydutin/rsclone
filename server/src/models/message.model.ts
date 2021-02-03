export default (sequelize, DataTypes) => {
    const Messages = sequelize.define('messages', {
        dialogId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        text: {
            type: DataTypes.TEXT,
        },
        photo: {
            type: DataTypes.TEXT,
        },
        isUserMessage: {
            type: DataTypes.BOOLEAN
        }
    });

    Messages.associate = (models) => {
        models.dialogs.hasMany(Messages);

        Messages.belongsTo(models.dialogs, {
            foreignKey: 'dialogId',
            onDelete: 'cascade',
        });
    };

    return Messages;
};
