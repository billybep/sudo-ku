import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
  board : [],
  solvedBoard: [],
  staticBoard: [],
  status: ''
}

const reducer = (state = initialState, action) => {

  const { type, payload } = action

  switch (type) {
    case 'board/setBoard':
      return { ...state, board: payload }
    case 'solvedBoard/setSolvedBoard':
      return { ...state, board: JSON.parse(JSON.stringify(payload))}
    case 'board/updateBoard':
      return { ...state, board: payload }
    case 'status/setStatus':
      return { ...state, status: payload }
    case 'status/resetStatus':
      return { ...state, status: payload }
    case 'reset/resetState':
      return { 
        ...state, 
        board: payload.board,
        solvedBoard: payload.solvedBoard,
        staticBoard: payload.staticBoard,
        status: payload.status
      }
    case 'static/setStaticBoard':
      return { ...state, staticBoard: payload }
    default:
      return state
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export default store