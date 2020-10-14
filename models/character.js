module.exports = function (sequelize, DataTypes) {
    const Character = sequelize.define("Character", {
        character_name: {
            type: DataTypes.STRING,
        },
        advantage: { 
            type: DataTypes.STRING,
        },
        avatar_image: { 
            type: DataTypes.STRING,
        },
        wins: { 
            type: DataTypes.NUMBER,
        },
        losses: { 
            type: DataTypes.NUMBER,
        }
    }, {timestamps: false}
    );
    return Character;
};