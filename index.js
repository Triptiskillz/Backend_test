var express = require("express");
const cookieParser = require("cookie-parser");
var app = express();
var passport = require("passport");
var LocalStrategy = require("passport-local");
var LocalCookie = require("passport-cookie");
var LocalJwt = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;

// var cors = require("cors");

var jwt = require("jsonwebtoken");
var jwt_key = "secretkey6864712";
const jwtExpiryTime = 900;

app.use(express.json());
app.use(cookieParser("achgj-446321"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS, PUT, POST, DELETE");
  // res.header("Access-Control-Expose-Headers", "Authorization");
  res.header("Access-Control-Expose-Headers", "X-Auth-Token");
  next();
});

app.use(passport.initialize());

var port = process.env.PORT || 2410;

app.listen(port, () => console.log(`Node app listening on port ${port}!`));

let params = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "jwtsecret4346445",
};
let { movies, seat, users } = require("./data.js");

app.get("/movies/:location", function (req, res) {
  let location = req.params.location;
  let lang = req.query.lang;
  let q = req.query.q;
  let genre = req.query.genre;
  let format = req.query.format;
  let newlang = [];

  let arr = movies.filter((e) => e.location == location);

  if (lang) {
    let langArr = lang.split(",");
    arr = arr.filter((e) => langArr.find((n) => n == e.language));
  }
  if (genre) {
    arr = arr.filter((e) => e.genre.find((l) => l == genre));
  }
  if (format) {
    arr = arr.filter((e) => e.format.find((l) => l == format));
  }
  if (q) {
    arr = arr.filter((e) => {
      if (e.language.toLowerCase().includes(q.toLowerCase())) {
        return e;
      }
      if (e.title.toLowerCase().includes(q.toLowerCase())) {
        return e;
      }
    });
  }
  // console.log(arr);
  res.send(arr);
});
app.get("/movies/:location/:id", function (req, res) {
  let id = req.params.id;
  let location = req.params.location;
  let arr = movies.filter((e) => e.location == location);
  arr = arr.find((e) => e.id == id);
  res.send(arr);
});

app.get("/seat/:id/:movieHall", function (req, res) {
  let id = req.params.id;
  let movieHall = req.params.movieHall;

  let arr = seat;

  arr = arr.filter((e) => e.movieid == id);
  arr = arr.filter((e) => e.movieHall == movieHall);

  res.send(arr);
});
app.post("/seat", function (req, res) {
  let body = req.body;
  seat.push(body);
  res.send(body);
});
// file pass

let strategy = new LocalJwt(params, function (token, done) {
  // console.log("In LocalJwt-all", token);
  let user = users.find((u) => u.id == token.id);
  // console.log("User", user);
  if (!user)
    return done(null, false, { message: "Incorrect username or password" });
  else return done(null, user);
});

passport.use("All", strategy);

app.post("/loginuser", function (req, res) {
  let { email } = req.body;
  let user = users.find((u) => u.email === email);

  if (user) {
    let payload = { id: user.id };
    let token = jwt.sign(payload, params.secretOrKey, {
      algorithm: "HS256",
      expiresIn: jwtExpiryTime,
    });
    res.send(token);
  } else res.sendStatus(401);
});

app.get(
  "/loginuser",
  passport.authenticate("All", { session: false }),
  function (req, res) {
    // console.log("In Get /user", req.user);
    res.send(req.user);
  }
);
app.get(
  "/booking",
  passport.authenticate("All", { session: false }),
  function (req, res) {
    let id = req.user.id;
    let arr = seat;
    arr = arr.filter((e) => e.userid == id);
    res.send(arr);
  }
);
app.put("/loginuser/:id", function (req, res) {
  let id = req.params.id;
  let body = req.body;
  let arr = users.findIndex((e) => e.id == id);
  // console.log(body)
  users[arr] = body;
  res.send(body);
});
