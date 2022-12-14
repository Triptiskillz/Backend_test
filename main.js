// const e = require("express");
var express = require("express");
var app = express();
const path=require('path')
// app.use(express.static(path.join(__dirname+"/public")))
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
// const port = 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));

let { carMasterData, carsData } = require("./json.js");
app.get("/carmaster", function (req, res) {
  let arr = carMasterData;
  res.send(arr);
});

app.get("/cars", function (req, res) {
  let fuel = req.query.fuel;
  let type = req.query.type;
  let maxprice = req.query.maxprice;
  let minprice = req.query.minprice;
  let sort = req.query.sort;
  let arr = carsData;
  // console.log(fuel)
  let item = carMasterData.filter((st) => st.fuel == fuel);
  if (fuel) {
    arr = arr.filter((e) => item.find((st) => st.model == e.model));
  }

  let item1 = carMasterData.filter((st) => st.type == type);
  if (type) {
    arr = arr.filter((e) => item1.find((st) => st.model == e.model));
  }

  if (maxprice) {
    arr = arr.filter((st) => st.price <= maxprice);
  }
  if (minprice) {
    arr = arr.filter((st) => st.price >= minprice);
  }
  if (sort === "year") {
    arr.sort((s1, s2) => s1.year - s2.year);
  }
  if (sort === "kms") {
    arr.sort((s1, s2) => s1.kms - s2.kms);
  }
  if (sort === "price") {
    arr.sort((s1, s2) => s1.price - s2.price);
  }
  res.send(arr);
});

app.get("/cars/:id", function (req, res) {
  let id = req.params.id;
  let list = carsData.find((st) => st.Carid === id);
  if (list) res.send(list);
  else res.status(404).send("No Item founds");
});
app.post("/cars", function (req, res) {
  let body = req.body;
  let newCar = { ...body };
  carsData.push(newCar);
  res.send(newCar);
});
app.put("/cars/:id", function (req, res) {
  let id = req.params.id;
  let body = req.body;
  let index = carsData.findIndex((st) => st.Carid === id);
  if (index >= 0) {
    let updateCar = { Carid: id, ...body };
    carsData[index] = updateCar;
    res.send(updateCar);
  } else {
    res.status(404).send("No Item founds");
  }
});

app.delete("/cars/:id", function (req, res) {
  let id = req.params.id;
  let index = carsData.findIndex((st) => st.Carid === id);
  if (index >= 0) {
    let deleteCar = carsData.splice(index, 1);
    res.send(deleteCar);
  } else {
    res.status(404).send("No student founds");
  }
});
