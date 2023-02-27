var express = require("express");
const cookieParser = require("cookie-parser");
var app = express();
var passport = require("passport");
var LocalStrategy = require("passport-local");
var LocalCookie = require("passport-cookie");
var LocalJwt = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var morgan = require("morgan");
var fs = require("fs");
var path = require("path");
// var cors = require("cors");

var jwt = require("jsonwebtoken");
var jwt_key = "secretkey6864712";
const jwtExpiryTime = 8200;

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
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

app.use(morgan(":method :url :status", { stream: accessLogStream }));

app.use(passport.initialize());

var port = process.env.PORT || 2410;

app.listen(port, () => console.log(`Node app listening on port ${port}!`));

let params = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "jwtsecret4346445",
};
let {
  mobiles,
  users,
  pincodes,
  reviews,
  wishlist,
  orders,
  log,
} = require("./data.js");

app.get("/deals", function (req, res) {
  let newarr = [];
  let arr = mobiles;
  arr = arr.slice(1, 14).map((item, i) => {
    return item;
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
    let Newassured = JSON.parse(assured.toLowerCase());
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
    let Newassured = JSON.parse(assured.toLowerCase());
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

app.get("/product/:productId", function (req, res) {
  let productId = req.params.productId;
  let arr = mobiles;
  arr = arr.find((e) => e.id == productId);
  res.send(arr);
});

app.get("/pincode/:pincode/:productId", function (req, res) {
  let productId = req.params.productId;
  let pincode = req.params.pincode;

  let arr = pincodes;
  arr = arr.find((e) => e.pincode == pincode);
  if (arr != undefined) {
    arr = arr.mobileList.find((m) => m.id == productId);
    res.send(arr);
  }else{
    res.send('not');

  }
  // console.log(arr);

  // console.log(arr)
});

app.get("/reviews/:productId", function (req, res) {
  let productId = req.params.productId;

  let arr = reviews;
  arr = arr.find((e) => e.mobileId == productId);

  res.send(arr);
});
let strategy = new LocalJwt(params, function (token, done) {
  // console.log("In LocalJwt-all", token);
  let user = users.find((u) => u.id == token.id);
  // console.log("User", user);
  if (!user)
    return done(null, false, { message: "Incorrect username or password" });
  else return done(null, user);
});

let strategyAdmin = new LocalJwt(params, function (token, done) {
  // console.log("In LocalJwt-admin", token);
  let user = users.find((u) => u.id == token.id);
  // console.log("User", user);
  if (!user)
    return done(null, false, { message: "Incorrect username or password" });
  else if (user.role !== "admin")
    return done(null, false, { message: "You do not have admin role" });
  else return done(null, user);
});

passport.use("Admin", strategyAdmin);

passport.use("All", strategy);

app.post("/loginuser", function (req, res) {
  let { email, password } = req.body;
  let user = users.find((u) => u.email === email && u.password === password);

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

app.post(
  "/wishlist",
  passport.authenticate("All", { session: false }),
  function (req, res) {
    let body = req.body;
    let id = req.body.id;
    // console.log(req.body)
    let r1 = wishlist.find((e) => e.id == id);
    if (r1) {
      let index = wishlist.indexOf(r1);
      //  console.log(index)
      wishlist.splice(index, 1);
    } else {
      let json = { ...body, userid: req.user.id };
      wishlist.push(json);
    }

    res.send(wishlist);
  }
);

app.get(
  "/wishlist",
  passport.authenticate("All", { session: false }),
  function (req, res) {
    let arr = wishlist;
    arr = arr.filter((e) => e.userid == req.user.id);
    res.send(arr);
  }
);

app.post(
  "/order",
  passport.authenticate("All", { session: false }),
  function (req, res) {
    let body = req.body;

    let json = { userid: req.user.id, order: [...body] };

    orders.push(json);
    res.send(orders);
  }
);

app.get(
  "/order",
  passport.authenticate("All", { session: false }),
  function (req, res) {
    let arr = orders;
    arr = arr.filter((e) => e.userid == req.user.id);
    res.send(arr);
  }
);

app.get(
  "/products",
  passport.authenticate("Admin", { session: false }),
  function (req, res) {
    res.send(mobiles);
  }
);

app.post(
  "/products",
  passport.authenticate("Admin", { session: false }),
  function (req, res) {
    let body = req.body;
    console.log(body);
    let id = req.body.id;
    let r1 = mobiles.find((e) => e.id == id);
    if (r1) {
      res.send("Enter Different ID");
    } else {
      mobiles.push(body);
      res.send("Product Added Successfully");
    }
  }
);

app.post(
  "/csv",
  passport.authenticate("Admin", { session: false }),
  function (req, res) {
    let body = req.body;
    for (let i = 0; i < body.length; i++) {
      let id = body[i].id;
      let r1 = mobiles.find((e) => e.id == id);
      if (r1) {
        res.send("Enter Different ID");
      } else {
        mobiles.push(body[i]);
        res.send("Product Added Successfully");
      }
      // mobiles.push(body[i]);
    }
    // res.send("Product Added Successfully");
  }
);

app.put(
  "/products/:id",
  passport.authenticate("Admin", { session: false }),
  function (req, res) {
    let body = req.body;
    let id = req.params.id;
    let r1 = mobiles.find((e) => e.id == id);
    let index = mobiles.indexOf(r1);
    mobiles[index] = body;
    res.send(body);
  }
);

app.get(
  "/orders",
  passport.authenticate("Admin", { session: false }),
  function (req, res) {
    let arr = orders;
    res.send(orders);
  }
);
app.get(
  "/wishlists",
  passport.authenticate("Admin", { session: false }),
  function (req, res) {
    let arr = wishlist;
    res.send(arr);
  }
);

app.post("/log", function (req, res) {
  let body = req.body;
  log.push(body);
  res.send(body);
});

app.get(
  "/log",
  passport.authenticate("Admin", { session: false }),
  function (req, res) {
    let arr = log;
    res.send(arr);
  }
);
