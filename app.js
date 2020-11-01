const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const users = require("./routes/api/users");
const boards = require("./routes/api/boards");
const columns = require("./routes/api/columns");
const tasks = require("./routes/api/tasks");
const backgrounds = require("./routes/api/backgrounds");

const BoardController = require("./controllers/BoardController");
const ColumnController = require("./controllers/ColumnController");
const TaskController = require("./controllers/TaskController");
const UserController = require("./controllers/UserController");

const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;

// Check the environmental variable port. Use 5000 by defaul

const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// mongoose.set("useFindAndModify", false);
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => console.log(err));

// Setup the routers
if (process.env.NODE_ENV === "production") {
  // app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("EXPRESS SERVER IS RUNNING.");
  });
}

app.use("/api/users", users);
app.use("/api/boards", boards);
app.use("/api/columns", columns);
app.use("/api/tasks", tasks);
app.use("/api/backgrounds", backgrounds);

// WEBSOCKET CONFIGURATION
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  socket.on("updateBoard", async (data) => {
    new BoardController().updateBoard(io, socket, data);
  });

  socket.on("updateBoardViewDate", async (data) => {
    new BoardController().updateBoardViewDate(io, socket, data);
  });

  socket.on("updateBackground", async (data) => {
    new BoardController().updateBackground(io, socket, data);
  })

  socket.on("starBoard", async(data) => {
    new UserController().starBoard(io, socket, data);
  })

  socket.on("createColumn", async (data) => {
    new ColumnController().createColumn(io, socket, data);
  });

  socket.on("createBoard", async (data) => {
    new BoardController().createBoard(io, socket, data)
  })

  socket.on("moveColumn", async (data) => {
    new ColumnController().moveColumn(io, socket, data);
  });

  socket.on("createTask", async (data) => {
    new TaskController().createTask(io, socket, data);
  });

  socket.on("moveTask", async (data) => {
    new TaskController().moveTask(io, socket, data);
  });

  socket.on("updateColumn", async (data) => {
    new ColumnController().updateColumn(io, socket, data);
  })

  socket.on("updateTask", async (data) => {
    new TaskController().updateTask(io, socket, data);
  });

  socket.on("deleteTask", async (data) => {
    new TaskController().deleteTask(io, socket, data)
  });

  socket.on("deleteColumn", async (data) => {
    new ColumnController().deleteColumn(io, socket, data)
  });
  
  socket.on("deleteBoard", async (data) => {
    new BoardController().deleteBoard(io, socket, data)
  });
  
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

http.listen(port);
