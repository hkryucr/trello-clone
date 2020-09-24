const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const users = require("./routes/api/users");
const boards = require("./routes/api/boards");
const columns = require("./routes/api/columns");
const tasks = require("./routes/api/tasks");

const BoardController = require("./controllers/BoardController");
const ColumnController = require("./controllers/ColumnController");
const TaskController = require("./controllers/TaskController");

const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;

// Check the environmental variable port. Use 5000 by defaul

const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(db, { useUnifiedTopology: true })
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

// WEBSOCKET CONFIGURATION
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  socket.on("editBoard", async (data) => {
    new BoardController().editBoard(io, socket, data);
  });

  socket.on("createColumn", async (data) => {
    new ColumnController().createColumn(io, socket, data);
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

http.listen(port);
