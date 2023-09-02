"use strict";

const { generateAccessToken } = require("../helpers/jwt");
const { User } = require("../models");


class Controller {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;

      let isSubscribed = false;
      let imgAvatar =
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.8t1WtYLAPVB189hu7pCP3gHaHa%26pid%3DApi&f=1&ipt=aad1c8668901acc7a03e53a0f6e23cee59bfd52f5e65a58d10d3531b1f7f712a&ipo=images";

      let user = await User.create({
        username,
        email,
        password,
        isSubscribed,
        imgAvatar,
      });

      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      let { email, password } = req.body;
      let user = await User.findOne({
        where: { email },
      });

      if (!user) throw { name: "NotFoundLoginDetais" };

      const isVerified = user.verifyPassword(password);

      if (!isVerified) throw { name: "Invalid Password" };

      const access_token = generateAccessToken(user);
      console.log(access_token);

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
