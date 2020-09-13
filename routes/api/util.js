const Board = require("../../models/Board");
const Column = require("../../models/Column");

const createColumn = async function (boardId, columnName) {
  const board = await Board.findOne({ id: boardId });
  const column = new Column({ name: columnName, board: boardId });
  board.columns.push(column);
  column.save();
  board.save();
};
