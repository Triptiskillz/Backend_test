let mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();
let { Client } = require("pg");
var express = require("express");
var app = express();

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

const conn = new Client({
  user: "postgres",
  password: "YaOclcn7ZY7yW3K1",
  database: "postgres",
  port: 5432,
  host: "db.vglvydbkaxumjyvcbmrf.supabase.co",
  ssl: { rejectUnauthorized: false },
});
conn.connect(function (res, error) {
  console.log(`Connected!!!`);
});

// app.get("/resetData", function (req, res, next) {
//   let sql = `DELETE FROM student`;

//   conn.query(sql, function (err, result) {
//     if (err) res.status(400).send(err);
//     else {
//       console.log("Successfull Delete");
//       let { empData } = require("./json.js");
//       let arr = empData.map((p) => [
//         p.name,
//         p.price,
//         p.brand,
//         p.RAM,
//         p.ROM,
//         p.OS,
//       ]);

//       let sql = "INSERT INTO student(name,price,brand,RAM,ROM,OS) VALUES ?";
//       conn.query(sql, [arr], function (err, result) {
//         if (err) res.status(400).send(err);
//         else res.send(result.rows);
//       });
//     }
//     conn.end();
//   });
// });

app.get("/student", function (req, res) {
  let brand = req.query.brand;
  let RAM = req.query.RAM;
  let ROM = req.query.ROM;
  let sort = req.query.sort;
  let sql = "SELECT * FROM student";
  conn.query(sql, function (err, result) {
    if (err) {
      res.status(400).send(err);
    }
    var arr = result.rows;
    if (brand) {
      let brandArr = brand.split(",");
      arr = arr.filter((st) => brandArr.find((c1) => c1 === st.brand));
    }
    if (RAM) {
      let RAMArr = RAM.split(",");
      arr = arr.filter((st) => RAMArr.find((c1) => c1 === st.ram));
    }
    if (ROM) {
      let ROMArr = ROM.split(",");
      arr = arr.filter((st) => ROMArr.find((c1) => c1 === st.rom));
    }
    if (sort === "name") {
      arr = arr.sort((s1, s2) => s1.name.localeCompare(s2.name));
    }
    if (sort === "price") {
      arr = arr.sort((s1, s2) => s1.price - s2.price);
    }
    if (sort === "brand") {
      arr = arr.sort((s1, s2) => s1.brand.localeCompare(s2.brand));
    }
    if (sort === "RAM") {
      arr = arr.sort((s1, s2) => s1.ram.localeCompare(s2.ram));
    }
    if (sort === "ROM") {
      arr = arr.sort((s1, s2) => s1.rom.localeCompare(s2.rom));
    }
    if (sort === "OS") {
      arr = arr.sort((s1, s2) => s1.os.localeCompare(s2.os));
    }
    res.send(arr);
  });
});
app.get("/student/:id", function (req, res) {
  let id = +req.params.id;
  let arr = [id];
  let sql = "SELECT * FROM student WHERE id=$1";
  conn.query(sql, arr, function (err, result) {
    if (err) {
      res.status(400).send(err);
    }
    res.send(result.rows);
  });
});
app.post("/student", function (req, res) {
  let body = Object.values(req.body);
  let sql = `INSERT INTO student(name,price,brand,RAM,ROM,OS) 
  VALUES ($1,$2,$3,$4,$5,$6)`;
  conn.query(sql, body, function (err, result) {
    if (err) {
      res.status(400).send(err);
    }
    res.send(result);
  });
});

app.put("/student/:id", function (req, res, next) {
  let body = Object.values(req.body);
  let sql = `UPDATE  student SET name=$2, price=$3, brand=$4, RAM=$5, ROM=$6, OS=$7 WHERE id=$1`;
  conn.query(sql, body, function (err, result) {
    if (err) res.status(400).send(err);
    else res.send(result);
  });
});

app.delete("/student/:id", function (req, res, next) {
  let id = +req.params.id;
  let arr = [id];
  let sql = `DELETE FROM student WHERE id=$1`;
  conn.query(sql, arr, function (err, result) {
    if (err) res.status(400).send(err);
    else res.send(result);
  });
});
