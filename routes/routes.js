const express = require("express");
const db = require("../models")
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/register", (req, res) => {
  res.render("register");
});

// router.post("/resgister")

module.exports = router;
