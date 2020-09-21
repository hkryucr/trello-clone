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
app.use("/api/boards", boards);

// Check the environmental variable port, if it exist, use it. Otherwise, use 5000 
const port = process.env.PORT || 5000;

/************************************************************************************
 *                             Socket
 ***********************************************************************************/
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// socket.on("connect", socket => {
//   console.log("connect")

//   socket.on("disconnect", function() {
//     console.log("user disconnected");
//   })
// });

io.on("connection", socket => {
  socket.on("createColumn", (data) => {
      const column = new Column(data);
      io.sockets.emit("received")
      column.save().then((column) => {
        console.log("column saved")
        io.sockets.emit("newColumn", column);
      });
  })
  // EDIT_BOARD
    // edits name in Boards
    // removes name in Boards
  // socket.on("editBoard", function (data) {
  //   /*
  //   --receiving
  //   _id: 
  //   name: 

  //   --responding POJO
  //   {
  //     _id:
  //     name: 
  //     user: (not populate)
  //   }
  //   */

  //   const column = new Column(data);
  //   socket.broadcast.emit("received")
  //   column.save().then((column) => {
  //     socket.broadcast.emit("newColumn", column);
  //   });
  // });

  // CREATE_COLUMN
    // add a new column into Columns
    // edit column attr in Boards - push a new column id
  // socket.on("createColumn", function (data) {
  //   /*
  //   -- receiving
  //   board: ??
  //   name: 

  //   -- responding POJO
  //   {
  //     _id: 
  //     name:
  //     board: (not populated)
  //   }
  //   */
  // });

  // // UPDATE_TASK
  //   // edit Tasks
  // socket.on("updateTask", function (data) {
  //   /*
  //   -- receiving
  //   {
  //     _id: 
  //     name:
  //     description: 
  //     ...
  //   }

  //   -- responding POJO
  //   {
  //     _id: 
  //     name:
  //     description: 
  //     ...
  //   }
  //   */

  // // MOVE_TASK
  //   // edit Columns - reorder tasks array
  // socket.on("moveTask", function (data) {
  //   /*
  //   -- receiving
  //   {
  //     task_id: (task id)
  //     column_id: 
  //     fromTasks, 
  //     toTasks, 
  //     fromTaskIndex, 
  //     toTaskIndex,
  //     ...
  //   }

  //   -- responding POJO
  //   {
  //     _id: 
  //     name:
  //     description: 
  //     ...
  //   }
  //   */

  // });


  socket.on("disconnect", () => {console.log("disconnected")});
})

http.listen(port);

// VUE_APP_SERVER_URL=http://localhost:5000
// VUE_APP_SOCKET_SERVER_URL=http://localhost:5000
