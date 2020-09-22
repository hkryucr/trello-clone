const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const users = require("./routes/api/users");
const boards = require("./routes/api/boards");

const Column = require("./models/Column");
const Board = require("./models/Board");

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

  socket.on("editBoard", async (data) => {
    const { _id, name } = data;
    const board = await Board.findById(_id);
    if (board == null) {
      socket.emit("error", "Board not found!")
    }

    board.name = name;
    board.save().then((board) => {
      console.log("board updated", board)
      io.sockets.emit("newBoard", board);
    })
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