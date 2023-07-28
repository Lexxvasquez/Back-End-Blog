const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [4],
    },
  },
},
{
  hooks:{
    async beforeCreate(userData){
      userData.password= await bcrypt.hash(userData.password, 10);
      return userData;
    },
    async afterUpdate(updatedUserData){
      updatedUserData.password= await bcrypt.hash(updatedUserData.password, 10);
      return updatedUserData;
}
  },
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored:true,
  modelName:"User"
});

model.exports=User;
