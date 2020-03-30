import { combineReducers } from 'redux'
import hwReducer from '../features/WebSocketHandler/hwSlice'
import navReducer from '../features/navigation/navigationSlice'
import gameReducer from '../features/game/gameSlice'

export default combineReducers({
	hw: hwReducer,
	navigation: navReducer,
	game: gameReducer,
})
