module.exports = function (sequelize, DataTypes) {
    // Define character
    const Character = sequelize.define("Character", {
        // id: {
        //     type: DataTypes.UUID,
        //     primaryKey: true,
        //     defaultValue: DataTypes.UUIDV4
        // },
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
            type: DataTypes.INTEGER,
        },
        losses: { 
            type: DataTypes.INTEGER,
        },
        hp: { 
            type: DataTypes.INTEGER,
        },
        atk: { 
            type: DataTypes.INTEGER,
        },
        def: { 
            type: DataTypes.INTEGER,
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