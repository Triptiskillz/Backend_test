const { json } = require("express");
var express = require("express");
var app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS");
  next();
});
const port = process.env.PORT || 2410;

customers = [
  {
    custId: 1,
    name: "ABC",
    password: "abc1234",
    role: "admin",
    email: "abc@gmail.com",
  },
  {
    custId: 2,
    name: "Willie",
    password: "willie1234",
    role: "student",
    email: "willie@gmail.com",
  },
  {
    custId: 3,
    name: "Jack",
    password: "jack1234",
    role: "faculty",
    email: "jack@gmail.com",
  },
  {
    custId: 4,
    name: "James",
    password: "james1234",
    role: "student",
    email: "james@gmail.com",
  },
  {
    custId: 5,
    name: "Harry",
    password: "harry1234",
    role: "faculty",
    email: "harry@gmail.com",
  },
  {
    custId: 6,
    name: "Tia",
    password: "tia1234",
    role: "student",
    email: "tia@gmail.com",
  },
  {
    custId: 7,
    name: "Aditya",
    password: "aditya123",
    role: "faculty",
    email: "aditya@gmail.com",
  },
  {
    custId: 8,
    name: "Sonu",
    password: "sonu1234",
    role: "student",
    email: "sonu@gmail.com",
  },
  {
    custId: 9,
    name: "Ellie",
    password: "ellie1234",
    role: "student",
    email: "ellie@gmail.com",
  },
  {
    custId: 10,
    name: "Gia",
    password: "gia1234",
    role: "faculty",
    email: "gia@gmail.com",
  },
];
courses = [
  {
    courseId: 1,
    name: "ANGULAR",
    code: "ANG97",
    description: "All fundamentals of Angular 7",
    faculty: ["Daniel", "Jack"],
    students: ["Sam"],
  },
  {
    courseId: 2,
    name: "JAVASCRIPT",
    code: "JS124",
    description: "Intoduction to javascript",
    faculty: ["Aditya"],
    students: ["James", "Joy", "Monu", "Rita"],
  },
  {
    courseId: 3,
    name: "REACT",
    code: "RCT56",
    description: "React Javascript library",
    faculty: ["Jack", "Gia"],
    students: ["Raima", "Rita", "Sonu", "James"],
  },
  {
    courseId: 4,
    name: "BOOTSTRAP",
    code: "BS297",
    description: "Bootstrap Designing Framework",
    faculty: [],
    students: ["James", "Tia", "Ellie"],
  },
  {
    courseId: 5,
    name: "CSS",
    code: "CS365",
    description: "Basic stylesheet language",
    faculty: [],
    students: ["James", "Rita", "Monica"],
  },
  {
    courseId: 6,
    name: "REST AND MICROSERVICES",
    code: "RM392",
    description: "Introduction to Microservices",
    faculty: [],
    students: ["Sam"],
  },
  {
    courseId: 7,
    name: "NODE",
    code: "ND725",
    description: "Introduction to Node",
    faculty: ["Sonia"],
    students: ["Saransh", "Shrey", "Monica"],
  },
];
faculties = [
  { id: 5, name: "Daniel", courses: ["ANGULAR"] },
  { id: 4, name: "Sonia", courses: ["NODE"] },
  { id: 3, name: "Jack", courses: ["REACT", "ANGULAR"] },
  { id: 2, name: "Gia", courses: ["REACT"] },
  { id: 1, name: "Aditya", courses: ["ANGULAR"] },
];
classes = [
  {
    classId: 1,
    course: "REACT",
    time: "07:45",
    endTime: "08:45",
    topic: "Redux",
    facultyName: "Jack",
  },
  {
    classId: 2,
    course: "ANGULAR",
    time: "15:45",
    endTime: "17:40",
    topic: "Component",
    facultyName: "Jack",
  },
  {
    classId: 3,
    course: "JAVASCRIPT",
    time: "15:45",
    endTime: "17:40",
    topic: "Component",
    facultyName: "Aditya",
  },
];
students = [
  {
    id: 16,
    name: "Willie",
    dob: "31-July-1997",
    gender: "male",
    about: "Pursuing Graduation",
    courses: ["ANGULAR", "NODE"],
  },
  {
    id: 15,
    name: "Tia",
    dob: "30-July-1997",
    gender: "male",
    about: "Pursuing Graduation",
    courses: [],
  },
  {
    id: 14,
    name: "Apoorv",
    dob: "31-August-1998",
    gender: "male",
    about: "Want to learn new technologies",
    courses: [],
  },
  {
    id: 13,
    name: "Joy",
    dob: "31-July-1997",
    gender: "male",
    about: "Pursuing Graduation",
    courses: ["JAVASCRIPT"],
  },
  {
    id: 12,
    name: "Rachel",
    dob: "31-August-1998",
    gender: "female",
    about: "Pursuing Graduation",
    courses: [],
  },
  {
    id: 11,
    name: "Monica",
    dob: "30-July-1997",
    gender: "female",
    about: "Want to learn new technologies",
    courses: ["CSS", "NODE"],
  },
  {
    id: 10,
    name: "Monu",
    dob: "12-May-1997",
    gender: "male",
    about: "Pursuing Graduation",
    courses: ["JAVASCRIPT"],
  },
  {
    id: 9,
    name: "Sonu",
    dob: "12-May-1997",
    gender: "male",
    about: "Pursuing Graduation",
    courses: ["REACT"],
  },
  {
    id: 8,
    name: "Raima",
    dob: "30-July-1997",
    gender: "female",
    about: "Want to learn new technologies",
    courses: ["REACT"],
  },
  {
    id: 7,
    name: "Rita",
    dob: "31-August-1998",
    gender: "female",
    about: "Pursuing Graduation",
    courses: ["JAVASCRIPT", "REACT", "CSS"],
  },
  {
    id: 6,
    name: "Shrey",
    dob: "12-May-1997",
    gender: "male",
    about: "Pursuing Graduation",
    courses: ["NODE"],
  },
  {
    id: 5,
    name: "Saransh",
    dob: "31-July-1997",
    gender: "male",
    about: "Want to learn new technologies",
    courses: ["NODE"],
  },
  {
    id: 4,
    name: "Sanya",
    dob: "31-July-1997",
    gender: "male",
    about: "Want to learn new technologies",
    courses: [],
  },
  {
    id: 3,
    name: "James",
    dob: "12-July-1994",
    gender: "male",
    about: "Pursuing Graduation",
    courses: ["JAVASCRIPT", "BOOTSTRAP", "CSS", "REACT"],
  },
  {
    id: 2,
    name: "Sam",
    dob: "12-July-1994",
    gender: "male",
    about: "Pursuing Graduation",
    courses: ["ANGULAR", "REST AND MICROSERVICES"],
  },
  {
    id: 1,
    name: "Ellie",
    dob: "12-June-1992",
    gender: "female",
    about: "Want to learn new technologies",
    courses: ["BOOTSTRAP"],
  },
];
customerList = [];

