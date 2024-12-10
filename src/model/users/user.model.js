const { UserSchema } = require("./user.schema");

const insertUser = (userObj) => {
  return new Promise((resolve, reject) => {
    UserSchema(userObj)
      .save()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

const getUserByEmail = async (email) => {
  if (!email) return false;
  try {
    const data = await UserSchema.findOne({ email }).exec();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  insertUser,
  getUserByEmail,
};