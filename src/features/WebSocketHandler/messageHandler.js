import store from '../../store'
import { setStatus } from './hwSlice'
import { setField, setPlayerField } from '../game/gameSlice'
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
			if ('data' in onMessageData) {
				// loop over all keys in the data and update the redux store for each field
				for (const property in onMessageData.data) {
					switch (property) {
						case 'pin':
						case 'next_turn':
						case 'teams':
							store.dispatch(setField(property, onMessageData.data[property]))
							break
						case 'identifier':
						case 'cards':
							store.dispatch(setPlayerField(property, onMessageData.data[property]))
							break
						default:
							break
					}
				}
			}
			// TODO: do I need to perform different updates based on message type?
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
