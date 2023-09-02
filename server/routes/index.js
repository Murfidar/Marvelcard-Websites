const express = require("express");
const router = express.Router();

const auth = require("./auth");
const content = require("./content");
const favorite = require("./favorite");
const user = require("./user");
const authenticate = require("../middlewares/auth.middleware");
const errorHandler = require("../middlewares/error.middleware");

router.use("/contents", content);

router.use("/", auth);
router.use(authenticate);
router.use("/users", user);
router.use("/favorites", favorite);
router.use(errorHandler);

module.exports = router;
