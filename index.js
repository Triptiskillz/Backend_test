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

var port = process.env.PORT || 2410;

app.listen(port, () => console.log(`Node app listening on port ${port}!`));

let params = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "jwtsecret4346445",
};
let { products, users, orders,log } = require("./data.js");

app.get("/products", function (req, res) {
  res.send(products);
});
app.get("/product/:id", function (req, res) {
  let id = req.params.id;
  let arr = products.find((e) => e.id == id);
  res.send(arr);
});
app.get("/products/:category", function (req, res) {
  let  category  = req.params.category;

  let arr = products.filter((p) => p.category == category);
  res.send(arr);
});
app.post("/register", function (req, res) {
  let email = req.body.email;
  let password = req.body.password;
  let maxid = users.reduce((acc, curr) => (curr.id > acc ? curr.id : acc), 0);
  let newid = maxid + 1;
  let json = { id: newid, email: email, password: password };
  users.push(json);
  res.send(json);
});

app.post("/login", function (req, res) {
  let { email, password } = req.body;
  // console.log(email, password )
  let user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    let payload = { id: user.id };
    let token = jwt.sign(payload, params.secretOrKey, {
      algorithm: "HS256",
      expiresIn: jwtExpiryTime,
    });
    // res.setHeader("X-Auth-Token",token)
    // res.setHeader("Authorization",token)
    let json = { token: token, id: user.id, email: user.email };
    res.send(json);
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

passport.use("All", strategy);

app.post("/orders", function (req, res) {
  let body = req.body;
  orders.push(body);
  res.send(body);
});
app.post("/log", function (req, res) {
  let body = req.body;
  log.push(body);
  res.send(body);
});
app.get("/log", function (req, res) {

  res.send(log);
});


app.post("/products", function (req, res) {
  let body = req.body;
  let maxid = products.reduce(
    (acc, curr) => (curr.id > acc ? curr.id : acc),
    0
  );
  let newid = maxid + 1;
  let json = { id: newid, ...body };
  products.push(json);
  res.send(json);
});
app.put("/products/:id", function (req, res) {
  let id = req.params.id;
  let body = req.body;
  let index = products.findIndex((e) => e.id == id);
  if (index >= 0) {
    products[index] = body;
    res.send(products[index]);
  } else res.status(404).send("NO products found");
});
app.delete("/products/:id", function (req, res) {
  let id = req.params.id;
  let body = req.body;
  let index = products.findIndex((e) => e.id == id);
  if (index >= 0) {
    let deleteProducts = products.splice(index, 1);

    res.send(deleteProducts);
  } else res.status(404).send("NO products found");
});
app.get(
  "/orders",
  passport.authenticate("All", { session: false }),
  function (req, res) {
    try {
      let order = orders.filter((o) => o.email == req.user.email);
      res.send(order);
    } catch (ex) {
      if (err.response) {
        let { status, statusText } = err.response;
        console.log(status, statusText);
        res.status(status).send(statusText);
      } else res.status(404).send(err);
    }
  }
);
