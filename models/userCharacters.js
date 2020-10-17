module.exports = function (sequelize, DataTypes) {
  const UserCharacters = sequelize.define(
    "UserCharacters",
    {
      user_id: DataTypes.INTEGER,
      character_id: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  );
  return UserCharacters;
};
