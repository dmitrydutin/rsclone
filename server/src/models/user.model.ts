export default (sequelize, DataTypes) => {
    const Users = sequelize.define('users', {
        login: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true,
        },
        passwordHash: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        roleId: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: 1,
        },
        name: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        quote: {
            type: DataTypes.TEXT,
        },
        avatar: {
            type: DataTypes.TEXT,
        },
        city: {
            type: DataTypes.STRING(150),
        },
    });

    Users.associate = (models) => {
        models.roles.hasMany(Users);

        Users.belongsTo(models.roles, {
            foreignKey: 'roleId',
            onDelete: 'cascade',
        });
    };

    return Users;
};
