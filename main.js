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
  password: "54FK7u0NMFPsgbeV",
  database: "postgres",
  port: 5432,
  host: "db.pcahsbuowncddvfqabkf.supabase.co",
  ssl: { rejectUnauthorized: false },
});
conn.connect(function (res, error) {
  console.log(`Connected!!!`);
});

app.get("/shops", function (req, res) {
  let sql = "SELECT * FROM shops";
  conn.query(sql, function (err, result) {
    if (err) {
      res.status(400).send(err);
    } else {
      var arr = result.rows;
      res.send(arr);
    }
  });
});

app.post("/shops", function (req, res) {
  let body = Object.values(req.body);
  let sql = `INSERT INTO shops(name,rent) VALUES($1,$2)`;
  conn.query(sql, body, function (err, result) {
    if (err) {
      res.status(400).send(err);
    }
    res.send(result);
  });
});
app.get("/products", function (req, res) {
  let sql = "SELECT * FROM products";
  conn.query(sql, function (err, result) {
    if (err) {
      res.status(400).send(err);
    } else {
      var arr = result.rows;
      res.send(arr);
    }
  });
});

app.post("/products", function (req, res) {
  let body = Object.values(req.body);
  let sql = `INSERT INTO products (productname,category,description) VALUES($1,$2,$3)`;
  conn.query(sql, body, function (err, result) {
    if (err) {
      res.status(400).send(err);
    }
    res.send(result);
  });
});

app.get("/products/:id", function (req, res) {
  let id = +req.params.id;
  let arr = [id];
  let sql = "SELECT * FROM products WHERE productid=$1";
  conn.query(sql, arr, function (err, result) {
    if (err) {
      res.status(400).send(err);
    } else {
      res.send(result.rows);
    }
  });
});
app.put("/products/:id", function (req, res) {
  let body = Object.values(req.body);
  let sql = `UPDATE  products SET productname=$2, category=$3, description=$4 WHERE productid=$1`;
  conn.query(sql, body, function (err, result) {
    if (err) res.status(400).send(err);
    else res.send(result);
  });
});
app.get("/purchases", function (req, res) {
  let shop = req.query.shop;
  let product = req.query.product;
  let sort = req.query.sort;

  let shops = [];

  let sql1 = "SELECT * FROM shops";

  conn.query(sql1, function (err, result) {
    if (err) {
      res.status(400).send(err);
    } else {
      shops = result.rows;
    }
  });
  let products = [];
  let sql2 = "SELECT * FROM products";
  conn.query(sql2, function (err, result) {
    if (err) {
      res.status(400).send(err);
    } else {
      products = result.rows;
    }
  });

  let sql = "SELECT * FROM purchases";
  conn.query(sql, function (err, result) {
    if (err) {
      res.status(400).send(err);
    } else {
      var arr = result.rows;

      if (shop) {
        let item = shops.filter((st) => st.name == shop);
        arr = arr.filter((e) => item.find((st) => st.shopid == e.shopid));
      }
      if (product) {
        let productArr = product.split(",");
        let item1 = products.filter((st) =>
          productArr.find((c) => st.productname == c)
        );
        arr = arr.filter((e) =>
          item1.find((st) => st.productid == e.productid)
        );
      }

      if (sort === "QtyAsc") {
        arr.sort((s1, s2) => s1.quantity - s2.quantity);
      }
      if (sort === "QtyDesc") {
        arr.sort((s1, s2) => s2.quantity - s1.quantity);
      }

      if (sort === "ValueAsc") {
        arr.sort((s1, s2) => {
          let n1 = s1.quantity * s1.price;
          let n2 = s2.quantity * s2.price;
          if (n1 > n2) {
            return 1;
          } else if (n1 < n2) {
            return -1;
          } else 0;
        });
      }

      if (sort === "ValueDesc") {
        arr.sort((s1, s2) => {
          let n1 = s1.quantity * s1.price;
          let n2 = s2.quantity * s2.price;
          if (n1 > n2) {
            return -1;
          } else if (n1 < n2) {
            return 1;
          } else 0;
        });
      }
      res.send(arr);
    }
  });
});
app.get("/purchases/shops/:id", function (req, res) {
  let id = +req.params.id;
  let arr = [id];
  let sql = `SELECT * FROM purchases WHERE shopid=$1`;
  conn.query(sql, arr, function (err, result) {
    if (err) res.status(400).send(err);
     else res.send(result.rows);
  });
});
app.get("/purchases/products/:id", function (req, res) {
  let id = +req.params.id;
  let arr = [id];
  let sql = `SELECT * FROM purchases WHERE productid=$1`;
  conn.query(sql, arr, function (err, result) {
    if (err) res.status(400).send(err);
     else res.send(result.rows);
    
  });
});
app.post("/purchases", function (req, res) {
  let body = Object.values(req.body);
  let sql = `INSERT INTO purchases (shopid,productid,quantity,price) VALUES($1,$2,$3,$4)`;
  conn.query(sql, body, function (err, result) {
    if (err) {
      res.status(400).send(err);
    }
    res.send(result);
  });
});