StudentList = ["Saransh", "Sanya", "Sam","Joy","Monu","Rita","Raima","Shrey","Monica"];
FacList = ["Daniel", "Sonia"];

app.post("/login", function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var cust = customers.find(function (item) {
    return item.email === email && item.password === password;
  });
  console.log(cust);
  var custRec = {
    email: cust.email,
    role: cust.role,
    name: cust.name,
  };
  res.send(custRec);
});

app.post("/register", function (req, res) {
  const cust = {
    name: req.body.name,
    password: req.body.password,
    role: req.body.role,
    email: req.body.email,
  };
  if (req.body.role == "student") {
    StudentList.push(req.body.name);
  } else if (req.body.role == "faculty") {
    FacList.push(req.body.name);
  }

  customers.unshift(cust);
  var customerRes = {
    name: req.body.name,
    role: req.body.role,
    email: req.body.email,
  };

  res.send(customerRes);
});

app.get("/getStudents", function (req, res) {
  let list = students;
  let courses = req.query.courses;
  if (courses) {
    let courseArr = courses.split(",");

    list = list.filter((st) =>
      courseArr.find((c1) => c1 == st.courses.filter((e) => e == c1))
    );
  }
  let result = pagination(list, parseInt(req.query.page));
  // console.log("Array ", result);

  res.json({
    page: parseInt(req.query.page),
    items: result,
    totalItems: result.length,
    totalNum: list.length,
  });
});
app.get("/getFaculties", function (req, res) {
  let list = faculties;
  let courses = req.query.courses;

  if (courses) {
    let courseArr = courses.split(",");

    list = list.filter((st) =>
      courseArr.find((c1) => c1 == st.courses.filter((e) => e == c1))
    );
  }
  let result = pagination(list, parseInt(req.query.page));
  // console.log("Array ", result);

  res.json({
    page: parseInt(req.query.page),
    items: result,
    totalItems: result.length,
    totalNum: list.length,
  });
});
app.get("/getCourses", function (req, res) {
  let list = courses;
  res.json({
    items: list,
  });
});

