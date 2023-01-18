let studentsData = [
    [
      {id: "DFI61", name:"Vishal", city:"Delhi", age:27, gender:"Male", payment:"Credit Card"},
      {id: "JUW88", name:"Amit", city:"Noida", age:49, gender:"Male", payment:"Debit Card"},
      {id: "KPW09", name:"Pradeep", city:"Gurgaon", age:21, gender:"Male", payment:"Wallet"},
      {id: "ABR12", name:"Rohit", city:"Jaipur", age:34, gender:"Male", payment:" Debit Card"},
      {id: "BR451", name:"Preeti", city:"Delhi", age:29, gender:"Female", payment:"Credit Card"},
      {id: "MKR52", name:"Neha", city:"Noida", age:42, gender:" Female ", payment:"Debit Card"},
      {id: "BTT66", name:"Swati", city:"Gurgaon", age:24, gender:" Female ", payment:"Wallet"},
      {id: "CDP09", name:"Meghna", city:"Jaipur", age:38, gender:" Female ", payment:" Debit Card"},
      {id: "KK562", name:"Irfan", city:"Delhi", age:25, gender:"Male", payment:"Credit Card"},
      {id: "LPR34", name:"Gagan", city:"Noida", age:51, gender:" Female ", payment:"Debit Card"},
      {id: "MQC11", name:"John", city:"Gurgaon", age:24, gender:"Male", payment:"Wallet"},
      {id: "AXY22", name:"Gurmeet", city:"Jaipur", age:31, gender:"Male", payment:" Debit Card"}
     ]
  ];
  
  let express = require("express");
  let app = express();
  app.use(express.json());
  app.use(function (req, res, next) {
    req.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Methods",
      "GET",
      "POST",
      "OPTIONS",
      "PUT",
      "PATCH",
      "DELETE",
      "HEAD"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "Origin, X-Requested-With,Content-Type,Accept"
    );
    next();
  });
  
  var port = process.env.PORT || 2410;
  
  app.listen(port, () => console.log(`Node app listening on port ${port}!`));
  
  // let { studentsData } = require("./data.js");
  let fs = require("fs");
  let fname = "data.json";
  
  app.get("/resetData", function (req, res) {
    let data = JSON.stringify(studentsData);
    fs.promises
      .writeFile(fname, data)
      .then(() => res.send("Data in file is reset"))
      .catch((err) => res.status(404).send(err));
  });
  
  app.get("/customers", function (req, res) {
    fs.promises
      .readFile(fname, "utf8")
      .then((data) => {
        let studentsArray = JSON.parse(data);
        res.send(studentsArray);
      })
      .catch((err) => res.status(404).send(err));
  });
  
  
  app.post("/customers", function (req, res) {
    let body = req.body;
    fs.promises
      .readFile(fname, "utf8")
      .then((data) => {
        let studentsArray = JSON.parse(data);
        // let maxid = studentsArray.reduce(
        //   (acc, curr) => (curr.id > acc ? curr.id : acc),
        //   0
        // );
        // let newid = maxid + 1;
        let newStudent = { ...body};
        studentsArray.push(newStudent);
        let data1 = JSON.stringify(studentsArray);
        fs.promises
          .writeFile(fname, data1)
          .then(() => res.send(newStudent))
          .catch((err) => res.status(404).send(err));
      })
      .catch((err) => res.status(404).send(err));
  });
  
  app.put("/customers/:id", function (req, res) {
    let body = req.body;
    let id = +req.params.id;
    fs.promises
      .readFile(fname, "utf8")
      .then((data) => {
        let studentsArray = JSON.parse(data);
        let index = studentsArray.findIndex((st) => st.id == id);
        if (index >= 0) {
          let updateStudent = { ...studentsArray[index], ...body };
          studentsArray[index] = updateStudent;
          let data1 = JSON.stringify(studentsArray);
          fs.promises
            .writeFile(fname, data1)
            .then(() => res.send(updateStudent))
            .catch((err) => res.status(404).send(err));
        } else res.status(404).send("NO customers found");
      })
      .catch((err) => res.status(404).send(err));
  });
  
  app.delete("/customers/:id", function (req, res) {
    let id = +req.params.id;
    fs.promises
      .readFile(fname, "utf8")
      .then((data) => {
        let studentsArray = JSON.parse(data);
        let index = studentsArray.findIndex((st) => st.id == id);
        if (index >= 0) {
          let deleteStudents = studentsArray.splice(index, 1);
          let data1 = JSON.stringify(studentsArray);
          fs.promises
            .writeFile(fname, data1)
            .then(() => res.send(deleteStudents))
            .catch((err) => res.status(404).send(err));
        } else res.status(404).send("NO customers found");
      })
      .catch((err) => res.status(404).send(err));
  });
  
  
  
  
  
  // let fs = require("fs");
  // let readLine = require("readline-sync");
  // let entervalue = readLine.question("Enter the Number 1,2,3,4 - ");
  
  // let fname = "hello.txt";
  
  // if (entervalue == 1) {
  //   let txt = "0";
  //   fs.promises
  //     .writeFile(fname, txt)
  //     .then((data) => {
  //       console.log("Create Successful");
  //       fs.promises
  //         .readFile(fname, "utf8")
  //         .then((data) => console.log(data))
  //         .catch((err) => console.log(err));
  //     })
  //     .catch((err) => console.log(err));
  // } else if (entervalue == 2) {
  //   fs.promises
  //     .readFile(fname, "utf8")
  //     .then((data) => console.log(data))
  //     .catch((err) => console.log(err));
  // } else if (entervalue == 3) {
  //   fs.promises
  //     .readFile(fname, "utf8")
  //     .then((data) => {
  //       let num = +data;
  //       let total = num + 2;
  //       let str = total.toString();
  //       console.log(str);
  //       fs.promises.writeFile(fname, str).catch((err) => console.log(err));
  //     })
  //     .catch((err) => console.log(err));
  // } else if (entervalue == 4) {
  //   fs.promises
  //     .readFile(fname, "utf8")
  //     .then((data) => {
  //       let num = +data;
  //       let total = num +3 ;
  //       let str = total.toString();
  //       console.log(str);
  //       fs.promises.writeFile(fname, str).catch((err) => console.log(err));
  //     })
  //     .catch((err) => console.log(err));
  // } else {
  //   console.log("Plase enter the number b/w 1 to 4");
  // }
  
  // let fs = require("fs");
  // let readLine = require("readline-sync");
  
  // let fname = "hello.txt";
  
  // let stores = { A: "0", B: "0" };
  // function writeJson() {
  //   let str = JSON.stringify(stores);
  //   fs.promises
  //     .writeFile(fname, str)
  //     .then(() => console.log("Write success"))
  //     .catch((err) => console.log(err));
  // }
  // function valueAJson() {
  //   fs.promises
  //     .readFile(fname, "utf8")
  //     .then((data) => {
  //       let xvalue = readLine.question("Enter the X Number");
  //       let Yvalue = readLine.question("Enter the Y Number");
  //       let obje = JSON.parse(data);
  //       let num = +obje.A;
  //       let total = num + +(xvalue);
  //       let num1 = +obje.B;
  //       let total1 = num + +(Yvalue);
  //       let str2 = total1.toString();
  //       let str = total.toString();
  //       stores = { A: str, B: str2 };
  //       console.log(stores);
  //       let str1 = JSON.stringify(stores);
  //       fs.promises.writeFile(fname, str1)
  //        .catch((err) => console.log(err));
  //     }) .catch((err) => console.log(err));
  // }
  // function valueBJson() {
  //   fs.promises
  //     .readFile(fname, "utf8")
  //     .then((data) => {
  //       let obje = JSON.parse(data);
  //       let num = +obje.B;
  //       let total = num + 3;
  //       let str = total.toString();
  //       stores = { A: obje.B, B: str };
  //       console.log(stores);
  //       let str1 = JSON.stringify(stores);
  //       fs.promises.writeFile(fname, str1)
  //         .catch((err) => console.log(err));
  //     })
  //     .catch((err) => console.log(err));
  // }
  // function readJSON() {
  //   fs.promises
  //     .readFile(fname, "utf8")
  //     .then((data) => {
  //       let obje = JSON.parse(data);
  //       console.log(obje);
  //     })
  //     .catch((err) => console.log(err));
  // }
  // let option = readLine.question(
  //   "Enter Option 1:Write 2:Read 3:Add   - "
  // );
  // switch (option) {
  //   case "1":
  //     writeJson();
  //     break;
  //   case "2":
  //     readJSON();
  //     break;
  //   case "3":
  //     valueAJson();
  //     break;
  //   // case "4":
  //   //   valueBJson();
  //   //   break;
  // }
  