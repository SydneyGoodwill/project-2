const express = require("express");
const db = require("../models");
const passport = require("passport");
const router = express.Router();
const axios = require("axios");

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
    const user = await db.User.findOne({
      where: { username: req.body.username },
    });
    const email = await db.User.findOne({ where: { email: req.body.email } });

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

router.post("/explore", async (req, res) => {
  try {
    const country = await req.body.searchcountry;
    const apiKey = process.env.APP_API_KEY_TRAVEL;
    console.log(country);
    const options = {
      method: "GET",
      url: "https://rapidapi.p.rapidapi.com/name/" + country,
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        res.render("explore", { news: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(country);
  } catch (err) {
    console.log(err);
  }
});

router.get("/gamesearch", (req, res) => {
  res.render("gamesearch");
});

router.post("/gamesearch", async (req, res) => {
  try {
    const game = await req.body.searchgame;
    const apiKey = process.env.APP_API_KEY_GAMES;
    console.log(game);
    const options = {
      method: "GET",
      url: "https://rapidapi.p.rapidapi.com/games/" + game,
      headers: {
        "x-rapidapi-key": apiKey,
        "x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data.name);
        console.log(response.data.description_raw);

        const card = `
                <div>
                <div class="col-sm-6" style="margin-top: 0.9%;">
                  <div class="card" style="opacity: 0.8;">
                    <div class="card-body">
                      <h5 class="card-title">Gamed Title:${response.data.name}</h5>
                      <p>Description: ${response.data.description_raw}</p>
                    </div>
                  </div>
                </div>
              </div>`;

        res.render.innerHTML = card;
        res.render("gamesearch", { card });
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(game);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/logout", (req, res) => {
  req.logout();
  res.redirect("login");
});

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