app.get("/putCourse/:id", function (req, res) {
  let id = +req.params.id;
  let obj = courses.find((obj1) => obj1.courseId === id);
  obj ? res.send(obj) : res.send("not found");
});

app.put("/putCourse/:id", function (req, res) {
  let id = +req.params.id;
  let course = req.body;
  let student = req.body.students;
  let name = req.body.name;
  let facult = req.body.faculty;
  let index = courses.findIndex((obj1) => obj1.courseId === id);
  if (index >= 0) {
    courses[index] = course;

    let list = students.filter((c1) => student.find((e) => e == c1.name));
    let addcourses = list.filter((c1) => c1.courses.find((e) => e == name));

    let finalArray = list.filter((f) => !addcourses.includes(f));

    let NewList = student.filter((c1) => students.find((e) => e.name == c1));
    let NewfinalArray = student.filter((f) => !NewList.includes(f));

    NewfinalArray.map((e) => {
      let maxid = students.reduce(
        (acc, curr) => (curr.id > acc ? curr.id : acc),
        0
      );
      let newid = maxid + 1;
      let n = [name];
      let json = {
        id: newid,
        name: e,
        dob: "",
        gender: "",
        about: "",
        courses: n,
      };
      students.push(json);
    });
    finalArray.map((e) => {
      students.map((s) => {
        if (e.name == s.name) {
          let index = students.findIndex((a) => a.name == e.name);
          let n = [...e.courses, name];
          let json = {
            id: e.id,
            name: e.name,
            dob: e.dob,
            gender: e.gender,
            about: e.about,
            courses: n,
          };
          students[index] = json;
        }
      });
    });

    let list1 = faculties.filter((c1) => facult.find((e) => e == c1.name));
    let addcourses1 = list1.filter((c1) => c1.courses.find((e) => e == name));
    let finalArray1 = list1.filter((f) => !addcourses1.includes(f));

    finalArray1.map((e) => {
      faculties.map((s) => {
        if (e.name == s.name) {
          let index = faculties.findIndex((a) => a.name == e.name);
          let n = [...e.courses, name];
          let json = {
            id: e.id,
            name: e.name,
            courses: n,
          };

          faculties[index] = json;
          console.log(faculties);
        }
      });
    });

    let NewList1 = facult.filter((c1) => faculties.find((e) => e.name == c1));
    let NewfinalArray1 = facult.filter((f) => !NewList1.includes(f));

    NewfinalArray1.map((e) => {
      let maxid = faculties.reduce(
        (acc, curr) => (curr.id > acc ? curr.id : acc),
        0
      );
      let newid = maxid + 1;
      let n = [name];
      let json = {
        id: newid,
        name: e,
        dob: "",
        gender: "",
        about: "",
        courses: n,
      };
      faculties.unshift(json);
    });
    res.send(course);
  } else {
    res.send("not found");
  }
});
app.get("/getStudentNames", function (req, res) {
  res.send(StudentList);
});
app.get("/getFacultyNames", function (req, res) {
  res.send(FacList);
});

