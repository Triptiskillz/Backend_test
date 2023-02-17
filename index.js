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
const jwtExpiryTime = 300;

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
let { mobiles, users } = require("./data.js");



app.get("/deals", function (req, res) {
let newarr=[]
  let arr = mobiles;
  arr = arr.slice(1, 14).map((item, i) => {
    return item
  });
  res.send(arr);
});

app.get("/home/:category/:brand", function (req, res) {
  let category = req.params.category;
  let brand = req.params.brand;
  let arr = mobiles;

  let q = req.query.q;
  let ram = req.query.ram;
  let assured = req.query.assured;
  let rating = req.query.rating;
  let price = req.query.price;
  let sort = req.query.sort;

  arr = arr.filter((e) => e.category == category);
  arr = arr.filter((e) => e.brand == brand);

  if (ram) {
    let ramArr = ram.split(",");
    arr = arr.filter((e) => ramArr.find((n) => n.slice(-1) == e.ram));
  }
  if (rating) {
    let ratingArr = rating.split(",");
    arr = arr.filter((e) => ratingArr.find((n) => +n < +e.rating));
    // console.log(rating)
  }
  if (price) {
    let priceArr = price.split(",");
    arr = arr.filter((e) =>
      priceArr.find((n) => {
        let start = n.indexOf("-");
        if (start == -1) {
          if (n < e.price) {
            return e;
          }
        } else {
          let a = n.slice(0, start);
          let b = n.slice(start + 1, n.length);
          if (a < e.price && b > e.price) {
            return e;
          }
        }
      })
    );
  }
  if (assured) {
    let Newassured =JSON.parse(assured.toLowerCase());
    arr = arr.filter((e) => e.assured == Newassured);
  }
  if (sort) {
    if (sort === "popularity") {
      arr.sort((s1, s2) => s1.popularity - s2.popularity);
    }
    if (sort === "desc") {
      arr.sort((s1, s2) => s2.price - s1.price);
    }
    if (sort === "asc") {
      arr.sort((s1, s2) => s1.price - s2.price);
    }
  }
  if (q) {
    arr = arr.filter((e) => {
      if (e.name.toLowerCase().includes(q.toLowerCase())) {
        return e;
      }
    });
  }
  res.send(arr);
});




app.get("/home/:category", function (req, res) {
  let category = req.params.category;
  let arr = mobiles;

  let q = req.query.q;
  let ram = req.query.ram;
  let assured = req.query.assured;
  let rating = req.query.rating;
  let price = req.query.price;
  let sort = req.query.sort;

  arr = arr.filter((e) => e.category == category);

  if (ram) {
    let ramArr = ram.split(",");
    arr = arr.filter((e) => ramArr.find((n) => n.slice(-1) == e.ram));
  }
  if (rating) {
    let ratingArr = rating.split(",");
    arr = arr.filter((e) => ratingArr.find((n) => +n < +e.rating));
    // console.log(rating)
  }
  if (price) {
    let priceArr = price.split(",");
    arr = arr.filter((e) =>
      priceArr.find((n) => {
        let start = n.indexOf("-");
        if (start == -1) {
          if (n < e.price) {
            return e;
          }
        } else {
          let a = n.slice(0, start);
          let b = n.slice(start + 1, n.length);
          if (a < e.price && b > e.price) {
            return e;
          }
        }
      })
    );
  }
  if (assured) {
    let Newassured =JSON.parse(assured.toLowerCase());
    arr = arr.filter((e) => e.assured == Newassured);
  }
  if (sort) {
    if (sort === "popularity") {
      arr.sort((s1, s2) => s1.popularity - s2.popularity);
    }
    if (sort === "desc") {
      arr.sort((s1, s2) => s2.price - s1.price);
    }
    if (sort === "asc") {
      arr.sort((s1, s2) => s1.price - s2.price);
    }
  }
  if (q) {
    arr = arr.filter((e) => {
      if (e.name.toLowerCase().includes(q.toLowerCase())) {
        return e;
      }
    });
  }
  res.send(arr);
});
