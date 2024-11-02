const jwt = require("jsonwebtoken");
const { getUserGroup } = require("./user_handler");
const bcrypt = require("bcrypt");

const SECRET_KEY = "your_secret_key";
const REFRESH_SECRET_KEY = "your_refresh_secret_key";

exports.generateAccessToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    groups: getUserGroup(user.id),
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "15m" });
};
exports.generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, REFRESH_SECRET_KEY, { expiresIn: "7d" });
};

exports.generateCsrfToken = () => {
  return require("crypto").randomBytes(64).toString("hex");
};

exports.validateAccessToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
};

exports.validateRefreshToken = (token) => {};
