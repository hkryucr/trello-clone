const Column = require("../models/Column");

class ColumnController {
  async createColumn(io, socket, data) {
    const column = new Column(data);
    column.save().then((column) => {
      io.sockets.emit("newColumn", column);
    });
  }
}

module.exports = ColumnController;
