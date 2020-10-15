// Require models for linking with other models
module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define("User", {
        // id: {
        //     type: DataTypes.UUID,
        //     primaryKey: true,
        //     defaultValue: DataTypes.UUIDV4
        // },
        user_name: {
            type: DataTypes.STRING,
        },

    },
    {
        timestamps: false,
        underscored: true,
    });

    

    return User;
};