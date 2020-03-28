import { createStore, compose } from 'redux'
import rootReducer from './reducers/app'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(rootReducer, composeEnhancer())
