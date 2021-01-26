export default (sequelize, DataTypes) => {
    const Roles = sequelize.define('roles', {
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Roles;
};
