// import e from 'express'
import store from '../../src/store/index.js'

describe('mutations', () => {
  test('UPDATE_BOARD_NAME update board name', () => {
    const board = { name: 'new board' }
    const state = {
      board: {
        name: ''
      }
    }

    store.mutations.UPDATE_BOARD_NAME(state, board)
    expect(state.board.name).toBe(board.name)
  })
})
