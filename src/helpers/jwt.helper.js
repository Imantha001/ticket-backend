const jwt = require("jsonwebtoken");
const { setJWT, getJWT } = require("./redis.helper");

const { storeUserRefreshJWT } = require("../model/users/user.model");
const { token } = require("morgan");



const crateAccessJWT = (payload) => {
  const accessJWT = jwt.sign({ payload }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "30d",
  });
  return Promise.resolve(accessJWT);
};


const crateRefreshJWT = async (email, _id) => {
  try {
    const refreshJWT = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    await storeUserRefreshJWT(_id, refreshJWT);


    return Promise.resolve(refreshJWT);
  } catch (error) {
    return Promise.reject(error);
  }};


  const verifyAccessJWT = (userJWT) => {
    try {
      return Promise.resolve(jwt.verify(userJWT, process.env.JWT_ACCESS_SECRET));
    } catch (error) {
      return Promise.resolve(error);
    }
  };


  const verifyRefreshJWT = (userJWT) => {
    try {
      return Promise.resolve(jwt.verify(userJWT, process.env.JWT_REFRESH_SECRET));
    } catch (error) {
      return Promise.resolve(error);
    }
  };




module.exports = {
  crateAccessJWT,
  crateRefreshJWT,
  verifyAccessJWT,
  verifyRefreshJWT,


};