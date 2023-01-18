
// let arr =[{id:1,name:"Jack",role:"Admin"}]
// function insertUser(req,res,next){
//   let maxid = arr.reduce(
//     (acc, curr) => (curr.id > acc ? curr.id : acc),
//     0
//   );
//   let newid = maxid + 1;
//    req.user = {
//     id:newid,
//     name:"Temp",
//     role:"Guest"
//   };
//   console.log(`Url:${req.url} Method:${req.method}`);
//   console.log(`Inserting:${arr.push(req.user)}`);
//   next();
// }
// app.get("/allRequestsFromDB",function(req,res){
//   console.log("In the route:Get /allRequestsFromDB");
//   res.send({route:'/allRequestsFromDB' ,arr});
// })
// // 2 
// var express = require("express");
// const cookieParser = require("cookie-parser");
// var app = express();
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

// var port = process.env.PORT || 2411;
// app.listen(port, () => console.log(`Node app listening on port ${port}!`));

// app.get("/viewPage", function (req, res) {
//   let name = req.signedCookies.name;
//   let counter = req.signedCookies.counter;
//   if (!name) {
//     res.cookie("name", "Guest",{maxAge:150000,signed:true});
//     res.cookie("counter", 1,{maxAge:150000,signed:true});
//     res.send("Cookie set");
//   } else {
//     res.cookie("counter", +counter + 1,{signed:true});
//     res.send(`Cookie recd for name:${name} couunter:${counter }`);
//   }
// });

// app.post("/viewPage", function (req, res) {
//   let { name } = req.body;
//   res.cookie("name", name,{maxAge:150000,signed:true});
//   res.cookie("counter", 1,{maxAge:150000,signed:true});
//   res.send(`Cookie set with name=${name}`);
// });
// app.delete("/viewPage", function (req, res) {
//   res.clearCookie("name");
//   res.clearCookie("counter");
//   res.send(`Cookie deleted`);
// });


// var express = require("express");
// const cookieParser = require("cookie-parser");
// var app = express();
// var cors = require('cors')

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
// const corsOptions ={
//   origin:'http://localhost:3000', 
//   credentials:true,            
//   optionSuccessStatus:200
// }
// app.use(cors(corsOptions))
// var port = process.env.PORT || 2410;
// app.listen(port, () => console.log(`Node app listening on port ${port}!`));

// let { emps } = require("./data.js");

// // app.get("/mobiles", function (req, res) {
// //   let userdata = req.signedCookies.userdata;
// // console.log(`userdate : ${JSON.stringify(userdata)}`)
// //   if (!userdata) userdata = { user: "Guest", pages: [] };
// //   userdata.pages.push({ url: "/mobiles", data: Date.now() });
// //   res.cookie("userdata",userdata,{maxAge:30000,signed:true})
// //   res.send(mobiles)
// // });

// // app.get("/loptops", function (req, res) {
// //   let userdata = req.signedCookies.userdata;
// // console.log(`userdate : ${JSON.stringify(userdata)}`)
// //   if (!userdata) userdata = { user: "Guest", pages: [] };
// //   userdata.pages.push({ url: "/loptops", data: Date.now() });
// //   res.cookie("userdata",userdata,{maxAge:30000,signed:true})
// //   res.send(laptops)
// // });
// // app.get("/users", function (req, res) {
// //   let userdata = req.signedCookies.userdata;
// //   let {user,pages} =userdata
// //   if(!userdata||user==="Guest")
// //   res.status(401).send("No access.Please login first");
// //   else{
// //     let u1= users.find((u)=>u.name===user);
// //     if(u1.role==="admin"){
// //       let name = users.map((u)=>u.name);
// //       res.send(name);
// //     }else res.status(403).send("Forbidden");
// //   }
// // });
// app.post("/login", function (req, res) {
//   let { empCode, name } = req.body;
//   let user = emps.find((u) => u.name === name && u.empCode === empCode);
//   if (!user) res.status(401).send("Login failed");
//   else {
//     res.cookie(
//       "userdata",
//       { user: name, url: "/tracker", date: new Date().toLocaleDateString() },
//       { maxAge: 150000, signed: true }
//     );
//     res.send("Login success");
//   }
// });
// app.get("/logout", function (req, res) {
//   res.clearCookie("userdata");
//   res.send(`Cookie cleared`);
// });
// app.get("/tracker", function (req, res) {
//   let userdata = req.signedCookies.userdata;
//   if (!userdata) {
//     let userdata = { user: "Guest", url: "/tracker", date: new Date().toLocaleDateString()};
//     res.cookie("userdata", userdata, { maxAge: 150000, signed: true });
//     res.json(userdata);
//   } else {
//     res.json(userdata);
//   }
// });

// app.get("/myDetails", function (req, res) {
//   let userdata = req.signedCookies.userdata;
//   let { user, pages } = userdata;
//   let u1 = emps.find((u) => u.name == user);
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
//   let userdata = req.signedCookies.userdata;
//   let { user, pages } = userdata;
//   let u1 = emps.find((u) => u.name == user);
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

let emps =[
    {empCode:1451,name:"Jack",department:"Finance",designation:"Manager",salary:52500,gender:"Male"},
    {empCode:1029,name:"Steve",department:"Technology",designation:"Manager",salary:71000,gender:"Male"},
    {empCode:1891,name:"Anna",department:"HR",designation:"Manager",salary:55100,gender:"Female"},
    {empCode:1322,name:"Kathy",department:"Operations",designation:"Manager",salary:49200,gender:"Female"},
    {empCode:1367,name:"Bob",department:"Marketing",designation:"Manager",salary:39000,gender:"Male"},
    {empCode:1561,name:"George",department:"Finance",designation:"Trainee",salary:22500,gender:"Male"},
    {empCode:1777,name:"Harry",department:"Technology",designation:"Trainee",salary:31000,gender:"Male"},
    {empCode:1606,name:"Julia",department:"HR",designation:"Manager",Trainee:25100,gender:"Female"},
    {empCode:1509,name:"Kristina",department:"Operations",designation:"Trainee",salary:19200,gender:"Female"},
    {empCode:1533,name:"William",department:"Marketing",designation:"Trainee",salary:16200,gender:"Male"},
    {empCode:1161,name:"Stephen",department:"Finance",designation:"VP",salary:82500,gender:"Male"},
    {empCode:1377,name:"Winston",department:"Technology",designation:"VP",salary:91000,gender:"Male"},
    {empCode:1206,name:"Victoria",department:"HR",designation:"Manager",VP:65100,gender:"Female"},
    {empCode:1809,name:"Pamela",department:"Operations",designation:"VP",salary:78600,gender:"Female"},
    {empCode:1033,name:"Tim",department:"Marketing",designation:"VP",salary:66800,gender:"Male"},
    {empCode:1787,name:"Peter",department:"Technology",designation:"Manager",salary:47400,gender:"Male"},
    {empCode:1276,name:"Barbara",department:"Technology",designation:"Trainee",salary:21800,gender:"Female"},
    {empCode:1859,name:"Donna",department:"Operations",designation:"Trainee",salary:21900,gender:"Female"},
    {empCode:1874,name:"Igor",department:"Operations",designation:"Manager",salary:48300,gender:"Male"},
    ]

module.exports={emps}