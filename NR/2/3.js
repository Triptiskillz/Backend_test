let fs = require("fs");
let pr1 = await fs.promises.readFile(fname,"utf8");console.log(pr1);
// let studentsData = [
//   { id: 1, name: "Jack", course: "React", grade: "A", city: "London" },
//   { id: 2, name: "Tim", course: "Node", grade: "A", city: "Paris" },
//   { id: 3, name: "Anna", course: "JS", grade: "B", city: "London" },
//   { id: 4, name: "Bob", course: "Angular", grade: "B", city: "Mumbai" },
//   { id: 5, name: "Mary", course: "React", grade: "A", city: "Tokyo" },
//   { id: 6, name: "Steve", course: "React", grade: "B", city: "London" },
//   { id: 7, name: "Kathy", course: "Node", grade: "C", city: "Tokyo" },
//   { id: 8, name: "Vivian", course: "Node", grade: "D", city: "Mumbai" },
//   { id: 9, name: "Edwards", course: "JS", grade: "D", city: "Mumbai" },
//   { id: 10, name: "George", course: "JS", grade: "C", city: "Tokyo" },
//   { id: 11, name: "Sam", course: "Angular", grade: "B", city: "Paris" },
//   { id: 12, name: "Amy", course: "Angular", grade: "A", city: "Paris" },
//   { id: 13, name: "Jill", course: "JS", grade: "A", city: "Tokyo" },
//   { id: 14, name: "Duke", course: "JS", grade: "B", city: "Mumbai" },
//   { id: 15, name: "Anita", course: "JS", grade: "B", city: "Paris" },
//   { id: 16, name: "Mike", course: "React", grade: "C", city: "London" },
//   { id: 17, name: "Teddy", course: "Node", grade: "C", city: "Tokyo" },
//   { id: 18, name: "Charles", course: "JS", grade: "D", city: "Mumbai" },
//   { id: 19, name: "Bill", course: "Node", grade: "D", city: "London" },
//   { id: 20, name: "Carla", course: "React", grade: "D", city: "Tokyo" },
//   { id: 21, name: "Joanna", course: "JS", grade: "A", city: "Paris" },
//   { id: 22, name: "Pam", course: "JS", grade: "B", city: "Paris" },
// ];

// let express = require("express");
// let app = express();
// app.use(express.json());
// app.use(function (req, res, next) {
//   req.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET",
//     "POST",
//     "OPTIONS",
//     "PUT",
//     "PATCH",
//     "DELETE",
//     "HEAD"
//   );
//   res.header(
//     "Access-Control-Allow-Methods",
//     "Origin, X-Requested-With,Content-Type,Accept"
//   );
//   next();
// });

// var port = process.env.PORT || 2410;

// app.listen(port, () => console.log(`Node app listening on port ${port}!`));

// // let { studentsData } = require("./data.js");
// let fs = require("fs");
// let fname = "data.json";
// let readline = require("readline-sync");

// app.get("/svr/resetData", async function (req, res) {
//   try {
//     let data = JSON.stringify(studentsData);
//     await fs.promises.writeFile(fname, data);
//     res.send("Data in file is reset");
//   } catch (err) {
//     res.status(404).send(err);
//   }
// });

// app.get("/svr/students", async function (req, res) {
//   try {
//     let data = await fs.promises.readFile(fname, "utf8");
//     let studentsArray = JSON.parse(data);
//     res.send(studentsArray);
//   } catch (err) {
//     res.status(404).send(err);
//   }
// });

// app.get("/svr/students/:id", async function (req, res) {
//   let id = +req.params.id;
//   try {
//     let data = await fs.promises.readFile(fname, "utf8");
//     let studentsArray = JSON.parse(data);
//     let student = studentsArray.find((st) => st.id === id);
//     res.send(student);
//   } catch (err) {
//     res.status(404).send(err);
//   }
// });

// app.post("/svr/students", async function (req, res) {
//   let body = req.body;
//   try {
//     let data = await fs.promises.readFile(fname, "utf8");
//     let studentsArray = JSON.parse(data);
//     let maxid = studentsArray.reduce(
//       (acc, curr) => (curr.id > acc ? curr.id : acc),
//       0
//     );
//     let newid = maxid + 1;
//     let newStudent = { ...body, id: newid };
//     studentsArray.push(newStudent);
//     let data1 = JSON.stringify(studentsArray);
//     await fs.promises.writeFile(fname, data1);
//     res.send(data1);
//   } catch (err) {
//     res.status(404).send(err);
//   }
// });

