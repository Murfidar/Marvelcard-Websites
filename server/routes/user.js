"use strict";

const express = require("express");
const Controller = require("../controller/user");
const router = express.Router();

router.get("/", Controller.getUser);
router.post("/generate-payment-tokens", Controller.generatePaymentToken);
router.patch("/subscribed", Controller.subscribed);

module.exports = router;
