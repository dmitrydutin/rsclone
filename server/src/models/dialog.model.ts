export default (sequelize, DataTypes) => {
    const Dialogs = sequelize.define('dialogs', {
        firstUserId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        secondUserId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
    });

    Dialogs.associate = (models) => {
        Dialogs.belongsTo(models.users, {
            foreignKey: 'firstUserId',
            onDelete: 'cascade',
        });

        Dialogs.belongsTo(models.users, {
            foreignKey: 'secondUserId',
            onDelete: 'cascade',
        });
    };

    return Dialogs;
};
