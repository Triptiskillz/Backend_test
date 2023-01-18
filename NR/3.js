var express = require("express");
const cookieParser = require("cookie-parser");
var app = express();
var cors = require("cors");

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
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use("/myOrder", authorization);

app.use(cors(corsOptions));
var port = process.env.PORT || 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));

let { users, order } = require("./data.js");

app.post("/login", function (req, res) {
  let { password, username } = req.body;
  let user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const token = jwt.sign({ user }, jwt_key, {
      algorithm: "HS256",
      expiresIn: jwtExpiryTime,
    });
    res.cookie("jwt",token)
    res.send("Login Success")
    // res.send(token);
  } else res.status(401).send("Login failed");
});

function authorization(req, res, next) {
  //req.headers["authorization"]
  const token =req.cookies["jwt"] ;
  console.log("Token:", token);
  if (!token) res.status(401).send("Please login First");
  else {
    jwt.verify(token, jwt_key, function (err, data) {
      if (err) res.status(403).send(err);
      else {
        console.log(data);
        req.user = data.user;
        next();
      }
    });
  }
}
app.get("/myOrder", function (req, res) {
  let orders = order.filter((o) => o.user === req.user.id);
  res.send(orders);
});

app.get('/info',function(req,res){
  res.send("Hello.Welcome to the tutorial");
})

// let users = [
//     { id: 1, username: "John", password: "john" },
//     { id: 2, username: "Tripti", password: "tripti" },
//   ];
//   let order = [
//     { orderId: 1, user: 1, qty: 10, value: 50 },
//     { orderId: 2, user: 2, qty: 15, value: 55 },
//     { orderId: 3, user: 1, qty: 20, value: 100 },
//     { orderId: 4, user: 2, qty: 5, value: 70 },
//     { orderId: 5, user: 1, qty: 13, value: 96 },
//     { orderId: 6, user: 2, qty: 15, value: 240 },
//     { orderId: 7, user: 1, qty: 21, value: 450 },
//     { orderId: 8, user: 1, qty: 11, value: 50 },
//   ];
//   module.exports = { users, order };

// var express = require("express");
// const cookieParser = require("cookie-parser");
// var app = express();
// var cors = require("cors");

// var jwt = require("jsonwebtoken");
// var jwt_key = "secretkey6864712";
// const jwtExpiryTime = 300;

// app.use(express.json());
// app.use(cookieParser("achgj-446321"));
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, OPTIONS, PUT, POST, DELETE");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true,
//   optionSuccessStatus: 200,
// };
// // app.use("/myOrder", authorization);

// app.use(cors(corsOptions));
// app.use("/myDetails", authorization);
// app.use("/myJuniors", authorization);

// var port = process.env.PORT || 2410;
// app.listen(port, () => console.log(`Node app listening on port ${port}!`));

// let { emps } = require("./data.js");

// function authorization(req, res, next) {
//   //req.headers["authorization"]
//   const token = req.cookies["userdata"];
//   console.log("Token:", token);
//   if (!token) res.status(401).send("Please login First");
//   else {
//     jwt.verify(token, jwt_key, function (err, data) {
//       if (err) res.status(403).send(err);
//       else {
//         console.log(data);
//         req.user = data.user;
//         next();
//       }
//     });
//   }
// }
// app.post("/login", function (req, res) {
//   let { empCode, name } = req.body;
//   let user = emps.find((u) => u.name === name && u.empCode === empCode);
//   if (!user) res.status(401).send("Login failed");
//   else {
//     const token = jwt.sign({ user }, jwt_key, {
//       algorithm: "HS256",
//       expiresIn: jwtExpiryTime,
//     });
//     res.cookie("userdata", token);
//     res.send("Login success");
//   }
// });
// app.get("/logout", function (req, res) {
//   res.clearCookie("userdata");
//   res.send(`Cookie cleared`);
// });
// app.get("/tracker", function (req, res) {
//   const token = req.cookies["userdata"];
//   if (!token) {
//     let userdata = {
//       user: "Guest",
//       url: "/tracker",
//       date: new Date().toLocaleDateString(),
//     };
//     res.cookie("userdata", userdata, { maxAge: 150000, signed: true });
//     res.json(userdata);
//   } else {
//     jwt.verify(token, jwt_key, function (err, data) {
//       if (err) res.status(403).send(err);
//       else {
//         let userdata = {
//           user: data.user.name,
//           url: "/tracker",
//           date: new Date().toLocaleDateString(),
//         };
//         res.cookie("userdata", userdata, { maxAge: 150000, signed: true });
//         res.json(userdata);
//       }
//     });
//   }
// });

// app.get("/myDetails", function (req, res) {
//   let u1 = emps.find((u) => u.name == req.user.name);
//   if (u1) {
//     res.send(u1);
//   } else {
//     res.send("No Found");
//   }
// });

// app.get("/company", function (req, res) {
//   res.send(emps);
// });
// app.get("/myJuniors", function (req, res) {
//   let u1 = emps.find((u) => u.name == req.user.name);
//   if (u1) {
//     if (u1.designation == "VP") {
//       let list = emps.filter((e) => e.designation == "Manager");
//       let list1 = emps.filter((e) => e.designation == "Trainee");
//       let newList = [...list, ...list1];
//       res.send(newList);
//     } else if (u1.designation == "Manager") {
//       let list2 = emps.filter((e) => e.designation == "Trainee");
//       res.send(list2);
//     } else if (u1.designation == "Trainee") {
//       res.send("No Juniors");
//     }
//   } else {
//     res.send("No Found");
//   }
// });
