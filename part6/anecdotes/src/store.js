import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import anecdoteReducer from './reducers/anecdoteReducer'
// import filterReducer from './reducers/filterReducer'

const reducer = anecdoteReducer

// combineReducers({
//   anecdote: anecdoteReducer,
//   filter: filterReducer
// })

const store = createStore(
  reducer,
  composeWithDevTools()
)

export default store