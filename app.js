const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const users = require("./routes/api/users");
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;

app.use(bodyParser.urlencoded({
  extended: true
}));

// mongoose
//   .connect(db, {
//     useUnifiedTopology: true
//   })
//   .then(() => {
//     console.log("Connected to mongoDB");
//   })
//   .catch(err => console.log(err));

// app.use("/api/users", users);

// Setup the path
app.get("/", (req, res) => {
  // res.send("Hello World!");
  res.sendFile(__dirname + "/client/src/App.vue")
})

// Check the environmental variable port, if it exist, use it. Otherwise, use 5000 
const port = process.env.PORT || 5000;

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// })
io.on("connect", socket => {
  console.log("connect")
})

http.listen(port)

