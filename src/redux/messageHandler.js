import store from './store'
import { setSocketStatus, setupGame, updateCards } from './actions'

// Create function to handle all websocket / generic message sending communication
export const messageHandler = ({ type, event }) => {
	switch (type) {
		case 'onOpen':
			console.debug('WS Opened.')
			store.dispatch(setSocketStatus(true))
			break
		case 'onMessage':
			const onMessageData = JSON.parse(event.data)
			switch (onMessageData.type) {
				case 'setup':
					store.dispatch(setupGame(onMessageData.data))
					break
				case 'connect':
					break
				case 'cards':
					store.dispatch(updateCards(onMessageData.data))
					break
				case 'error':
					console.log(`Error Message: ${onMessageData.data.message}`)
					break
				default:
					break
			}
			// if (event.data) {
			// 	const onMessageData = JSON.parse(event.data)
			// 	console.debug(onMessageData)
			// }
			break
		case 'onError':
			break
		case 'onClose':
			console.debug('WS Closed')
			store.dispatch(setSocketStatus(false))
			break
		case 'onSend':
			break
		default:
		// TODO: should probably throw an exception here for unhandled type
		// consoleLog('Default case')
	}
}
