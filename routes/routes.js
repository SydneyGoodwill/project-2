const express = require("express");
const db = require("../models");
const bcrypt = require("bcrypt");
const router = express.Router();
const passport = require("passport");
const { request } = require("express");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/profile", (req, res) => {
  res.render("profile");
});

router.get("/games", (req, res) => {
  res.render("games");
  db;
});

router.get("/register", async (req, res) => {
  const errors = await req.flash("error");
  res.render("register", {
    errors,
  });
});

router.get("/games/snake", (req, res) => {
  res.render("snake");
});

router.post("/register", async (req, res) => {
  try {
    console.log("POST ", req.body);
    const user = await db.User.findOne({
      where: { username: req.body.username },
    });
    const email = await db.User.findOne({ where: { email: req.body.email } });
    console.log(user);
    console.log(email);

    if (user) {
      req.flash("error", "that username already exists");
      return res.redirect("/register");
    }
    if (email) {
      req.flash("error", "that email is already registered");
      return res.redirect("/register");
    }
    await db.User.create(req.body);
    res.redirect("/login");
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/login", (req, res) => {
  const errors = req.flash("error");
  res.render("login", {
    errors,
  });
});

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await db.User.findOne({ where: { email: email } });
    if (user !== null) {
      const encryptedPassword = user.password;
      bcrypt.compare(password, encryptedPassword, (err, result) => {
        if (result) {
          res.redirect("/");
        } else {
          req.flash("error", "Email or password is incorrect");
          res.redirect("/login");
        }
      });
    } else {
      req.flash("error", "Email does not exist, please register");
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
