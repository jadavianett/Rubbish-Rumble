module.exports = function (sequelize, DataTypes) {
    // Define character
    const Character = sequelize.define("Character", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
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
        },
        hp: { 
            type: DataTypes.NUMBER,
        },
        atk: { 
            type: DataTypes.NUMBER,
        },
        def: { 
            type: DataTypes.NUMBER,
        }
    }, {
        timestamps: false,
        underscored: true
    }
    );

    Character.associate = function (models) {
        Character.belongsTo(models.User, {
          through: "UserCharacters",
          foreignKey: "user_id",
        });
    };

    return Character;
};