
import { createStore, combineReducers } from 'redux'

import contentReducer from './reducers/contentReducer.js'
import redditReducer from './reducers/redditReducer'
import mediumReducer from './reducers/mediumReducer'

let rootReducer = combineReducers({contentReducer, redditReducer, mediumReducer})

const store = createStore(
   rootReducer,
   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store