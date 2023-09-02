"use strict";

const { User } = require("../models");
const midtransClient = require("midtrans-client");

class Controller {
  static async getUser(req, res, next) {
    try {
      let { id } = req.user;
      const user = await User.findByPk(id, {
        attributes: {exclude: ["password", "createdAt", "updatedAt"]},
      });

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async subscribed(req, res, next) {
    try {
      let { id } = req.user;
      let user = await User.findByPk(id);
      user = await user.update({ isSubscribed: true });

      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  }

  static async generatePaymentToken(req, res, next) {
    try {
      let { id, username, email } = req.user;

      const user = await User.findByPk(id, {
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      });

      
      if (user.isSubscribed) throw "already subscribed";

      let snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.midtrans_server_key,
      });

      let parameter = {
        transaction_details: {
          order_id:
            "Transaction-" + Math.floor(10000000 + Math.random() * 999999),
          gross_amount: 10000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          username: username,
          email: email,
        },
      };

      const token = await snap.createTransaction(parameter);

      res.status(200).json(token);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
