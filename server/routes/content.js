const express = require("express");
const Controller = require("../controller/content");
const router = express.Router();

router.get("/characters", Controller.getCharacters);
router.get("/comics", Controller.getComics);
router.get("/series", Controller.getSeries);

module.exports = router;
