let express = require("express");
let app = express();
let axios = require("axios");
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

// GET baseURL/students
// •GET baseURL/students/:id
// •GET baseURL/students/course/:name
// •POST baseURL/students
// •PUT baseURL/students/:id
// •DELETE baseURL/students/:id

let baseURL = "https://repo-8qu2.onrender.com/studentServer";
app.get("/testServer/getToken", async function (req, res) {
  try {
    let response = await axios.get(baseURL + "/getToken");
    console.log(response.data);
    res.send(""+response.data);
  } catch (err) {
    if (err.response) {
      let { status, statusText } = err.response;
      console.log(status, statusText);
      res.status(status).send(statusText);
    } else res.status(404).send(err);
  }
});

app.get("/testServer/students", async function (req, res) {
  let token = req.header("authorization") || "dummyvalue";
  try {
    let response = await axios.get(baseURL + "/students", {
      headers: { authorization: token },
    });
    console.log(response.data);
    res.send(response.data);
  } catch (err) {
    if (err.response) {
      let { status, statusText } = err.response;
      console.log(status, statusText);
      res.status(status).send(statusText);
    } else res.status(404).send(err);
  }
});

app.get("/testServer/students/:id", async function (req, res) {
  let token = req.header("authorization") || "dummyvalue";
  let { id } = req.params;
  try {
    let response = await axios.get(baseURL + "/students/" + id, {
      headers: { authorization: token },
    });
    console.log(response.data);
    res.send(response.data);
  } catch (err) {
    if (err.response) {
      let { status, statusText } = err.response;
      console.log(status, statusText);
      res.status(status).send(statusText);
    } else res.status(404).send(err);
  }
});



app.get("/testServer/students/course/:name", async function (req, res) {
  let token = req.header("authorization") || "dummyvalue";
  let { name } = req.params;
  try {
    let response = await axios.get(baseURL + "/students/course/" + name, {
      headers: { authorization: token },
    });
   let json= {method:"GET", url:`localhost:2410/testServer/students/course/${name}`, body:response.data}
    console.log(json);
    res.send(json);
  } catch (err) {
    if (err.response) {
      let { status, statusText } = err.response;
      console.log(status, statusText);
      res.status(status).send(statusText);
    } else res.status(404).send(err);
  }
});
app.get("/testServer/allRequests", async function (req, res) {
  let token = req.header("authorization") || "dummyvalue";
  let { name } = req.params;
  try {
    let response = await axios.get(baseURL + "/students/allRequests",{
      headers: { authorization: token },
    });
   let json= {method:"GET", url:`localhost:2410/testServer/allRequests`, body:response.data}
    console.log(json);
    res.send(json);
  } catch (err) {
    if (err.response) {
      let { status, statusText } = err.response;
      console.log(status, statusText);
      res.status(status).send(statusText);
    } else res.status(404).send(err);
  }
});
app.post("/testServer/students", async function (req, res) {
  let token = req.header("authorization");
  if (!token) res.status(401).send("No token found.Provide a valid token");
  else {
    try {
      let body = req.body;
      let response = await axios.post(baseURL + "/students", body, {
        headers: { authorization: token },
      });
      console.log(response.data);
      res.send(response.data);
    } catch (err) {
      if (err.response) {
        let { status, statusText } = err.response;
        console.log(status, statusText);
        res.status(status).send(statusText);
      } else res.status(404).send(err);
    }
  }
});

app.put("/testServer/students/:id", async function (req, res) {
  let token = req.header("authorization");
  if (!token) res.status(401).send("No token found.Provide a valid token");
  else {
    try {
      let { id } = req.params;

      let body = req.body;
      let response = await axios.put(baseURL + "/students/" + id, body, {
        headers: { authorization: token },
      });
      console.log(response.data);
      res.send(response.data);
    } catch (err) {
      if (err.response) {
        let { status, statusText } = err.response;
        console.log(status, statusText);
        res.status(status).send(statusText);
      } else res.status(404).send(err);
    }
  }
});
app.delete("/testServer/students/:id", async function (req, res) {
  let token = req.header("authorization");
  if (!token) res.status(401).send("No token found.Provide a valid token");
  else {
    try {
      let { id } = req.params;
      let response = await axios.delete(baseURL + "/students/" + id, {
        headers: { authorization: token },
      });
      console.log(response.data);
      res.send(response.data);
    } catch (err) {
      if (err.response) {
        let { status, statusText } = err.response;
        console.log(status, statusText);
        res.status(status).send(statusText);
      } else res.status(404).send(err);
    }
  }
});

