
import { createStore, combineReducers } from 'redux'

import reducer from './reducers/reducer.js'
import redditReducer from './reducers/redditReducer'

let rootReducer = combineReducers({reducer})

const store = createStore(
   rootReducer,
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store