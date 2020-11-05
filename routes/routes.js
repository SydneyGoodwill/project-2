const express = require("express");
const db = require("../models");
const passport = require("passport");
const router = express.Router();

router.get("/", checkAuthenticated, (req, res) => {
  res.render("index");
});

router.get("/explore", checkAuthenticated, (req, res) => {
  res.render("explore");
});

router.get("/games", checkAuthenticated, (req, res) => {
  res.render("games");
  db;
});

router.get("/games/snake", checkAuthenticated, (req, res) => {
  res.render("snake");
});

router.get("/register", async (req, res) => {
  const errors = await req.flash("error");
  res.render("register", {
    errors,
  });
});

router.post("/register", async (req, res) => {
  try {
    console.log("==========================");
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
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/login", checkNotAuthenticated, (req, res) => {
  const errors = req.flash("error");
  res.render("login", {
    errors,
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}

module.exports = router;
