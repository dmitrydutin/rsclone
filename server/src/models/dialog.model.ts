export default (sequelize, DataTypes) => {
    const Dialogs = sequelize.define('dialogs', {
        userId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
        friendUserId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
        },
    });

    Dialogs.associate = (models) => {
        models.users.hasMany(Dialogs);

        Dialogs.belongsTo(models.users, {
            foreignKey: 'userId',
            onDelete: 'cascade',
        });

        Dialogs.belongsTo(models.users, {
            foreignKey: 'friendUserId',
            onDelete: 'cascade',
        });
    };

    return Dialogs;
};