function pagination(obj, page) {
  const postCount = obj.length;
  const perPage = 10;
  //const pageCount = Math.ceil(postCount / perPage);
  var resArr = obj;
  resArr = resArr.slice(page * 3 - 3, page * 3);
  return resArr;
}
customers.map((e) => {
  if (e.role == "student") {
    StudentList.push(e.name);
  } else if (e.role == "faculty") {
    FacList.push(e.name);
  }
});
//student
app.get("/getStudentDetails/:name", function (req, res) {
  let list = students;
  let name = req.params.name;
  if (name) {
    list = list.find((e) => e.name == name);
  }
  res.json(list);
});
app.get("/getStudentCourse/:name", function (req, res) {
  let list = courses;
  let name = req.params.name;
  if (name) {
    list = list.filter((e) => e.students.find((s) => s == name));
  }
  res.json({
    items: list,
  });
});
app.get("/getStudentClass/:name", function (req, res) {
  let list = classes;
  let name = req.params.name;
  if (name) {
    //course
    let list1 = courses.filter((e) => e.students.find((s) => s == name));

    list = list.filter((e) => list1.find((s) => s.name == e.course));
  }
  console.log(list);
  res.json({
    items: list,
  });
});
app.post("/postStudentDetails", function (req, res) {
  let list = students;
  let name = req.body.name;
  let list1 = list.find((e) => e.name == name);
  if (list1) {
    var add = {
      id: list1.id,
      name: list1.name,
      dob: req.body.dob,
      gender: req.body.gender,
      about: req.body.about,
      courses: list1.courses,
    };
  } else {
    let maxid = students.reduce(
      (acc, curr) => (curr.id > acc ? curr.id : acc),
      0
    );
    let newid = maxid + 1;
    add = {
      id: newid,
      name: req.body.name,
      dob: req.body.dob,
      gender: req.body.gender,
      about: req.body.about,
      courses: [],
    };
  }
  students.unshift(add);
  res.send(add);
});

// faculty
app.get("/getFacultyCourse/:name", function (req, res) {
  let list = courses;
  let name = req.params.name;
  if (name) {
    list = list.filter((e) => e.faculty.find((s) => s == name));
  }
  res.json({
    items: list,
  });
});

app.get("/getFacultyClass/:name", function (req, res) {
  let list = classes;
  let name = req.params.name;
  if (name) {
    //course
    let list1 = courses.filter((e) => e.faculty.find((s) => s == name));

    list = list.filter((e) => list1.find((s) => s.name == e.course));
  }
  res.json({
    items: list,
  });
});
app.get("/getClass/:id", function (req, res) {
  let list = classes;
  let id = +(req.params.id);
  list = list.find((e) => e.classId == id);
  res.json(list);
});
app.post("/postClass", function (req, res) {
  let maxid = classes.reduce((acc, curr) => (curr.id > acc ? curr.id : acc), 0);
  let newid = maxid + 1;
  add = {
    classId: newid,
    course: req.body.course,
    time: req.body.time,
    endTime: req.body.endTime,
    topic: req.body.topic,
    facultyName: req.body.facultyName,
  };
  classes.unshift(add);
  res.send(add);
});

app.put("/postClass/:id", function (req, res) {
  let id = +req.params.id;
  let cla = req.body;

  let index = classes.findIndex((obj1) => obj1.classId === id);
  if (index >= 0) {
    classes[index] = cla;
  res.send(classes);
} else {
  res.send("not found");
}
});
app.listen(port, () => console.log(`Node app listening on port ${port}!`));
