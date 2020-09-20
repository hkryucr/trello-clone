const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const users = require("./routes/api/users");
const boards = require("./routes/api/boards");
const Column = require("./models/Column");

const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose
  .connect(db, {
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch(err => console.log(err));


// Setup the path
app.get("/", (req, res) => {
  res.send("Hello World!");
  // res.sendFile(__dirname + "/client/src/App.vue")
})

app.use("/api/users", users);
// app.use("/api/boards", boards);

// Check the environmental variable port, if it exist, use it. Otherwise, use 5000 
const port = process.env.PORT || 5000;

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`);
// })

/************************************************************************************
 *                             Socket
 ***********************************************************************************/
const http = require("http").createServer(app);
const socket = require("socket.io")(http);

// socket.on("connect", socket => {
//   console.log("connect")

//   socket.on("disconnect", function() {
//     console.log("user disconnected");
//   })
// });

socket.on("connection", socket => {
  socket.on("createColumn", function (data) {
    const column = new Column(data);
    console.log(column);
    socket.broadcast.emit("received")
    column.save().then((column) => {
      socket.broadcast.emit("newColumn", column);
    });
  });
  socket.on("disconnect", () => {console.log("disconnected")});

})

http.listen(port);

// VUE_APP_SERVER_URL=http://localhost:5000
// VUE_APP_SOCKET_SERVER_URL=http://localhost:5000
