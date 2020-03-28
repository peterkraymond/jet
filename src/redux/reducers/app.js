import { combineReducers } from 'redux'

import game from './game'
import registerPlayer from './registerPlayer'
import socketConnection from './socketConnection'

const rootReducer = combineReducers({
	socketConnection,
	game,
})

export default rootReducer
