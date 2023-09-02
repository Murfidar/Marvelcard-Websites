"use strict";

var jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function generateAccessToken(user) {
  const { id, email, isSubscribed, imgAvatar } = user;
  return jwt.sign(
    {
      id,
      email,
      isSubscribed,
      imgAvatar
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
}

function verifyAccessToken(access_token) {
  return jwt.verify(access_token, JWT_SECRET);
}

module.exports = { generateAccessToken, verifyAccessToken };
