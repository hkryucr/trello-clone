const Column = require("../../models/Column");

export function createColumn({name, boardId}) {
  const column = new Column({name, board: boardId});

  column.save().then( (col) => {
    
  })
}