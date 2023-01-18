var express = require("express");
const cookieParser = require("cookie-parser");
var app = express();
var passport = require("passport");
var LocalJwt = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;

var jwt = require("jsonwebtoken");
var jwt_key = "secretkey6864712";
const jwtExpiryTime = 300;

app.use(express.json());
app.use(cookieParser("achgj-446321"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  // res.header("Access-Control-Expose-Headers", "Authorization");
  res.header("Access-Control-Expose-Headers", "X-Auth-Token");
  next();
});

app.use(passport.initialize());

var port = process.env.PORT || 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));

let { emps } = require("./data.js");

let params = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "jwtsecret4346445",
};

app.post("/login", function (req, res) {
  let { empCode, name } = req.body;
  let user = emps.find((u) => u.name === name && u.empCode === empCode);
  if (!user) res.status(401).send("Login failed");
  else {
    let payload = { name: user.name };
    let token = jwt.sign(payload, params.secretOrKey, {
      algorithm: "HS256",
      expiresIn: jwtExpiryTime,
    });
    res.setHeader("X-Auth-Token", token);

    // res.setHeader("Authorization",token)
    res.send(token);
  }
});
app.get("/logout", function (req, res) {
  res.clearCookie("userdata");
  res.send(`Cookie cleared`);
});

let strategy = new LocalJwt(params, function (token, done) {
  console.log("In LocalJwt-all", token);
  let user = emps.find((u) => u.name == token.name);
  console.log("User", user);
  if (!user)
    return done(null, false, { message: "Incorrect username or password" });
  else return done(null, user);
});

passport.use("All", strategy);

app.get(
  "/tracker",
  passport.authenticate("All", { session: false }),
  function (req, res) {
    let dataJwt = {
      user: req.user.name,
      url: "/tracker",
      date: new Date().toLocaleDateString(),
    };
    res.cookie("dataJwt", dataJwt, { maxAge: 150000, signed: true });
    res.json(dataJwt);
  }
);

app.get(
  "/myDetails",
  passport.authenticate("All", { session: false }),
  function (req, res) {
    res.send(req.user);
  }
);

app.get("/company", function (req, res) {
  res.send("Welcome to the Employee Portal of XYZ Company");
});
app.get(
  "/myJuniors",
  passport.authenticate("All", { session: false }),
  function (req, res) {
    let u1 = emps.find((u) => u.name == req.user.name);
    if (u1) {
      if (u1.designation == "VP") {
        let list = emps.filter((e) => e.designation == "Manager");
        let list1 = emps.filter((e) => e.designation == "Trainee");
        let newList = [...list, ...list1];
        res.send(newList);
      } else if (u1.designation == "Manager") {
        let list2 = emps.filter((e) => e.designation == "Trainee");
        res.send(list2);
      } else if (u1.designation == "Trainee") {
        res.send("No Juniors");
      }
    } else {
      res.send("No Found");
    }
  }
);
