"use strict";

const { Favorite } = require("../models");

class Controller {
  static async getFavoriteCard(req, res, next) {
    try {
      let UserId = req.user.id;
      let data = await Favorite.findAll({
        where: { UserId },
      });

      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async addToFavorite(req, res, next) {
    try {
      let { name, imgUrl, Urls } = req.body;
      let userId = req.user.id;
      let favorite = await Favorite.create({
        name,
        imgUrl,
        urls:Urls,
        UserId: userId,
      });

      res.status(201).json({ favorite });
    } catch (error) {
      next(error);
    }
  }

  static async deleteFavorite(req, res, next) {
    try {
      let id = req.params.id;
      let favorite = await Favorite.destroy({ where: { id } });

      res.status(200).json({ message: "Favorite success to delete", favorite });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
