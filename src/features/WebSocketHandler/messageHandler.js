import store from '../../store'
import { setStatus } from './hwSlice'
import { setPin, setTeams } from '../game/gameSlice'
// import { setSocketStatus, setupGame, updateCards } from './actions'

// Create function to handle all websocket / generic message sending communication
export const messageHandler = ({ type, event }) => {
	switch (type) {
		case 'onOpen':
			store.dispatch(setStatus(true))
			break
		case 'onMessage':
			const onMessageData = JSON.parse(event.data)
			console.log(onMessageData)
			switch (onMessageData.type) {
				case 'created_game':
					// parse data to pull out game pin
					if ('pin' in onMessageData.data) {
						store.dispatch(setPin(onMessageData.data['pin']))
					}
					// store.dispatch(setupGame(onMessageData.data))
					break
				case 'connected_to_game':
					break
				case 'cards':
					// store.dispatch(updateCards(onMessageData.data))
					break
				case 'error':
					console.log(`Error Message: ${onMessageData.data.message}`)
					break
				default:
					break
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
