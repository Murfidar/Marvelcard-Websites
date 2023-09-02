const express = require("express");
const Controller = require("../controller/favorite");
const router = express.Router();

router.post("/character", Controller.addToFavorite);
router.get("/cards", Controller.getFavoriteCard);
router.delete("/cards/:id", Controller.deleteFavorite);

module.exports = router;
