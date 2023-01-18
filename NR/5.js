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

// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true,
//   optionSuccessStatus: 200,
// };

// app.use(cors(corsOptions));
app.use(passport.initialize());

let { users, orders } = require("./data.js");

var port = process.env.PORT || 2410;

app.listen(port, () => console.log(`Node app listening on port ${port}!`));

const myCookie = "passportCookie";

let params = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "jwtsecret4346445",
};

app.post("/user", function (req, res) {
  let { password, username } = req.body;
  let user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    let payload = { id: user.id };
    let token = jwt.sign(payload, params.secretOrKey, {
      algorithm: "HS256",
      expiresIn: jwtExpiryTime,
    });
    res.setHeader("X-Auth-Token",token)
    // res.setHeader("Authorization",token)
    res.send(token);
  } else res.sendStatus(401);
});

let strategy = new LocalJwt(params, function (token, done) {
  console.log("In LocalJwt-all", token);
  let user = users.find((u) => u.id == token.id);
  console.log("User", user);
  if (!user)
    return done(null, false, { message: "Incorrect username or password" });
  else return done(null, user);
});

let strategyAdmin = new LocalJwt(params, function (token, done) {
  console.log("In LocalJwt-admin", token);
  let user = users.find((u) => u.id == token.id);
  console.log("User", user);
  if (!user)
    return done(null, false, { message: "Incorrect username or password" });
  else if (user.role !== "admin")
    return done(null, false, { message: "You do not have admin role" });
  else return done(null, user);
});

passport.use("All", strategy);
passport.use("Admin", strategyAdmin);



app.get(
  "/user",
  passport.authenticate("All", { session: false }),
  function (req, res) {
    console.log("In Get /user", req.user);
    res.send(req.user);
  }
);

app.get(
  "/myOrder",
  passport.authenticate("All", { session: false }),
  function (req, res) {
    let order = orders.filter((o) => o.user === req.user.id);
    res.send(order);
  }
);

app.get(
  "/allOrders",
  passport.authenticate("Admin", { session: false }),
  function (req, res) {
    res.send(orders);
  }
);

// cookie
// let strategy = new LocalCookie({ cookieName: myCookie }, function (
//   token,
//   done
// ) {
//   console.log("In LocalCookie-all", token);
//   let user = users.find((u) => u.id == token.id);
//   console.log("User", user);
//   if (!user)
//     return done(null, false, { message: "Incorrect username or password" });
//   else return done(null, user);
// });

// let strategyAdmin = new LocalCookie({ cookieName: myCookie }, function (
//   token,
//   done
// ) {
//   console.log("In LocalCookie-admin", token);
//   let user = users.find((u) => u.id == token.id);
//   console.log("User", user);
//   if (!user)
//     return done(null, false, { message: "Incorrect username or password" });
//   else if (user.role !== "admin")
//     return done(null, false, { message: "You do not have admin role" });
//   else return done(null, user);
// });

// passport.use("All", strategy);
// passport.use("Admin", strategyAdmin);

// app.post("/user", function (req, res) {
//   let { password, username } = req.body;
//   let user = users.find(
//     (u) => u.username === username && u.password === password
//   );

//   if (user) {
//     let payload = { id: user.id };
//     res.cookie(myCookie,payload)
//     res.send("login Succes");
//   } else res.sendStatus(401);
// });

// app.get(
//   "/user",
//   passport.authenticate("All",{ session: false }),
//   function (req, res) {
//     console.log("In Get /user",req.user);
//     res.send(req.user);
//   }
// );

// app.get("/myOrder", passport.authenticate("All",{ session: false }),
// function (req, res) {
//   let order = orders.filter((o)=>o.user===req.user.id)
//   res.send(order);
// });

// app.get("/allOrders", passport.authenticate("Admin",{ session: false }),
// function (req, res) {
//   res.send(orders);
// });
//local

// let strategy = new LocalStrategy(function (username, password, done) {
//   console.log("In LocalStrategy", username, password);
//   let user = users.find((u) => u.username === username && u.password === password);
//   console.log("User", user);
//   if (!user)
//     return done(null, false, { message: "Incorrect username or password" });
//   else return done(null, user);
// });

// let strategyAdmin = new LocalStrategy(function (username, password, done) {
//   console.log("In LocalStrategy", username, password);
//   let user = users.find((u) => u.username === username && u.password === password);
//   console.log("User", user);
//   if (!user)
//     return done(null, false, { message: "Incorrect username or password" });
//   else if (user.role !== 'admin')
//   return done(null,false,{message:"You do not have admin role"});
//     else return done(null, user);
// });
// passport.use("All",strategy)
// passport.use("Admin",strategyAdmin)

// app.post("/user", function (req, res) {
//   let { password, username } = req.body;
//   let user = users.find(
//     (u) => u.username === username && u.password === password
//   );

//   if (user) {
//     let payload = { id: user.id };
//     res.send(payload);
//   } else res.sendStatus(401);
// });

// app.get(
//   "/user",
//   passport.authenticate("All",{ session: false }),
//   function (req, res) {
//     console.log("In Get /user",req.user);
//     res.send(req.user);
//   }
// );

// app.get("/myOrder", passport.authenticate("All",{ session: false }),
// function (req, res) {
//   let order = orders.filter((o)=>o.user===req.user.id)
//   res.send(order);
// });

// app.get("/allOrders", passport.authenticate("Admin",{ session: false }),
// function (req, res) {
//   res.send(orders);
// });