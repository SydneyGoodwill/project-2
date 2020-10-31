const express = require("express");
const db = require("../models");
const router = express.Router();
const passport = require("passport");

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

router.get("/register", (req, res) => {
  console.log(req.body);
  console.log(db.user);
  res.render("register");
});

router.post("/register", async (req, res) => {
  try {
    console.log("POST ", req.body);
    await db.User.create(req.body);
    res.redirect("/login");
  } catch (err) {
    res.status(500);
  }
});

router.get("/login", async (req, res) => {
  const errors = await req.flash("error");
  res.render("login", {
    errors,
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureFlash: true,
    failureRedirect: "/login",
  })
);

module.exports = router;