app.get("/purchases/totalPurchase/shop/:id", function (req, res) {

  let id = +req.params.id;
  let arr = [id];
  let products = [];
  let sql2 = "SELECT * FROM products";
  conn.query(sql2, function (err, result) {
    if (err) {
      res.status(400).send(err);
    } else {
      products = result.rows;
    }
  });
  let sql = `SELECT * FROM purchases WHERE shopid=$1`;
  conn.query(sql, arr, function (err, result) {
    if (err) res.status(400).send(err);
     else {
      let list =result.rows;
      let newitemValue = [];
      let value = 0;
      let valueArr = list.map((e) => {
        value = e.price * e.quantity;
        let json = {
          shopid: e.shopid,
          productid: e.productid,
          quantity: e.quantity,
          value: value,
        };
        newitemValue.push(json);
      });
      let arr1 = products.filter((st) =>
        newitemValue.find((e) => e.productid == st.productid)
      );
      res.send(arr1);
     };
  });
});

app.get("/purchases/totalPurchase/product/:id", function (req, res) {
  let id = +req.params.id;
  let arr = [id];
  let shops = [];
  let sql2 = "SELECT * FROM shops";
  conn.query(sql2, function (err, result) {
    if (err) {
      res.status(400).send(err);
    } else {
      shops = result.rows;
    }
  });
  let sql = `SELECT * FROM purchases WHERE productid=$1`;
  conn.query(sql, arr, function (err, result) {
    if (err) res.status(400).send(err);
     else {
      let list =result.rows;
      let newitemValue = [];
      let value = 0;
      let valueArr = list.map((e) => {
        value = e.price * e.quantity;
        let json = {
          shopid: e.shopid,
          productid: e.productid,
          quantity: e.quantity,
          value: value,
        };
        newitemValue.push(json);
      });
      let arr1 = shops.filter((st) =>
        newitemValue.find((e) => e.shopid == st.shopid)
      );
      res.send(arr1);
     };
  });
  
});

// app.get("/student", function (req, res) {
//   let brand = req.query.brand;
//   let RAM = req.query.RAM;
//   let ROM = req.query.ROM;
//   let sort = req.query.sort;
//   let sql = "SELECT * FROM student";
//   conn.query(sql, function (err, result) {
//     if (err) {
//       res.status(400).send(err);
//     }
//     var arr = result.rows;
//     if (brand) {
//       let brandArr = brand.split(",");
//       arr = arr.filter((st) => brandArr.find((c1) => c1 === st.brand));
//     }
//     if (RAM) {
//       let RAMArr = RAM.split(",");
//       arr = arr.filter((st) => RAMArr.find((c1) => c1 === st.ram));
//     }
//     if (ROM) {
//       let ROMArr = ROM.split(",");
//       arr = arr.filter((st) => ROMArr.find((c1) => c1 === st.rom));
//     }
//     if (sort === "name") {
//       arr = arr.sort((s1, s2) => s1.name.localeCompare(s2.name));
//     }
//     if (sort === "price") {
//       arr = arr.sort((s1, s2) => s1.price - s2.price);
//     }
//     if (sort === "brand") {
//       arr = arr.sort((s1, s2) => s1.brand.localeCompare(s2.brand));
//     }
//     if (sort === "RAM") {
//       arr = arr.sort((s1, s2) => s1.ram.localeCompare(s2.ram));
//     }
//     if (sort === "ROM") {
//       arr = arr.sort((s1, s2) => s1.rom.localeCompare(s2.rom));
//     }
//     if (sort === "OS") {
//       arr = arr.sort((s1, s2) => s1.os.localeCompare(s2.os));
//     }
//     res.send(arr);
//   });
// });
// app.get("/student/:id", function (req, res) {
//   let id = +req.params.id;
//   let arr = [id];
//   let sql = "SELECT * FROM student WHERE id=$1";
//   conn.query(sql, arr, function (err, result) {
//     if (err) {
//       res.status(400).send(err);
//     }
//     res.send(result.rows);
//   });
// });
// app.post("/student", function (req, res) {
//   let body = Object.values(req.body);
//   let sql = `INSERT INTO student(name,price,brand,RAM,ROM,OS)
//   VALUES ($1,$2,$3,$4,$5,$6)`;
//   conn.query(sql, body, function (err, result) {
//     if (err) {
//       res.status(400).send(err);
//     }
//     res.send(result);
//   });
// });

// app.put("/student/:id", function (req, res, next) {
//   let body = Object.values(req.body);
//   let sql = `UPDATE  student SET name=$2, price=$3, brand=$4, RAM=$5, ROM=$6, OS=$7 WHERE id=$1`;
//   conn.query(sql, body, function (err, result) {
//     if (err) res.status(400).send(err);
//     else res.send(result);
//   });
// });

// app.delete("/student/:id", function (req, res, next) {
//   let id = +req.params.id;
//   let arr = [id];
//   let sql = `DELETE FROM student WHERE id=$1`;
//   conn.query(sql, arr, function (err, result) {
//     if (err) res.status(400).send(err);
//     else res.send(result);
//   });
// });
