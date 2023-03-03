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
  users,
  log,
  chatUser,
} = require("./data.js");


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
  let { phone } = req.body;
  let user = users.find((u) => u.phone === phone);

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
  "/alluser",
  passport.authenticate("All", { session: false }),
  function (req, res) {
    // console.log("In Get /user", req.user);
    res.send(users);
  }
);

app.post("/chat",  passport.authenticate("All", { session: false }), function (req, res) {
  let body = req.body;
  chatUser.push(body)
  res.send(body);
});

app.get("/chat", passport.authenticate("All", { session: false }), function (req, res) {
  let id = req.user.id;
  let arr =chatUser.filter((e)=>e.userid==id || e.sUserId==id)
  res.send(arr);
});
