let mysql = require("mysql");
let { Client } = require("pg");
var express = require("express");
var app = express();
const path = require("path");

var port = process.env.PORT || 2410;
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
  );
  next();
});

app.listen(port, () => console.log(`Node app listening on port ${port}!`));

let conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "company",
});
// const conn = new Client({
//     user: "task7_niyo_user",
//     password: "6i7C8j2UNe87q9h5Gpch335AlFijLz5o",
//     database: "task7_niyo",
//     port: 5432,
//     host: "dpg-cele8d5a4991ihjr9vvg-a",
//     ssl: { rejectUnauthorized: false },
//   });

// app.get("/resetData", function (req, res, next) {
//   let sql = "DELETE FROM emp";
//   conn.query(sql, function (err, result) {
//     if (err) res.status(400).send(err);
//     else {
//       console.log("Successfull Delete");
//       let { empData } = require("./json.js");
//       let arr = empData.map((p) => [
//         p.empCode,
//         p.name,
//         p.department,
//         p.designation,
//         p.salary,
//         p.gender,
//       ]);

//       let sql =
//         "INSERT INTO emp(empCode,name,department,designation,salary,gender) VALUES ?";
//       conn.query(sql, [arr], function (err, result) {
//         if (err) res.status(400).send(err);
//         else res.send(result);
//       });
//     }
//   });
// });

app.get("/emp", function (req, res) {
  let department = req.query.department;
  let designation = req.query.designation;
  let gender = req.query.gender;
  let sort = req.query.sort;
  let sql = "SELECT * FROM emp";
  conn.query(sql, function (err, result) {
    if (err) {
      res.status(400).send(err);
    }
    var arr = result;
    if (department) {
      // let departmentArr = department.split(",");
      // arr = arr.filter((st) =>
      //   departmentArr.find((c1) => c1 === st.department)
      // );
      arr = arr.filter((st) => st.department === department);
    }
    if (designation) {
      // let designationArr = designation.split(",");
      // arr = arr.filter((st) =>
      //   designationArr.find((c1) => c1 === st.designation)
      // );
      arr = arr.filter((st) => st.designation === designation);
    }
    if (gender) {
      arr = arr.filter((st) => st.gender === gender);
    }
    if (sort === "empCode") {
      arr = arr.sort((s1, s2) => s1.empCode - s2.empCode);
    }
    if (sort === "name") {
      arr = arr.sort((s1, s2) => s1.name.localeCompare(s2.name));
    }
    if (sort === "department") {
      arr = arr.sort((s1, s2) => s1.department.localeCompare(s2.department));
    }
    if (sort === "designation") {
      arr = arr.sort((s1, s2) => s1.designation.localeCompare(s2.designation));
    }
    if (sort === "salary") {
      arr =  arr.sort((s1, s2) => s1.salary - s2.salary);
    }
    if (sort === "gender") {
      arr = arr.sort((s1, s2) => s1.gender.localeCompare(s2.gender));
    }
    res.send(arr);
  });
});
app.get("/emp/:id", function (req, res) {
  let id = +req.params.id;
  let sql = "SELECT * FROM emp WHERE id=?";
  conn.query(sql, id, function (err, result) {
    if (err) {
      res.status(400).send(err);
    }
    res.send(result);
  });
});
app.post("/emp", function (req, res) {
  let body = Object.values(req.body);
  let sql = `INSERT INTO emp(empCode,name,department,designation,salary,gender) 
  VALUES (?,?,?,?,?,?)`;
  conn.query(sql, body, function (err, result) {
    if (err) {
      res.status(400).send(err);
    }
    res.send(result);
  });
});

app.put("/emp/:id", function (req, res, next) {
  let empCode = req.body.empCode;
  let name = req.body.name;
  let department = req.body.department;
  let designation = req.body.designation;
  let salary = req.body.salary;
  let gender = req.body.gender;
  let id = +req.params.id;
  let sql = `UPDATE  emp SET empCode='${empCode}', name='${name}', department='${department}', designation='${designation}', salary='${salary}', gender='${gender}' WHERE id=${id}`;
  conn.query(sql, function (err, result) {
    if (err) res.status(400).send(err);
    else res.send(result);
  });
});

app.delete("/emp/:id", function (req, res, next) {
  let id = +req.params.id;
  let sql = `DELETE FROM emp WHERE id=${id}`;
  conn.query(sql, function (err, result) {
    if (err) res.status(400).send(err);
    else res.send(result);
  });
});
