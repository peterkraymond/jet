import store from '../../store'
import { setStatus } from './hwSlice'
import { setField, setPlayerField } from '../game/gameSlice'
import { setCurrentView, getCurrentView } from '../navigation/navigationSlice'
// import { setSocketStatus, setupGame, updateCards } from './actions'

var set_view = ''

// Create function to handle all websocket / generic message sending communication
export const messageHandler = ({ type, event }) => {
	switch (type) {
		case 'onOpen':
			store.dispatch(setStatus(true))
			store.dispatch(setCurrentView('create-game'))
			break
		case 'onMessage':
			const onMessageData = JSON.parse(event.data)
			console.log(onMessageData)
			if ('data' in onMessageData) {
				// loop over all keys in the data and update the redux store for each field
				for (const property in onMessageData.data) {
					switch (property) {
						case 'pin':
						case 'next_turn':
						case 'player':
						case 'teams':
						case 'last_turn':
						case 'next_turn':
							store.dispatch(setField(property, onMessageData.data[property]))
							break
						case 'identifier':
						case 'name':
						case 'cards':
							store.dispatch(setPlayerField(property, onMessageData.data[property]))
							break
						default:
							break
					}
				}
			}
			// change the view based on the return message
			if ('type' in onMessageData) {
				switch (onMessageData.type) {
					case 'created_game':
						set_view = 'enter-pin'
						store.dispatch(setCurrentView(set_view))
						break
					case 'joined_game':
						set_view = 'select-player'
						store.dispatch(setCurrentView(set_view))
						break
					case 'selected_player':
						set_view = 'game-play'
						store.dispatch(setCurrentView(set_view))
						break
					case 'game_update':
						// set the view to game play if it is not currently
						if (set_view != 'game-play') {
							set_view = 'game-play'
							store.dispatch(setCurrentView(set_view))
						}
						break
					default:
						break
				}
			}
			break
		case 'onError':
			break
		case 'onClose':
			store.dispatch(setStatus(false))
			break
		case 'onSend':
			break
		default:
		// TODO: should probably throw an exception here for unhandled type
		// consoleLog('Default case')
	}
}
