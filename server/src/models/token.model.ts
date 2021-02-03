export default (sequelize, DataTypes) => {
    const Tokens = sequelize.define('tokens', {
        token: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });

    Tokens.associate = (models) => {
        models.users.hasMany(Tokens);

        Tokens.belongsTo(models.users, {
            foreignKey: 'userId',
            onDelete: 'cascade',
        });
    };

    return Tokens;
};
