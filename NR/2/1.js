let studentsData = [
    { id: 1, name: "Jack", course: "React", grade: "A", city: "London" },
    { id: 2, name: "Tim", course: "Node", grade: "A", city: "Paris" },
    { id: 3, name: "Anna", course: "JS", grade: "B", city: "London" },
    { id: 4, name: "Bob", course: "Angular", grade: "B", city: "Mumbai" },
    { id: 5, name: "Mary", course: "React", grade: "A", city: "Tokyo" },
    { id: 6, name: "Steve", course: "React", grade: "B", city: "London" },
    { id: 7, name: "Kathy", course: "Node", grade: "C", city: "Tokyo" },
    { id: 8, name: "Vivian", course: "Node", grade: "D", city: "Mumbai" },
    { id: 9, name: "Edwards", course: "JS", grade: "D", city: "Mumbai" },
    { id: 10, name: "George", course: "JS", grade: "C", city: "Tokyo" },
    { id: 11, name: "Sam", course: "Angular", grade: "B", city: "Paris" },
    { id: 12, name: "Amy", course: "Angular", grade: "A", city: "Paris" },
    { id: 13, name: "Jill", course: "JS", grade: "A", city: "Tokyo" },
    { id: 14, name: "Duke", course: "JS", grade: "B", city: "Mumbai" },
    { id: 15, name: "Anita", course: "JS", grade: "B", city: "Paris" },
    { id: 16, name: "Mike", course: "React", grade: "C", city: "London" },
    { id: 17, name: "Teddy", course: "Node", grade: "C", city: "Tokyo" },
    { id: 18, name: "Charles", course: "JS", grade: "D", city: "Mumbai" },
    { id: 19, name: "Bill", course: "Node", grade: "D", city: "London" },
    { id: 20, name: "Carla", course: "React", grade: "D", city: "Tokyo" },
    { id: 21, name: "Joanna", course: "JS", grade: "A", city: "Paris" },
    { id: 22, name: "Pam", course: "JS", grade: "B", city: "Paris" },
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
  
  app.get("/svr/resetData", function (req, res) {
    let data = JSON.stringify(studentsData);
    fs.promises
      .writeFile(fname, data)
      .then(() => res.send("Data in file is reset"))
      .catch((err) => res.status(404).send(err));
  });
  
  app.get("/svr/students", function (req, res) {
    fs.promises
      .readFile(fname, "utf8")
      .then((data) => {
        let studentsArray = JSON.parse(data);
        res.send(studentsArray);
      })
      .catch((err) => res.status(404).send(err));
  });
  
  app.get("/svr/students/:id", function (req, res) {
    let id = +req.params.id;
    fs.promises
      .readFile(fname, "utf8")
      .then((data) => {
        let studentsArray = JSON.parse(data);
        let student = studentsArray.find((st) => st.id === id);
        if (student) res.send(student);
        else res.status(404).send("No student found");
      })
      .catch((err) => res.status(404).send("No student found"));
  });
  
  app.post("/svr/students", function (req, res) {
    let body = req.body;
    fs.promises
      .readFile(fname, "utf8")
      .then((data) => {
        let studentsArray = JSON.parse(data);
        let maxid = studentsArray.reduce(
          (acc, curr) => (curr.id > acc ? curr.id : acc),
          0
        );
        let newid = maxid + 1;
        let newStudent = { ...body, id: newid };
        studentsArray.push(newStudent);
        let data1 = JSON.stringify(studentsArray);
        fs.promises
          .writeFile(fname, data1)
          .then(() => res.send(newStudent))
          .catch((err) => res.status(404).send(err));
      })
      .catch((err) => res.status(404).send(err));
  });
  
  app.put("/svr/students/:id", function (req, res) {
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
        } else res.status(404).send("NO student found");
      })
      .catch((err) => res.status(404).send(err));
  });
  
  app.delete("/svr/students/:id", function (req, res) {
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
        } else res.status(404).send("NO student found");
      })
      .catch((err) => res.status(404).send(err));
  });
  
  // let courseData = {
  //   course: "Node.js",
  //   students: [
  //     { name: "Jack", age: 34 },
  //     { name: "Sam", age: 26 },
  //     { name: "Tim", age: 19 },
  //   ],
  // };
  
  // function writeJson() {
  //   let data = JSON.stringify(courseData);
  //   fs.promises
  //     .writeFile(fname, data)
  //     .then(() => console.log("Write success"))
  //     .catch((err) => console.log(err));
  // }
  
  // function enrollNewStudent() {
  //   let name = readline.question("enter name of student :");
  //   let age = readline.question("Enter age:");
  //   let newstudent = { name: name, age: age };
  //   fs.promises
  //     .readFile(fname, "utf8")
  //     .then((data) => {
  //       let obj = JSON.parse(data);
  //       obj.students.push(newstudent);
  //       let data1 = JSON.stringify(obj);
  //       fs.promises
  //         .writeFile(fname, data1)
  //         .then(() => console.log("New student enrolled"))
  //         .catch((err) => console.log(err));
  //     })
  //     .catch((err) => console.log(err));
  // }
  
  // function readJson() {
  //   fs.promises
  //     .readFile(fname, "utf8")
  //     .then((data) => {
  //       console.log("In string forma:", data);
  //       let obj = JSON.parse(data);
  //       console.log(obj);
  //     })
  //     .catch((err) => console.log(err));
  // }
  
  // let option = readline.question(
  //   "Enter Option 1:Write 2:Enroll student 3:Read - "
  // );
  
  // switch (option) {
  //   case "1":
  //     writeJson();
  //     break;
  //   case "2":
  //     enrollNewStudent();
  //     break;
  //   case "3":
  //     readJson();
  //     break;
  // }
  // function getStat(filename) {
  //   console.log("stat:", filename);
  //   fs.promises
  //     .stat(filename)
  //     .then((content) => console.log(content))
  //     .catch((err) => console.log(err));
  // }
  
  // function checkAccess(filename) {
  //   console.log("access:", filename);
  //   fs.promises
  //     .access(filename)
  //     .then(() => console.log("Exists"))
  //     .catch((err) => console.log("Does not exist"));
  // }
  
  // function readFile(filename) {
  //   console.log("readFile:", filename);
  //   fs.promises
  //     .readFile(filename,'utf8')
  //     .then((content) => console.log(content))
  //     .catch((err) => console.log(err));
  // }
  
  // function writeFile(filename,data) {
  //   console.log("writeFile:", filename);
  //   fs.promises
  //     .writeFile(filename,data)
  //     // .then((content) => console.log(content))
  //     .catch((err) => console.log(err));
  // }
  // function appendFile(filename,data) {
  //   console.log("appendFile:", filename);
  //   fs.promises
  //     .appendFile(filename,data)
  //     // .then((content) => console.log(content))
  //     .catch((err) => console.log(err));
  // }
  
  // let fname = readline.question("Enter name of file:");
  // let txt = readline.question("Enter the text to be appended to file:");
  
  // fs.promises
  //   .access(fname)
  //   .then(() =>
  //     fs.promises
  //       .readFile(fname, "utf8")
  //       .then((content) => {
  //         console.log("Before::", content);
  //         fs.promises.appendFile(fname, txt).then(() => {
  //           console.log("Append success");
  //           fs.promises
  //             .readFile(fname, "utf8")
  //             .then((content) => console.log("After::", content));
  //         });
  //       })
  //       .catch((err) => console.log(err))
  //   )
  //   .catch((err) =>
  //     fs.promises
  //       .writeFile(fname, txt)
  //       .then(() => {
  //         console.log("Write success");
  //         fs.promises
  //           .readFile(fname, "utf8")
  //           .then((content) => console.log(content));
  //       })
  //       .catch((err) => console.log(err))
  //   );
  // fs.promises
  // .appendFile(fname,txt)
  // .then(()=>fs.promises.readFile(fname,"utf8"))
  // .then((content)=>console.log(content))
  // .catch((err)=>console.log(err))
  
  // getStat(fname);
  // checkAccess(fname);
  // readFile(fname)
  // writeFile(fname,"Hello World")
  // appendFile(fname,"welcome to world")
  