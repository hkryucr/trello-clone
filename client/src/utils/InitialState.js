export const initialState = () => ({
  session: {
    isLoggedIn: false,
    currentUser: {}
  },
  board: {},
  ui: {
    navModal: 'empty'
  },
  user: {},
  backgrounds: {},
  searchResult: {
    loaded: false,
    boards: [],
    tasks: []
  }
})
