let express = require("express");
let app = express();
let axios = require("axios");
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS, PUT, POST, DELETE");
  // res.header("Access-Control-Expose-Headers", "Authorization");
  // res.header("Access-Control-Expose-Headers", "X-Auth-Token");
  next();
});

var port = process.env.PORT || 2410;

app.listen(port, () => console.log(`Node app listening on port ${port}!`));

// let baseURL = "https://repo-8qu2.onrender.com/studentServer";

app.post("/apifetech", async function (req, res) {
  let body = req.body;
  console.log(body.authorization, body.keyValue);
  if (body.authorization == "") {
    var token = "";
  } else {
    token = body.keyValue;
  }

  if (body.method == "GET") {
    try {
      let url = body.url;

      let response = await axios.get(url, {
        headers: { authorization: token },
      });
      //   console.log(response.data);
      if (url == "https://repo-8qu2.onrender.com/studentServer/getToken") {
        // console.log("token");
        res.send("" + response.data);
      } else {
        res.send(response.data);
      }
    } catch (err) {
      if (err.response) {
        let { status, statusText } = err.response;
        console.log(status, statusText);
        res.status(status).send(statusText);
      } else res.status(404).send(err);
    }
  } else if (body.method == "POST") {
    if (token == "")
      res.status(401).send("No token found.Provide a valid token");
    else {
      try {
        let url = body.url;
        let newbody = body.body;

        let item = JSON.parse(newbody);
        //   console.log(item)
        let response = await axios.post(url, item, {
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
  } else if (body.method == "PUT") {
    if (token == "")
      res.status(401).send("No token found.Provide a valid token");
    else {
      try {
        let url = body.url;
        let newbody = body.body;

        let item = JSON.parse(newbody);
        let response = await axios.put(url, item, {
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
  } else if (body.method == "DELETE") {
    if (token == "")
      res.status(401).send("No token found.Provide a valid token");
    else {
      try {
        let url = body.url;
        let response = await axios.delete(url, {
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
  }
});

// app.post("/apifetech", async function (req, res) {
//     let body = req.body;
//     console.log(body);
//     if (body.method == "GET") {
//       try {
//         let url = body.url;
//         let response = await axios.get(url);
//         console.log(response.data);
//         res.send(response.data);
//       } catch (err) {
//         if (err.response) {
//           let { status, statusText } = err.response;
//           console.log(status, statusText);
//           res.status(status).send(statusText);
//         } else res.status(404).send(err);
//       }
//     } else if (body.method == "POST") {
//       try {
//         let url = body.url;
//         let newbody = body.body;

//         let item = JSON.parse(newbody)
//       //   console.log(item)
//         let response = await axios.post(url, item);
//         console.log(response.data);
//         res.send(response.data);
//       } catch (err) {
//         if (err.response) {
//           let { status, statusText } = err.response;
//           console.log(status, statusText);
//           res.status(status).send(statusText);
//         } else res.status(404).send(err);
//       }
//     }
//   });