// app.put("/svr/students/:id", async function (req, res) {
//   let body = req.body;
//   let id = +req.params.id;
//   try {
//     let data = await fs.promises.readFile(fname, "utf8");
//     let studentsArray = JSON.parse(data);
//     let index = studentsArray.findIndex((st) => st.id == id);
//     if (index >= 0) {
//       let updateStudent = { ...studentsArray[index], ...body };
//       studentsArray[index] = updateStudent;
//       let data1 = JSON.stringify(studentsArray);
//       await fs.promises.writeFile(fname, data1);
//       res.send(updateStudent);
//     } else res.status(404).send("NO student found");
//   } catch (err) {
//     res.status(404).send(err);
//   }
// });

// app.delete("/svr/students/:id", async function (req, res) {
//   let id = +req.params.id;
//   try {
//     let data = await fs.promises.readFile(fname, "utf8");
//     let studentsArray = JSON.parse(data);
//     let index = studentsArray.findIndex((st) => st.id == id);
//     if (index >= 0) {
//       let deleteStudents = studentsArray.splice(index, 1);
//       let data1 = JSON.stringify(studentsArray);
//       await fs.promises.writeFile(fname, data1);
//       res.send(deleteStudents);
//     } else res.status(404).send("NO student found");
//   } catch (err) {
//     res.status(404).send(err);
//   }
// });

// let courseData = {
//   course: "Node.js",
//   students: [
//     { name: "Jack", age: 34 },
//     { name: "Sam", age: 26 },
//     { name: "Tim", age: 19 },
//   ],
// };

// async function writeJson() {
//   try {
//     let data = JSON.stringify(courseData);
//     await fs.promises.writeFile(fname, data);
//     console.log("write success");
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function enrollNewStudent() {
//   let name = readline.question("enter name of student :");
//   let age = readline.question("Enter age:");
//   let newstudent = { name, age };
//   try {
//     let data2 = await fs.promises.readFile(fname, "utf8");
//     let obj = JSON.parse(data2);
//     obj.students.push(newstudent);
//     let data1 = JSON.stringify(obj);
//     await fs.promises.writeFile(fname, data1);
//     console.log("student enrolled");
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function readJson() {
//   try {
//    let data =  await fs.promises.readFile(fname, "utf8");
//    console.log("In string forma:", data);
//    let obj = JSON.parse(data);
//    console.log(obj)
//   } catch (err) {
//     console.log(err);
//   }
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

// let fname = readline.question("Enter name of file:");
// let txt = readline.question("Enter the text to be appended to file:");

// async function exer(filename, data) {
//   try {
//     await fs.promises.access(filename);
//     try {
//       let data1 = await fs.promises.readFile(filename, "utf8");
//       console.log("Before::", data1);
//       await fs.promises.appendFile(filename, data);
//       console.log("Append success");
//       let data2 = await fs.promises.readFile(filename, "utf8");
//       console.log("After::", data2);
//     } catch (err) {
//       console.log(err);
//     }
//   } catch (err) {
//     await fs.promises.writeFile(filename, data);
//     console.log("write success");
//     let data3 = await fs.promises.readFile(filename, "utf8");
//     console.log(data3);
//   }
// }
// exer(fname, txt);

// let txt = readline.question("enter text to be appended");
// async function exer(filename, data) {
//   try {
//     await fs.promises.appendFile(filename, data);
//     let data1 = await fs.promises.readFile(filename,'utf8');
//     console.log(data1);
//   } catch (err) {
//     console.log(err);
//   }
// }
// exer(fname, txt);
// async function getStat(filename) {
//   console.log("stat:", filename);
//   try {
//     let data = await fs.promises.stat(filename);
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// }

// async function checkAccess(filename) {
//   console.log("access:", filename);
//   try {
//     let data = await fs.promises.access(filename);
//     console.log("Exists");
//   } catch (err) {
//     console.log("Does not exist");
//   }
// }

// async function readFile(filename) {
//   console.log("readFile:", filename);
//   try {
//     let data = await fs.promises.readFile(filename,'utf8');
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }

// }

// async function writeFile(filename, data) {
//   console.log("writeFile:", filename);
//   try {
//    await fs.promises.writeFile(filename,data);

//   } catch (err) {
//     console.log(err);
//   }
// }
// async function appendFile(filename, data) {
//   console.log("appendFile:", filename);
//   try {
//      await fs.promises.appendFile(filename,data);
//   } catch (err) {
//     console.log(err);
//   }
// }

// getStat(fname);
// checkAccess(fname);
// readFile(fname);
// writeFile(fname, "Hello World");
// appendFile(fname, "welcome to world");
// readFile(fname);
